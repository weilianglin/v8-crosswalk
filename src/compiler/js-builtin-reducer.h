// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef V8_COMPILER_JS_BUILTIN_REDUCER_H_
#define V8_COMPILER_JS_BUILTIN_REDUCER_H_

#include "src/compiler/graph-reducer.h"
#include "src/compiler/simplified-operator.h"

namespace v8 {
namespace internal {
namespace compiler {

// Forward declarations.
class CommonOperatorBuilder;
class JSGraph;
class MachineOperatorBuilder;


class JSBuiltinReducer FINAL : public Reducer {
 public:
  explicit JSBuiltinReducer(JSGraph* jsgraph);
  ~JSBuiltinReducer() FINAL {}

  Reduction Reduce(Node* node) FINAL;

 private:
  Reduction ReduceMathAbs(Node* node);
  Reduction ReduceMathSqrt(Node* node);
  Reduction ReduceMathMax(Node* node);
  Reduction ReduceMathImul(Node* node);
  Reduction ReduceMathFround(Node* node);
  Reduction ReduceMathFloor(Node* node);
  Reduction ReduceMathCeil(Node* node);
  Reduction ReduceFloat32x4Add(Node* node);
  Reduction ReduceFloat32x4Sub(Node* node);
  Reduction ReduceFloat32x4Mul(Node* node);
  Reduction ReduceFloat32x4Div(Node* node);
  Reduction ReduceFloat32x4Constructor(Node* node);
  Reduction ReduceFloat32x4Min(Node* node);
  Reduction ReduceFloat32x4Max(Node* node);
  Reduction ReduceFloat32x4Abs(Node* node);
  Reduction ReduceFloat32x4Neg(Node* node);
  Reduction ReduceFloat32x4Reciprocal(Node* node);
  Reduction ReduceFloat32x4ReciprocalSqrt(Node* node);
  Reduction ReduceFloat32x4Splat(Node* node);
  Reduction ReduceFloat32x4Sqrt(Node* node);
  Reduction ReduceFloat32x4Scale(Node* node);
  Reduction ReduceFloat32x4WithX(Node* node);
  Reduction ReduceFloat32x4WithY(Node* node);
  Reduction ReduceFloat32x4WithZ(Node* node);
  Reduction ReduceFloat32x4WithW(Node* node);
  Reduction ReduceFloat32x4Clamp(Node* node);
  Reduction ReduceFloat32x4Swizzle(Node* node);
  Reduction ReduceGetFloat32x4X(Node* node);
  Reduction ReduceGetFloat32x4XY(Node* node);
  Reduction ReduceGetFloat32x4XYZ(Node* node);
  Reduction ReduceGetFloat32x4XYZW(Node* node);
  Reduction ReduceSetFloat32x4X(Node* node);
  Reduction ReduceSetFloat32x4XY(Node* node);
  Reduction ReduceSetFloat32x4XYZ(Node* node);
  Reduction ReduceSetFloat32x4XYZW(Node* node);
  Reduction ReduceFloat32x4Equal(Node* node);
  Reduction ReduceFloat32x4NotEqual(Node* node);
  Reduction ReduceFloat32x4GreaterThan(Node* node);
  Reduction ReduceFloat32x4GreaterThanOrEqual(Node* node);
  Reduction ReduceFloat32x4LessThan(Node* node);
  Reduction ReduceFloat32x4LessThanOrEqual(Node* node);
  Reduction ReduceFloat32x4Select(Node* node);
  Reduction ReduceFloat32x4Shuffle(Node* node);
  Reduction ReduceInt32x4Add(Node* node);
  Reduction ReduceInt32x4And(Node* node);
  Reduction ReduceInt32x4Sub(Node* node);
  Reduction ReduceInt32x4Mul(Node* node);
  Reduction ReduceInt32x4Or(Node* node);
  Reduction ReduceInt32x4Xor(Node* node);
  Reduction ReduceInt32x4Constructor(Node* node);
  Reduction ReduceInt32x4Bool(Node* node);
  Reduction ReduceInt32x4Select(Node* node);
  Reduction ReduceInt32x4Shuffle(Node* node);
  Reduction ReduceGetInt32x4X(Node* node);
  Reduction ReduceGetInt32x4XY(Node* node);
  Reduction ReduceGetInt32x4XYZ(Node* node);
  Reduction ReduceGetInt32x4XYZW(Node* node);
  Reduction ReduceSetInt32x4X(Node* node);
  Reduction ReduceSetInt32x4XY(Node* node);
  Reduction ReduceSetInt32x4XYZ(Node* node);
  Reduction ReduceSetInt32x4XYZW(Node* node);
  Reduction ReduceInt32x4Neg(Node* node);
  Reduction ReduceInt32x4Not(Node* node);
  Reduction ReduceInt32x4Splat(Node* node);
  Reduction ReduceFloat64x2Add(Node* node);
  Reduction ReduceFloat64x2Sub(Node* node);
  Reduction ReduceFloat64x2Mul(Node* node);
  Reduction ReduceFloat64x2Div(Node* node);
  Reduction ReduceFloat64x2Constructor(Node* node);
  Reduction ReduceFloat64x2Min(Node* node);
  Reduction ReduceFloat64x2Max(Node* node);
  Reduction ReduceFloat64x2Abs(Node* node);
  Reduction ReduceFloat64x2Neg(Node* node);
  Reduction ReduceFloat64x2Sqrt(Node* node);
  Reduction ReduceFloat64x2Scale(Node* node);
  Reduction ReduceFloat64x2WithX(Node* node);
  Reduction ReduceFloat64x2WithY(Node* node);
  Reduction ReduceFloat64x2Clamp(Node* node);
  Reduction ReduceGetFloat64x2X(Node* node);
  Reduction ReduceGetFloat64x2XY(Node* node);
  Reduction ReduceSetFloat64x2X(Node* node);
  Reduction ReduceSetFloat64x2XY(Node* node);

  JSGraph* jsgraph() const { return jsgraph_; }
  Graph* graph() const;
  CommonOperatorBuilder* common() const;
  MachineOperatorBuilder* machine() const;
  SimplifiedOperatorBuilder* simplified() { return &simplified_; }

  JSGraph* jsgraph_;
  SimplifiedOperatorBuilder simplified_;
  Type* float32x4_;
  Type* int32x4_;
  Type* float64x2_;
};

}  // namespace compiler
}  // namespace internal
}  // namespace v8

#endif  // V8_COMPILER_JS_BUILTIN_REDUCER_H_
