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
  var fshuffle = f4.shuffle;
  var ffromInt32x4 = f4.fromInt32x4;
  var ffromInt32x4Bits = f4.fromInt32x4Bits;
  var ifromFloat32x4 = i4.fromFloat32x4;
  var ifromFloat32x4Bits = i4.fromFloat32x4Bits;

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

  function shuffle1(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = f4();
    ret = fshuffle(a, b, 0, 0, 4, 4);
    return f4(ret);
  }

  function shuffle2(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = f4();
    ret = fshuffle(a, b, 1, 1, 5, 5);
    return f4(ret);
  }

  function shuffle3(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = f4();
    ret = fshuffle(a, b, 2, 2, 6, 6);
    return f4(ret);
  }

  function shuffle4(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = f4();
    ret = fshuffle(a, b, 3, 3, 7, 7);
    return f4(ret);
  }

  function shuffle5(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = f4();
    ret = fshuffle(a, b, 3, 2, 5, 4);
    return f4(ret);
  }

  function shuffle6(a, b) {
    a = f4(a);
    b = f4(b);
    var ret = f4();
    ret = fshuffle(a, b, 6, 7, 2, 3);
    return f4(ret);
  }

  function fromInt32x4(a) {
    a = i4(a);
    var ret = f4();
    ret = ffromInt32x4(a);
    return f4(ret);
  }

  function fromInt32x4Bits(a) {
    a = i4(a);
    var ret = f4();
    ret = ffromInt32x4Bits(a);
    return f4(ret);
  }

  function fromFloat32x4(a) {
    a = f4(a);
    var ret = i4();
    ret = ifromFloat32x4(a);
    return i4(ret);
  }

  function fromFloat32x4Bits(a) {
    a = f4(a);
    var ret = i4();
    ret = ifromFloat32x4Bits(a);
    return i4(ret);
  }

  return {scale : scale, withX : withX, withY : withY, withZ : withZ,
          withW : withW, clamp : clamp, swizzle1 : swizzle1, swizzle2 : swizzle2,
          equal : equal, notEqual : notEqual, lessThan : lessThan, lessThanOrEqual : lessThanOrEqual,
          greaterThan : greaterThan, greaterThanOrEqual : greaterThanOrEqual,
          select : select, shuffle1 : shuffle1, shuffle2 : shuffle2, shuffle3 : shuffle3,
          shuffle4 : shuffle4, shuffle5 : shuffle5, shuffle6 : shuffle6,
          fromInt32x4 : fromInt32x4, fromInt32x4Bits : fromInt32x4Bits, fromFloat32x4 : fromFloat32x4,
          fromFloat32x4Bits : fromFloat32x4Bits
          };
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

var a = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
var b = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
var result = m.shuffle1(a, b);
var expected = SIMD.float32x4.shuffle(a, b, 0, 0, 4, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.shuffle2(a, b);
var expected = SIMD.float32x4.shuffle(a, b, 1, 1, 5, 5);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.shuffle3(a, b);
var expected = SIMD.float32x4.shuffle(a, b, 2, 2, 6, 6);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.shuffle4(a, b);
var expected = SIMD.float32x4.shuffle(a, b, 3, 3, 7, 7);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.shuffle5(a, b);
var expected = SIMD.float32x4.shuffle(a, b, 3, 2, 5, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.shuffle6(a, b);
var expected = SIMD.float32x4.shuffle(a, b, 6, 7, 2, 3);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var a = SIMD.int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
var result = m.fromInt32x4Bits(a);
assertEquals(1.0, result.x);
assertEquals(2.0, result.y);
assertEquals(3.0, result.z);
assertEquals(4.0, result.w);

var a = SIMD.int32x4(1, 2, 3, 4);
var result = m.fromInt32x4(a);
assertEquals(1.0, result.x);
assertEquals(2.0, result.y);
assertEquals(3.0, result.z);
assertEquals(4.0, result.w);

var a = SIMD.float32x4(9.0, 10.0, 11.0, 12.0);
var result = m.fromFloat32x4Bits(a);
assertEquals(0x41100000, result.x);
assertEquals(0x41200000, result.y);
assertEquals(0x41300000, result.z);
assertEquals(0x41400000, result.w);

var a = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
var result = m.fromFloat32x4(a);
assertEquals(5, result.x);
assertEquals(6, result.y);
assertEquals(7, result.z);
assertEquals(8, result.w);

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
  var uint8array = new stdlib.Uint8Array(buffer);
  var f32array = new stdlib.Float32Array(buffer);

  function loadF32(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4load(f32array, a | 0);
    return f4(ret);
  }

  function loadF32X(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadX(f32array, a | 0);
    return f4(ret);
  }

  function loadF32XY(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadXY(f32array, a | 0);
    return f4(ret);
  }

  function loadF32XYZ(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadXYZ(f32array, a);
    return f4(ret);
  }

  function loadU8(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4load(uint8array, a | 0);
    return f4(ret);
  }

  function loadU8X(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadX(uint8array, a | 0);
    return f4(ret);
  }

  function loadU8XY(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadXY(uint8array, a | 0);
    return f4(ret);
  }

  function loadU8XYZ(a) {
    a = a | 0;
    var ret = f4(0, 0, 0, 0);
    ret = f4loadXYZ(uint8array, a);
    return f4(ret);
  }

  function storeF32(a, v) {
    a =  a | 0;
    v = f4(v);
    f4store(f32array, a, v);
  }

  function storeF32X(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeX(f32array, a, v);
  }

  function storeF32XY(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeXY(f32array, a, v);
  }

  function storeF32XYZ(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeXYZ(f32array, a, v);
  }

  function storeU8(a, v) {
    a =  a | 0;
    v = f4(v);
    f4store(uint8array, a, v);
  }

  function storeU8X(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeX(uint8array, a, v);
  }

  function storeU8XY(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeXY(uint8array, a, v);
  }

  function storeU8XYZ(a, v) {
    a =  a | 0;
    v = f4(v);
    f4storeXYZ(uint8array, a, v);
  }
  return {
      loadF32 : loadF32, loadF32X : loadF32X, loadF32XY : loadF32XY, loadF32XYZ : loadF32XYZ,
      loadU8 : loadU8, loadU8X : loadU8X, loadU8XY : loadU8XY, loadU8XYZ : loadU8XYZ,
      storeF32 : storeF32, storeF32X : storeF32X, storeF32XY : storeF32XY, storeF32XYZ : storeF32XYZ,
      storeU8 : storeU8, storeU8X : storeU8X, storeU8XY : storeU8XY, storeU8XYZ : storeU8XYZ,
      };
}


var heap = new ArrayBuffer(0x4000);
var f32array = new Float32Array(heap);
var uint8array = new Uint8Array(heap);
for (var i = 0; i < 0x4000; i = i + 4) {
  f32array[i>>2] = i / 4;
}
var m = asmModule2(this, {}, heap);
// Float32Array
var result = m.loadF32(4);
var expected = SIMD.float32x4.load(f32array, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);
// Uint8Array
var result = m.loadU8(4 << 2);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// Float32Array
var result = m.loadF32X(4);
var expected = SIMD.float32x4.loadX(f32array, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);
// Uint8Array
var result = m.loadU8X(4 << 2);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// Float32Array
var result = m.loadF32XY(4);
var expected = SIMD.float32x4.loadXY(f32array, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);
// Uint8Array
var result = m.loadU8XY(4 << 2);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// Float32Array
var result = m.loadF32XYZ(4);
var expected = SIMD.float32x4.loadXYZ(f32array, 4);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);
// Uint8Array
var result = m.loadU8XYZ(4 << 2);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// Float32Array
m.storeF32(4, SIMD.float32x4(1, 2, 3, 4));
var result = SIMD.float32x4.load(f32array, 4);
assertEquals(result.x, 1);
assertEquals(result.y, 2);
assertEquals(result.z, 3);
assertEquals(result.w, 4);
// Uint8Array
m.storeU8(4<<2, SIMD.float32x4(5, 6, 7, 8));
var result = SIMD.float32x4.load(uint8array, 4<<2);
assertEquals(result.x, 5);
assertEquals(result.y, 6);
assertEquals(result.z, 7);
assertEquals(result.w, 8);

// Float32Array
m.storeF32X(8, SIMD.float32x4(1, 2, 3, 4));
var result = SIMD.float32x4.load(f32array, 8);
assertEquals(result.x, 1);
assertEquals(result.y, 9);
assertEquals(result.z, 10);
assertEquals(result.w, 11);
// Uint8Array
m.storeU8X(8<<2, SIMD.float32x4(5, 6, 7, 8));
var result = SIMD.float32x4.load(uint8array, 8<<2);
assertEquals(result.x, 5);
assertEquals(result.y, 9);
assertEquals(result.z, 10);
assertEquals(result.w, 11);

// Float32Array
m.storeF32XY(12, SIMD.float32x4(1, 2, 3, 4));
var result = SIMD.float32x4.load(f32array, 12);
assertEquals(result.x, 1);
assertEquals(result.y, 2);
assertEquals(result.z, 14);
assertEquals(result.w, 15);
// Uint8Array
m.storeU8XY(12<<2, SIMD.float32x4(5, 6, 7, 8));
var result = SIMD.float32x4.load(uint8array, 12<<2);
assertEquals(result.x, 5);
assertEquals(result.y, 6);
assertEquals(result.z, 14);
assertEquals(result.w, 15);

// Float32Array
m.storeF32XYZ(16, SIMD.float32x4(1, 2, 3, 4));
var result = SIMD.float32x4.load(f32array, 16);
assertEquals(result.x, 1);
assertEquals(result.y, 2);
assertEquals(result.z, 3);
assertEquals(result.w, 19);
// Uint8Array
m.storeU8XYZ(16<<2, SIMD.float32x4(5, 6, 7, 8));
var result = SIMD.float32x4.load(uint8array, 16<<2);
assertEquals(result.x, 5);
assertEquals(result.y, 6);
assertEquals(result.z, 7);
assertEquals(result.w, 19);
