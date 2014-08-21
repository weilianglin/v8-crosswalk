// Copyright 2014 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Flags: --simd_object --allow-natives-syntax

function testFloat32x4LoadAndStore() {
	var f32x4_array = new Float32x4Array(3);
  var data_view = new DataView(f32x4_array.buffer);
  f32x4_array[0] = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  f32x4_array[1] = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  f32x4_array[2] = SIMD.float32x4(9.0, 10.0, 11.0, 12.0);

  var v1 = SIMD.float32x4.load(f32x4_array.buffer, 0);
  var v2 = SIMD.float32x4.load(f32x4_array.buffer, 16);
  var v3 = SIMD.float32x4.load(f32x4_array.buffer, 32);

  assertEquals(1.0, v1.x);
  assertEquals(2.0, v1.y);
  assertEquals(3.0, v1.z);
  assertEquals(4.0, v1.w);

  assertEquals(5.0, v2.x);
  assertEquals(6.0, v2.y);
  assertEquals(7.0, v2.z);
  assertEquals(8.0, v2.w);

  assertEquals(9.0, v3.x);
  assertEquals(10.0, v3.y);
  assertEquals(11.0, v3.z);
  assertEquals(12.0, v3.w);

  SIMD.float32x4.store(f32x4_array.buffer, 0, SIMD.float32x4(12.0, 11.0, 10.0, 9.0));
  SIMD.float32x4.store(f32x4_array.buffer, 16, SIMD.float32x4(8.0, 7.0, 6.0, 5.0));
  SIMD.float32x4.store(f32x4_array.buffer, 32, SIMD.float32x4(4.0, 3.0, 2.0, 1.0));

  assertEquals(12.0, f32x4_array[0].x);
  assertEquals(11.0, f32x4_array[0].y);
  assertEquals(10.0, f32x4_array[0].z);
  assertEquals(9.0, f32x4_array[0].w);

  assertEquals(8.0, f32x4_array[1].x);
  assertEquals(7.0, f32x4_array[1].y);
  assertEquals(6.0, f32x4_array[1].z);
  assertEquals(5.0, f32x4_array[1].w);

  assertEquals(4.0, f32x4_array[2].x);
  assertEquals(3.0, f32x4_array[2].y);
  assertEquals(2.0, f32x4_array[2].z);
  assertEquals(1.0, f32x4_array[2].w);
}

testFloat32x4LoadAndStore();
testFloat32x4LoadAndStore();
%OptimizeFunctionOnNextCall(testFloat32x4LoadAndStore);
testFloat32x4LoadAndStore();

function testFloat64x2Load() {
  var f64x2_array = new Float64x2Array(3);
  var data_view = new DataView(f64x2_array.buffer);
  f64x2_array[0] = SIMD.float64x2(1.0, 2.0);
  f64x2_array[1] = SIMD.float64x2(3.0, 4.0);
  f64x2_array[2] = SIMD.float64x2(5.0, 6.0);

  var v1 = SIMD.float64x2.load(f64x2_array.buffer, 0);
  var v2 = SIMD.float64x2.load(f64x2_array.buffer, 16);
  var v3 = SIMD.float64x2.load(f64x2_array.buffer, 32);

  assertEquals(1.0, v1.x);
  assertEquals(2.0, v1.y);

  assertEquals(3.0, v2.x);
  assertEquals(4.0, v2.y);

  assertEquals(5.0, v3.x);
  assertEquals(6.0, v3.y);
}

testFloat64x2Load();
testFloat64x2Load();
%OptimizeFunctionOnNextCall(testFloat64x2Load);
testFloat64x2Load();

function testInt32x4Load() {
  var i32x4_array = new Int32x4Array(3);
  var data_view = new DataView(i32x4_array.buffer);
  i32x4_array[0] = SIMD.int32x4(1, 2, 3, 4);
  i32x4_array[1] = SIMD.int32x4(5, 6, 7, 8);
  i32x4_array[2] = SIMD.int32x4(9, 10, 11, 12);

  var v1 = SIMD.int32x4.load(i32x4_array.buffer, 0);
  var v2 = SIMD.int32x4.load(i32x4_array.buffer, 16);
  var v3 = SIMD.int32x4.load(i32x4_array.buffer, 32);

  assertEquals(1, v1.x);
  assertEquals(2, v1.y);
  assertEquals(3, v1.z);
  assertEquals(4, v1.w);

  assertEquals(5, v2.x);
  assertEquals(6, v2.y);
  assertEquals(7, v2.z);
  assertEquals(8, v2.w);

  assertEquals(9, v3.x);
  assertEquals(10, v3.y);
  assertEquals(11, v3.z);
  assertEquals(12, v3.w);
}

testInt32x4Load();
testInt32x4Load();
%OptimizeFunctionOnNextCall(testInt32x4Load);
testInt32x4Load();