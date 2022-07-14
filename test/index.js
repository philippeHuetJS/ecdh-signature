'use strict'

var Curve = require('..')
var assert = require('assert')

describe('.sign(data)', function () {
  it('should require an argument', function () {
    var signed = Curve.sign.bind(null)
    assert.throws(signed, /The "data" argument.*required./)
  })
  it('should be of type string', function () {
    var signed = Curve.sign.bind(null, Buffer.from('foo'))
    assert.throws(signed, /The "data" argument.*string./)
  })
  it('should generate a signature', function () {
    var signed = Curve.sign('foo')
    assert.ok(typeof signed === 'string')
    var arr = [94, 95, 96]
    assert.ok(arr.some(function (arg) {
      return arg === signed.length
    }))
  })
})

describe('.verify(data, sig)', function () {
  it('should require an argument', function () {
    var verified = Curve.verify.bind(null)
    assert.throws(verified, /The "data" argument.*required./)
  })
  it('should be of type string', function () {
    var verified = Curve.verify.bind(null, Buffer.from('foo'))
    assert.throws(verified, /The "data" argument.*string./)
  })
  it('should verify a signature', function () {
    var signed = Curve.sign('foo')
    var verified = Curve.verify('foo', signed)
    assert.ok(typeof verified === 'boolean')
  })
})
