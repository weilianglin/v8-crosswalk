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
  var i4 = stdlib.SIMD.int32x4;
  var i4add = i4.add;
  var i4and = i4.and;
  var i4sub = i4.sub;
  var i4mul = i4.mul;
  var i4or = i4.or;
  var i4xor = i4.xor;

  var a = i4(imports.a);
  var b = i4(imports.b);

  function add(a, b) {
    var a = i4(a);
    var b = i4(b);
    var ret = i4();
    ret = i4add(a, b);
    return i4(ret);
  }

  function addLocal() {
    var a = i4(+1, +2, +3, +4);
    var b = i4(+5, +6, +7, +8);
    var ret = i4();
    ret = i4add(a, b);
    return i4(ret);
  }

  function addImports() {
    var ret = i4();
    ret = i4add(a, b);
    return i4(ret);
  }

  function sub(a, b) {
    var a = i4(a);
    var b = i4(b);
    var ret = i4();
    ret = i4sub(a, b);
    return i4(ret);
  }

  function subLocal() {
    var a = i4(+1, +2, +3, +4);
    var b = i4(+5, +6, +7, +8);
    var ret = i4();
    ret = i4sub(a, b);
    return i4(ret);
  }

  function subImports() {
    var ret = i4();
    ret = i4sub(a, b);
    return i4(ret);
  }

  function mul(a, b) {
    var a = i4(a);
    var b = i4(b);
    var ret = i4();
    ret = i4mul(a, b);
    return i4(ret);
  }

  function mulLocal() {
    var a = i4(+1, +2, +3, +4);
    var b = i4(+5, +6, +7, +8);
    var ret = i4();
    ret = i4mul(a, b);
    return i4(ret);
  }

  function mulImports() {
    var ret = i4();
    ret = i4mul(a, b);
    return i4(ret);
  }

  function and(a, b) {
    var a = i4(a);
    var b = i4(b);
    var ret = i4();
    ret = i4and(a, b);
    return i4(ret);
  }

  function andLocal() {
    var a = i4(+1, +2, +3, +4);
    var b = i4(+5, +6, +7, +8);
    var ret = i4();
    ret = i4and(a, b);
    return i4(ret);
  }

  function andImports() {
    var ret = i4();
    ret = i4and(a, b);
    return i4(ret);
  }

  function or(a, b) {
    var a = i4(a);
    var b = i4(b);
    var ret = i4();
    ret = i4or(a, b);
    return i4(ret);
  }

  function orLocal() {
    var a = i4(+1, +2, +3, +4);
    var b = i4(+5, +6, +7, +8);
    var ret = i4();
    ret = i4or(a, b);
    return i4(ret);
  }

  function orImports() {
    var ret = i4();
    ret = i4or(a, b);
    return i4(ret);
  }

  function xor(a, b) {
    var a = i4(a);
    var b = i4(b);
    var ret = i4();
    ret = i4xor(a, b);
    return i4(ret);
  }

  function xorLocal() {
    var a = i4(+1, +2, +3, +4);
    var b = i4(+5, +6, +7, +8);
    var ret = i4();
    ret = i4xor(a, b);
    return i4(ret);
  }

  function xorImports() {
    var ret = i4();
    ret = i4xor(a, b);
    return i4(ret);
  }

  function getx(a) {
    var a = i4(a);
    var x = a.x;
    return x | 0;
  }

  function gety(a) {
    var a = i4(a);
    var y = a.y;
    return y | 0;
  }

  function getz(a) {
    var a = i4(a);
    var z = a.z;
    return z | 0;
  }

  function getw(a) {
    var a = i4(a);
    var w = a.w;
    return w | 0;
  }

  function getxLocal() {
    var a = i4(+1, +2, +3, +4);
    var x = a.x;
    return x | 0;
  }

  function getyLocal() {
    var a = i4(+1, +2, +3, +4);
    var y = a.y;
    return y | 0;
  }

  function getzLocal() {
    var a = i4(+1, +2, +3, +4);
    var z = a.z;
    return z | 0;
  }

  function getwLocal() {
    var a = i4(+1, +2, +3, +4);
    var w = a.w;
    return w | 0;
  }

  function getxImports() {
    var x = a.x;
    return x | 0;
  }

  function getyImports() {
    var y = a.y;
    return y | 0;
  }

  function getzImports() {
    var z = a.z;
    return z | 0;
  }

  function getwImports() {
    var w = a.w;
    return w | 0;
  }

  return {add : add, addLocal : addLocal, addImports : addImports,
          sub : sub, subLocal : subLocal, subImports : subImports,
          mul : mul, mulLocal : mulLocal, mulImports : mulImports,
          and : and, andLocal : andLocal, andImports : andImports,
          or : or, orLocal : orLocal, orImports : orImports,
          xor : xor, xorLocal : xorLocal, xorImports : xorImports,
          getx : getx, getxLocal : getxLocal, getxImports : getxImports,
          gety : gety, getyLocal : getyLocal, getyImports : getyImports,
          getz : getz, getzLocal : getzLocal, getzImports : getzImports,
          getw : getw, getwLocal : getwLocal, getwImports : getwImports}
}


var a = SIMD.int32x4(+1, +2, +3, +4);
var b = SIMD.int32x4(+5, +6, +7, +8);
var m = asmModule(this, {a : a, b : b});
// and
var result = m.add(a, b);
var expected = SIMD.int32x4.add(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.addLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.addImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// sub
var result = m.sub(a, b);
var expected = SIMD.int32x4.sub(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.subLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.subImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// mul
var result = m.mul(a, b);
var expected = SIMD.int32x4.mul(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.mulLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.mulImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// and
var result = m.and(a, b);
var expected = SIMD.int32x4.and(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.andLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.andImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// or
var result = m.or(a, b);
var expected = SIMD.int32x4.or(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.orLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.orImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

// xor
var result = m.xor(a, b);
var expected = SIMD.int32x4.xor(a, b);
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.xorLocal();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);

var result = m.xorImports();
assertEquals(result.x, expected.x);
assertEquals(result.y, expected.y);
assertEquals(result.z, expected.z);
assertEquals(result.w, expected.w);


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

var result = m.getz(a);
var expected = a.z;
assertEquals(result, expected);

var result = m.getzLocal();
assertEquals(result, expected);

var result = m.getzImports();
assertEquals(result, expected);

var result = m.getw(a);
var expected = a.w;
assertEquals(result, expected);

var result = m.getwLocal();
assertEquals(result, expected);

var result = m.getwImports();
assertEquals(result, expected);
