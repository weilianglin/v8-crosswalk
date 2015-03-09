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
  var f2 = stdlib.SIMD.float64x2;
  var f2add = f2.add;
  var f2sub = f2.sub;
  var f2mul = f2.mul;
  var f2div = f2.div;
  var f2min = f2.min;
  var f2max = f2.max;
  var f2abs = f2.abs;
  var f2neg = f2.neg;
  var f2sqrt = f2.sqrt;
  var f2scale = f2.scale;
  var f2withX = f2.withX;
  var f2withY = f2.withY;
  var a = f2(imports.a);
  var b = f2(imports.b);

  function add(a, b) {
    a = f2(a);
    b = f2(b);
    var ret = f2();
    ret = f2add(a, b);
    return f2(ret);
  }

  function addLocal() {
    var a = f2(+1.1, +2.2);
    var b = f2(+3.3, +4.4);
    var ret = f2();
    ret = f2add(a, b);
    return f2(ret);
  }

  function addImports() {
    var ret = f2();
    ret = f2add(a, b);
    return f2(ret);
  }

  function sub(a, b) {
    a = f2(a);
    b = f2(b);
    var ret = f2();
    ret = f2sub(a, b);
    return f2(ret);
  }

  function subLocal() {
    var a = f2(+1.1, +2.2);
    var b = f2(+3.3, +4.4);
    var ret = f2();
    ret = f2sub(a, b);
    return f2(ret);
  }

  function subImports() {
    var ret = f2();
    ret = f2sub(a, b);
    return f2(ret);
  }

  function mul(a, b) {
    a = f2(a);
    b = f2(b);
    var ret = f2();
    ret = f2mul(a, b);
    return f2(ret);
  }

  function mulLocal() {
    var a = f2(+1.1, +2.2);
    var b = f2(+3.3, +4.4);
    var ret = f2();
    ret = f2mul(a, b);
    return f2(ret);
  }

  function mulImports() {
    var ret = f2();
    ret = f2mul(a, b);
    return f2(ret);
  }

  function div(a, b) {
    a = f2(a);
    b = f2(b);
    var ret = f2();
    ret = f2div(a, b);
    return f2(ret);
  }

  function divLocal() {
    var a = f2(+1.1, +2.2);
    var b = f2(+3.3, +4.4);
    var ret = f2();
    ret = f2div(a, b);
    return f2(ret);
  }

  function divImports() {
    var ret = f2();
    ret = f2div(a, b);
    return f2(ret);
  }

  function min(a, b) {
    a = f2(a);
    b = f2(b);
    var ret = f2();
    ret = f2min(a, b);
    return f2(ret);
  }

  function minLocal() {
    var a = f2(+1.1, +2.2);
    var b = f2(+3.3, +4.4);
    var ret = f2();
    ret = f2min(a, b);
    return f2(ret);
  }

  function minImports() {
    var ret = f2();
    ret = f2min(a, b);
    return f2(ret);
  }

  function max(a, b) {
    a = f2(a);
    b = f2(b);
    var ret = f2();
    ret = f2max(a, b);
    return f2(ret);
  }

  function maxLocal() {
    var a = f2(+1.1, +2.2);
    var b = f2(+3.3, +4.4);
    var ret = f2();
    ret = f2max(a, b);
    return f2(ret);
  }

  function maxImports() {
    var ret = f2();
    ret = f2max(a, b);
    return f2(ret);
  }

  function getx(a) {
    a = f2(a);
    var x = a.x;
    return +x;
  }

  function gety(a) {
    a = f2(a);
    var y = a.y;
    return +y;
  }

  function getSignMask(a) {
    a = f2(a);
    var s = a.signMask;
    return s | 0;
  }

  function abs(a) {
    a = f2(a);
    var ret = f2();
    ret = f2abs(a);
    return f2(ret);
  }

  function neg(a) {
    a = f2(a);
    var ret = f2();
    ret = f2neg(a);
    return f2(ret);
  }

  function sqrt(a) {
    a = f2(a);
    var ret = f2();
    ret = f2sqrt(a);
    return f2(ret);
  }

  function getxLocal() {
    var a = f2(+1.1, +2.2);
    var x = a.x;
    return +x;
  }

  function getyLocal(a) {
    var a = f2(+1.1, +2.2);
    var y = a.y;
    return +y;
  }

  function getSignMaskLocal(a) {
    var a = f2(+1.1, +2.2);
    var s = a.signMask;
    return s | 0;
  }

  function absLocal() {
    var a = f2(+1.1, +2.2);
    var ret  =f2();
    ret = f2abs(a);
    return f2(ret);
  }

  function negLocal() {
    var a = f2(+1.1, +2.2);
    var ret  =f2();
    ret = f2neg(a);
    return f2(ret);
  }

  function sqrtLocal() {
    var a = f2(+1.1, +2.2);
    var ret  =f2();
    ret = f2sqrt(a);
    return f2(ret);
  }

  function getxImports() {
    var x = a.x;
    return +x;
  }

  function getyImports() {
    var y = a.y;
    return +y;
  }

  function getSignMaskImports() {
    var s = a.signMask;
    return s | 0;
  }

  function absImports() {
    var ret  =f2();
    ret = f2abs(a);
    return f2(ret);
  }

  function negImports() {
    var ret  =f2();
    ret = f2neg(a);
    return f2(ret);
  }

  function sqrtImports() {
    var ret  =f2();
    ret = f2sqrt(a);
    return f2(ret);
  }

  function scale(a, b) {
    a = f2(a);
    b = +b;
    var ret = f2();
    ret = f2scale(a, b);
    return f2(ret);
  }
  function withX(a, b) {
    a = f2(a);
    b = +b;
    var ret = f2();
    ret = f2withX(a, b);
    return f2(ret);
  }
  function withY(a, b) {
    a = f2(a);
    b = +b;
    var ret = f2();
    ret = f2withY(a, b);
    return f2(ret);
  }

  function scaleLocal(b) {
    var a = f2(+1.1, +2.2);
    b = +b;
    var ret = f2();
    ret = f2scale(a, b);
    return f2(ret);
  }
  function withXLocal(b) {
    var a = f2(+1.1, +2.2);
    b = +b;
    var ret = f2();
    ret = f2withX(a, b);
    return f2(ret);
  }
  function withYLocal(b) {
    var a = f2(+1.1, +2.2);
    b = +b;
    var ret = f2();
    ret = f2withY(a, b);
    return f2(ret);
  }

  function scaleImports(b) {
    b = +b;
    var ret = f2();
    ret = f2scale(a, b);
    return f2(ret);
  }
  function withXImports(b) {
    b = +b;
    var ret = f2();
    ret = f2withX(a, b);
    return f2(ret);
  }
  function withYImports(b) {
    b = +b;
    var ret = f2();
    ret = f2withY(a, b);
    return f2(ret);
  }
  return {add : add, addLocal : addLocal, addImports : addImports,
          sub : sub, subLocal : subLocal, subImports : subImports,
          mul : mul, mulLocal : mulLocal, mulImports : mulImports,
          div : div, divLocal : divLocal, divImports : divImports,
          min : min, minLocal : minLocal, minImports : minImports,
          max : max, maxLocal : maxLocal, maxImports : maxImports,
          getx : getx, getxLocal : getxLocal, getxImports : getxImports,
          gety : gety, getyLocal : getyLocal, getyImports : getyImports,
          getSignMask : getSignMask, getSignMaskLocal : getSignMaskLocal, getSignMaskImports : getSignMaskImports,
          abs : abs, absLocal : absLocal, absImports : absImports,
          neg : neg, negLocal : negLocal, negImports : negImports,
          sqrt : sqrt, sqrtLocal : sqrtLocal, sqrtImports : sqrtImports,
          scale : scale, scaleLocal : scaleLocal, scaleImports : scaleImports,
          withX : withX, withXLocal : withXLocal, withXImports : withXImports,
          withY : withY, withYLocal : withYLocal, withYImports : withYImports}
}


var a = SIMD.float64x2(+1.1, +2.2);
var b = SIMD.float64x2(+3.3, +4.4);
var m = asmModule(this, {a : a, b : b});

var result = m.add(a, b);
var expected = SIMD.float64x2.add(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.addLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.addImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.sub(a, b);
var expected = SIMD.float64x2.sub(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.subLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.subImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.mul(a, b);
var expected = SIMD.float64x2.mul(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.mulLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.mulImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.div(a, b);
var expected = SIMD.float64x2.div(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.divLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.divImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.min(a, b);
var expected = SIMD.float64x2.min(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.minLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.minImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.max(a, b);
var expected = SIMD.float64x2.max(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.maxLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.maxImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.getx(a);
var expected = a.x;
assertEquals(result, expected);

var result = m.getxLocal();
assertEquals(result, expected);

var result = m.getxImports();
assertEquals(result, expected);

var result = m.gety(a);
var expected = a.y;
assertEquals(result, expected);

var result = m.getyLocal();
assertEquals(result, expected);

var result = m.getyImports();
assertEquals(result, expected);

var result = m.getSignMask(a);
var expected = a.signMask;
assertEquals(result, expected);

var result = m.getSignMaskLocal();
assertEquals(result, expected);

var result = m.getSignMaskImports();
assertEquals(result, expected);

var result = m.abs(a);
var expected = SIMD.float64x2.abs(a);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.absLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.absImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.neg(a);
var expected = SIMD.float64x2.neg(a);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.negLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.negImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.sqrt(a);
var expected = SIMD.float64x2.sqrt(a);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.sqrtLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.sqrtImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.scale(a, 20);
var expected = SIMD.float64x2.scale(a, 20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.scaleLocal(20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.scaleImports(20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.withX(a, 20);
var expected = SIMD.float64x2.withX(a, 20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.withXLocal(20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.withXImports(20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.withY(a, 20);
var expected = SIMD.float64x2.withY(a, 20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.withYLocal(20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);

var result = m.withYImports(20);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
