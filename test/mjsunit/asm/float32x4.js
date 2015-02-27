// Copyright 2011 the V8 project authors. All rights reserved.
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
//
// Flags: --simd_object --allow-natives-syntax

function asmModule(stdlib, imports, buffer) {
  "use asm"
  var f4 = stdlib.SIMD.float32x4;
  var fscale = f4.scale;
  var fwithX = f4.withX;
  var fwithY = f4.withY;
  var fwithZ = f4.withZ;
  var fwithW = f4.withW;
  var fclamp = f4.clamp;

  function scale(a, b) {
    a = f4(a);
    b = +b;
    var ret = f4(); 
    ret = fscale(a, b);
    return f4(ret);
  }
  function withX(a, b) {
    a = f4(a);
    b = +b;
    var ret = f4(); 
    ret = fwithX(a, b);
    return f4(ret);
  }
  function withY(a, b) {
    a = f4(a);
    b = +b;
    var ret = f4(); 
    ret = fwithY(a, b);
    return f4(ret);
  }
  function withZ(a, b) {
    a = f4(a);
    b = +b;
    var ret = f4(); 
    ret = fwithZ(a, b);
    return f4(ret);
  }
  function withW(a, b) {
    a = f4(a);
    b = +b;
    var ret = f4();
    ret = fwithW(a, b);
    return f4(ret);
  }
  function clamp(a, b, c) {
    a = f4(a);
    b = f4(b);
    c = f4(c);
    var ret = f4();
    ret = fclamp(a, b, c);
    return f4(ret);
  }
  return {scale : scale, withX : withX, withY : withY, withZ : withZ, withW : withW, clamp : clamp};
}


var m = asmModule(this, {});
var result = m.scale(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 20);
var expected = SIMD.float32x4.scale(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.withX(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 10);
var expected = SIMD.float32x4.withX(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 10);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.withY(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 20);
var expected = SIMD.float32x4.withY(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.withZ(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 30);
var expected = SIMD.float32x4.withZ(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 30);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.withW(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 40);
var expected = SIMD.float32x4.withW(SIMD.float32x4(+1.1, +2.2, +3.3, +4.4), 40);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.clamp(SIMD.float32x4(1.0, -2.0, 3.0, -4.0), SIMD.float32x4(0.0, 0.0, 0.0, 0.0), SIMD.float32x4(2.0, 2.0, 2.0, 2.0));
var expected = SIMD.float32x4.clamp(SIMD.float32x4(1.0, -2.0, 3.0, -4.0), SIMD.float32x4(0.0, 0.0, 0.0, 0.0), SIMD.float32x4(2.0, 2.0, 2.0, 2.0));
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);
