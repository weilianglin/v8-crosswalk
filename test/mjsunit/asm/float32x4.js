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
  var i4 = stdlib.SIMD.int32x4;
  var fscale = f4.scale;
  var fwithX = f4.withX;
  var fwithY = f4.withY;
  var fwithZ = f4.withZ;
  var fwithW = f4.withW;
  var fclamp = f4.clamp;
  var fswizzle = f4.swizzle;
  var fequal = f4.equal;
  var fnotEqual = f4.notEqual;
  var flessThan = f4.lessThan;
  var flessThanOrEqual = f4.lessThanOrEqual;
  var fgreaterThan = f4.greaterThan;
  var fgreaterThanOrEqual = f4.greaterThanOrEqual;
  var fselect = f4.select;

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
  function swizzle1(a) {
    a = f4(a);
    var ret = f4();
    ret = fswizzle(a, 0, 0, 0, 0);
    return f4(ret);
  }
  function swizzle2(a) {
    a = f4(a);
    var ret = f4();
    ret = fswizzle(a, 3, 2, 1, 0);
    return f4(ret);
  }

  function equal(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = i4();
    ret = fequal(a, b);
    return i4(ret);
  }

  function notEqual(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = i4();
    ret = fnotEqual(a, b);
    return i4(ret);
  }

  function lessThan(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = i4();
    ret = flessThan(a, b);
    return i4(ret);
  }

  function lessThanOrEqual(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = i4();
    ret = flessThanOrEqual(a, b);
    return i4(ret);
  }

  function greaterThan(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = i4();
    ret = fgreaterThan(a, b);
    return i4(ret);
  }

  function greaterThanOrEqual(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = i4();
    ret = fgreaterThanOrEqual(a, b);
    return i4(ret);
  }

  function select(m, t, f) {
    m = i4(m);
    t = f4(t);
    f = f4(f);
    var ret = f4();
    ret = fselect(m, t, f);
    return f4(ret);
  }

  return {scale : scale, withX : withX, withY : withY, withZ : withZ,
          withW : withW, clamp : clamp, swizzle1 : swizzle1, swizzle2 : swizzle2,
          equal : equal, notEqual : notEqual, lessThan : lessThan, lessThanOrEqual : lessThanOrEqual,
          greaterThan : greaterThan, greaterThanOrEqual : greaterThanOrEqual,
          select : select};
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

var result = m.swizzle1(SIMD.float32x4(1.0, 2.0, 3.0, 4.0));
var expected = SIMD.float32x4.swizzle(SIMD.float32x4(1.0, 2.0, 3.0, 4.0), 0, 0, 0, 0);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.swizzle2(SIMD.float32x4(1.0, 2.0, 3.0, 4.0));
var expected = SIMD.float32x4.swizzle(SIMD.float32x4(1.0, 2.0, 3.0, 4.0), 3, 2, 1, 0);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var a = SIMD.float32x4(1.0, 2.0, 0.1, 0.001);
var b = SIMD.float32x4(2.0, 2.0, 0.001, 0.1);
var result = m.equal(a, b);
var expected = SIMD.float32x4.equal(a, b)
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.notEqual(a, b);
var expected = SIMD.float32x4.notEqual(a, b)
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.lessThan(a, b);
var expected = SIMD.float32x4.lessThan(a, b)
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.lessThanOrEqual(a, b);
var expected = SIMD.float32x4.lessThanOrEqual(a, b)
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.greaterThanOrEqual(a, b);
var expected = SIMD.float32x4.greaterThanOrEqual(a, b)
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.greaterThan(a, b);
var expected = SIMD.float32x4.greaterThan(a, b)
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var s = SIMD.int32x4.bool(true, true, false, false);
var t = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
var f = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
var result = m.select(s, t, f);
var expected = SIMD.float32x4.select(s, t, f);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

function asmModule2(stdlib, imports, buffer) {
  "use asm"
  var f4 = stdlib.SIMD.float32x4;
  var f4load = f4.load;
  var f4loadX = f4.loadX;
  var f4loadXY = f4.loadXY;
  var f4loadXYZ = f4.loadXYZ;
  var f4store = f4.store;
  var f4storeX = f4.storeX;
  var f4storeXY = f4.storeXY;
  var f4storeXYZ = f4.storeXYZ;
  var f32array = new stdlib.Float32Array(buffer);

  function load(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4load(f32array, a | 0);
    return f4(ret);
  }

  function loadX(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadX(f32array, a | 0);
    return f4(ret);
  }

  function loadXY(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadXY(f32array, a | 0);
    return f4(ret);
  }

  function loadXYZ(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadXYZ(f32array, a);
    return f4(ret);
  }

  function store(a, v) {
    a =  a | 0;
    v = f4(v);
    f4store(f32array, a, v);
    return f4load(f32array, a);
  }

  function storeX(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeX(f32array, a, v);
    return f4loadX(f32array, a);
  }

  function storeXY(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeXY(f32array, a, v);
    return f4loadXY(f32array, a);
  }

  function storeXYZ(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeXYZ(f32array, a, v);
    return f4loadXYZ(f32array, a);
  }
  return {load : load, loadX : loadX, loadXY : loadXY, loadXYZ : loadXYZ, store : store, storeX : storeX, storeXY : storeXY, storeXYZ : storeXYZ};
}


var heap = new ArrayBuffer(0x4000);
var f32array = new Float32Array(heap);
for (var i = 0; i < 0x4000; i = i + 4) {
  f32array[i>>2] = i;
}
var m = asmModule2(this, {}, heap);
var result = m.load(4);
var expected = SIMD.float32x4.load(f32array, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.loadX(4);
var expected = SIMD.float32x4.loadX(f32array, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.loadXY(4);
var expected = SIMD.float32x4.loadXY(f32array, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.loadXYZ(4);
var expected = SIMD.float32x4.loadXYZ(f32array, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var val = SIMD.float32x4(1, 2, 3, 4);
var result = m.store(4, val);
var expected = val;
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var expected = SIMD.float32x4(1, 0, 0, 0);
var result = m.storeX(8, val);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var expected = SIMD.float32x4(1, 2, 0, 0);
var result = m.storeXY(12, val);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var expected = SIMD.float32x4(1, 2, 3, 0);
var result = m.storeXYZ(16, val);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);
