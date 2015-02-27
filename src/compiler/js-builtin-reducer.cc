// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "src/compiler/diamond.h"
#include "src/compiler/graph-inl.h"
#include "src/compiler/js-builtin-reducer.h"
#include "src/compiler/js-graph.h"
#include "src/compiler/node-matchers.h"
#include "src/compiler/node-properties-inl.h"
#include "src/types.h"

namespace v8 {
namespace internal {
namespace compiler {


// Helper method that assumes replacement nodes are pure values that don't
// produce an effect. Replaces {node} with {reduction} and relaxes effects.
static Reduction ReplaceWithPureReduction(Node* node, Reduction reduction) {
  if (reduction.Changed()) {
    NodeProperties::ReplaceWithValue(node, reduction.replacement());
    return reduction;
  }
  return Reducer::NoChange();
}


// Helper class to access JSCallFunction nodes that are potential candidates
// for reduction when they have a BuiltinFunctionId associated with them.
class JSCallReduction {
 public:
  explicit JSCallReduction(Node* node) : node_(node) {}

  // Determines whether the node is a JSCallFunction operation that targets a
  // constant callee being a well-known builtin with a BuiltinFunctionId.
  bool HasBuiltinFunctionId() {
    if (node_->opcode() != IrOpcode::kJSCallFunction) return false;
    HeapObjectMatcher<Object> m(NodeProperties::GetValueInput(node_, 0));
    if (!m.HasValue() || !m.Value().handle()->IsJSFunction()) return false;
    Handle<JSFunction> function = Handle<JSFunction>::cast(m.Value().handle());
    return function->shared()->HasBuiltinFunctionId();
  }

  // Retrieves the BuiltinFunctionId as described above.
  BuiltinFunctionId GetBuiltinFunctionId() {
    DCHECK_EQ(IrOpcode::kJSCallFunction, node_->opcode());
    HeapObjectMatcher<Object> m(NodeProperties::GetValueInput(node_, 0));
    Handle<JSFunction> function = Handle<JSFunction>::cast(m.Value().handle());
    return function->shared()->builtin_function_id();
  }

  // Determines whether the call takes zero inputs.
  bool InputsMatchZero() { return GetJSCallArity() == 0; }

  // Determines whether the call takes one input of the given type.
  bool InputsMatchOne(Type* t1) {
    return GetJSCallArity() == 1 &&
           NodeProperties::GetBounds(GetJSCallInput(0)).upper->Is(t1);
  }

  // Determines whether the call takes two inputs of the given types.
  bool InputsMatchTwo(Type* t1, Type* t2) {
    return GetJSCallArity() == 2 &&
           NodeProperties::GetBounds(GetJSCallInput(0)).upper->Is(t1) &&
           NodeProperties::GetBounds(GetJSCallInput(1)).upper->Is(t2);
  }

  // Determines whether the call takes inputs all of the given type.
  bool InputsMatchAll(Type* t) {
    for (int i = 0; i < GetJSCallArity(); i++) {
      if (!NodeProperties::GetBounds(GetJSCallInput(i)).upper->Is(t)) {
        return false;
      }
    }
    return true;
  }

  Node* left() { return GetJSCallInput(0); }
  Node* right() { return GetJSCallInput(1); }

  int GetJSCallArity() {
    DCHECK_EQ(IrOpcode::kJSCallFunction, node_->opcode());
    // Skip first (i.e. callee) and second (i.e. receiver) operand.
    return node_->op()->ValueInputCount() - 2;
  }

  Node* GetJSCallInput(int index) {
    DCHECK_EQ(IrOpcode::kJSCallFunction, node_->opcode());
    DCHECK_LT(index, GetJSCallArity());
    // Skip first (i.e. callee) and second (i.e. receiver) operand.
    return NodeProperties::GetValueInput(node_, index + 2);
  }

 private:
  Node* node_;
};


JSBuiltinReducer::JSBuiltinReducer(JSGraph* jsgraph)
    : jsgraph_(jsgraph), simplified_(jsgraph->zone()) {
  Isolate* isolate = jsgraph_->isolate();
  Handle<Map> float32x4_map = handle(
      isolate->native_context()->float32x4_function()->initial_map(), isolate);
  float32x4_ = Type::Class(float32x4_map, jsgraph_->zone());
}


// ECMA-262, section 15.8.2.1.
Reduction JSBuiltinReducer::ReduceMathAbs(Node* node) {
  JSCallReduction r(node);
  if (r.InputsMatchOne(Type::Unsigned32())) {
    // Math.abs(a:uint32) -> a
    return Replace(r.left());
  }
  if (r.InputsMatchOne(Type::Number())) {
    // Math.abs(a:number) -> (a > 0 ? a : 0 - a)
    Node* const value = r.left();
    Node* const zero = jsgraph()->ZeroConstant();
    return Replace(graph()->NewNode(
        common()->Select(kMachNone),
        graph()->NewNode(simplified()->NumberLessThan(), zero, value), value,
        graph()->NewNode(simplified()->NumberSubtract(), zero, value)));
  }
  return NoChange();
}


// ECMA-262, section 15.8.2.17.
Reduction JSBuiltinReducer::ReduceMathSqrt(Node* node) {
  JSCallReduction r(node);
  if (r.InputsMatchOne(Type::Number())) {
    // Math.sqrt(a:number) -> Float64Sqrt(a)
    Node* value = graph()->NewNode(machine()->Float64Sqrt(), r.left());
    return Replace(value);
  }
  return NoChange();
}


// ECMA-262, section 15.8.2.11.
Reduction JSBuiltinReducer::ReduceMathMax(Node* node) {
  JSCallReduction r(node);
  if (r.InputsMatchZero()) {
    // Math.max() -> -Infinity
    return Replace(jsgraph()->Constant(-V8_INFINITY));
  }
  if (r.InputsMatchOne(Type::Number())) {
    // Math.max(a:number) -> a
    return Replace(r.left());
  }
  if (r.InputsMatchAll(Type::Integral32())) {
    // Math.max(a:int32, b:int32, ...)
    Node* value = r.GetJSCallInput(0);
    for (int i = 1; i < r.GetJSCallArity(); i++) {
      Node* const input = r.GetJSCallInput(i);
      value = graph()->NewNode(
          common()->Select(kMachNone),
          graph()->NewNode(simplified()->NumberLessThan(), input, value), input,
          value);
    }
    return Replace(value);
  }
  return NoChange();
}


// ES6 draft 08-24-14, section 20.2.2.19.
Reduction JSBuiltinReducer::ReduceMathImul(Node* node) {
  JSCallReduction r(node);
  if (r.InputsMatchTwo(Type::Integral32(), Type::Integral32())) {
    // Math.imul(a:int32, b:int32) -> Int32Mul(a, b)
    Node* value = graph()->NewNode(machine()->Int32Mul(), r.left(), r.right());
    return Replace(value);
  }
  return NoChange();
}


// ES6 draft 08-24-14, section 20.2.2.17.
Reduction JSBuiltinReducer::ReduceMathFround(Node* node) {
  JSCallReduction r(node);
  if (r.InputsMatchOne(Type::Number())) {
    // Math.fround(a:number) -> TruncateFloat64ToFloat32(a)
    Node* value =
        graph()->NewNode(machine()->TruncateFloat64ToFloat32(), r.left());
    return Replace(value);
  }
  return NoChange();
}


// ES6 draft 10-14-14, section 20.2.2.16.
Reduction JSBuiltinReducer::ReduceMathFloor(Node* node) {
  if (!machine()->HasFloat64Floor()) return NoChange();
  JSCallReduction r(node);
  if (r.InputsMatchOne(Type::Number())) {
    // Math.floor(a:number) -> Float64Floor(a)
    Node* value = graph()->NewNode(machine()->Float64Floor(), r.left());
    return Replace(value);
  }
  return NoChange();
}


// ES6 draft 10-14-14, section 20.2.2.10.
Reduction JSBuiltinReducer::ReduceMathCeil(Node* node) {
  if (!machine()->HasFloat64Ceil()) return NoChange();
  JSCallReduction r(node);
  if (r.InputsMatchOne(Type::Number())) {
    // Math.ceil(a:number) -> Float64Ceil(a)
    Node* value = graph()->NewNode(machine()->Float64Ceil(), r.left());
    return Replace(value);
  }
  return NoChange();
}


#define REDUCED_SIMD_BINARY_OPERATIONS(V) \
  V(float32x4_, Float32x4Add)             \
  V(float32x4_, Float32x4Sub)             \
  V(float32x4_, Float32x4Mul)             \
  V(float32x4_, Float32x4Div)             \
  V(float32x4_, Float32x4Max)             \
  V(float32x4_, Float32x4Min)


#define DECLARE_REDUCE_BINARY_SIMD_OPERATION(type, opcode)            \
  Reduction JSBuiltinReducer::Reduce##opcode(Node* node) {            \
    JSCallReduction r(node);                                          \
                                                                      \
    if (r.InputsMatchTwo(type, type)) {                               \
      Node* value =                                                   \
          graph()->NewNode(machine()->opcode(), r.left(), r.right()); \
      return Replace(value);                                          \
    }                                                                 \
                                                                      \
    return NoChange();                                                \
  }


REDUCED_SIMD_BINARY_OPERATIONS(DECLARE_REDUCE_BINARY_SIMD_OPERATION)


Reduction JSBuiltinReducer::ReduceFloat32x4Constructor(Node* node) {
  // SIMD.float32x4(x, y, z, w) ->
  // Float32x4(x:float32, y:float32, z:float32, w:float32)
  JSCallReduction r(node);
  if (r.InputsMatchZero()) {
    // SIMD.float32x4() -> SIMD.float32x4(0, 0, 0, 0);
    Node* value =
        graph()->NewNode(machine()->Float32x4Constructor(),
                         jsgraph()->ZeroConstant(), jsgraph()->ZeroConstant(),
                         jsgraph()->ZeroConstant(), jsgraph()->ZeroConstant());
    return Replace(value);
  } else if (r.GetJSCallArity() == 4 && r.InputsMatchAll(Type::Number())) {
    Node* value = graph()->NewNode(machine()->Float32x4Constructor(),
                                   r.GetJSCallInput(0), r.GetJSCallInput(1),
                                   r.GetJSCallInput(2), r.GetJSCallInput(3));
    return Replace(value);
  } else if (r.GetJSCallArity() == 1) {
    // SIMD.float32x4(...) -> type annotation
    if (r.InputsMatchOne(float32x4_)) {
      return Replace(r.GetJSCallInput(0));
    } else {
      Node* const object = r.GetJSCallInput(0);
      Node* const effect = NodeProperties::GetEffectInput(node);
      Node* const control = NodeProperties::GetControlInput(node);
      Node* value =
          graph()->NewNode(jsgraph()->javascript()->ToFloat32x4Obj(), object,
                           jsgraph()->NoContextConstant(), effect, control);
      return Replace(value);
    }
  }

  return NoChange();
}


#define REDUCED_SIMD_UNARY_OPERATIONS(V) \
  V(float32x4_, Float32x4Abs)            \
  V(float32x4_, Float32x4Neg)            \
  V(float32x4_, Float32x4Reciprocal)     \
  V(float32x4_, Float32x4ReciprocalSqrt) \
  V(float32x4_, Float32x4Sqrt)

#define DECLARE_REDUCE_UNARY_SIMD_OPERATION(type, opcode)            \
  Reduction JSBuiltinReducer::Reduce##opcode(Node* node) {           \
    JSCallReduction r(node);                                         \
                                                                     \
    if (r.InputsMatchOne(type)) {                                    \
      Node* value = graph()->NewNode(machine()->opcode(), r.left()); \
      return Replace(value);                                         \
    }                                                                \
                                                                     \
    return NoChange();                                               \
  }


REDUCED_SIMD_UNARY_OPERATIONS(DECLARE_REDUCE_UNARY_SIMD_OPERATION)


Reduction JSBuiltinReducer::ReduceFloat32x4Splat(Node* node) {
  JSCallReduction r(node);

  if (r.InputsMatchOne(Type::Number())) {
    Node* value = graph()->NewNode(machine()->Float32x4Splat(), r.left());
    return Replace(value);
  }

  return NoChange();
}


Reduction JSBuiltinReducer::Reduce(Node* node) {
  JSCallReduction r(node);

  // Dispatch according to the BuiltinFunctionId if present.
  if (!r.HasBuiltinFunctionId()) return NoChange();
  switch (r.GetBuiltinFunctionId()) {
    case kMathAbs:
      return ReplaceWithPureReduction(node, ReduceMathAbs(node));
    case kMathSqrt:
      return ReplaceWithPureReduction(node, ReduceMathSqrt(node));
    case kMathMax:
      return ReplaceWithPureReduction(node, ReduceMathMax(node));
    case kMathImul:
      return ReplaceWithPureReduction(node, ReduceMathImul(node));
    case kMathFround:
      return ReplaceWithPureReduction(node, ReduceMathFround(node));
    case kMathFloor:
      return ReplaceWithPureReduction(node, ReduceMathFloor(node));
    case kMathCeil:
      return ReplaceWithPureReduction(node, ReduceMathCeil(node));
    case kFloat32x4Add:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Add(node));
    case kFloat32x4Sub:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Sub(node));
    case kFloat32x4Mul:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Mul(node));
    case kFloat32x4Div:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Div(node));
    case kFloat32x4Constructor:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Constructor(node));
    case kFloat32x4Min:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Min(node));
    case kFloat32x4Max:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Max(node));
    case kFloat32x4Abs:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Abs(node));
    case kFloat32x4Reciprocal:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Reciprocal(node));
    case kFloat32x4ReciprocalSqrt:
      return ReplaceWithPureReduction(node,
                                      ReduceFloat32x4ReciprocalSqrt(node));
    case kFloat32x4Splat:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Splat(node));
    case kFloat32x4Sqrt:
      return ReplaceWithPureReduction(node, ReduceFloat32x4Sqrt(node));
    default:
      break;
  }
  return NoChange();
}


Graph* JSBuiltinReducer::graph() const { return jsgraph()->graph(); }


CommonOperatorBuilder* JSBuiltinReducer::common() const {
  return jsgraph()->common();
}


MachineOperatorBuilder* JSBuiltinReducer::machine() const {
  return jsgraph()->machine();
}

}  // namespace compiler
}  // namespace internal
}  // namespace v8
