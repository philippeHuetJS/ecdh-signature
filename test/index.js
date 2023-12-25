'use strict'

var Curve = require('..')
var assert = require('assert')

var curve = new Curve('secp256k1')

describe('sign', function () {
  it('should require an argument', function () {
    var signed = curve.sign.bind(curve)

    assert.throws(signed, /The "data" argument.*required./)
  })

  it('should be of type string', function () {
    var signed = curve.sign.bind(curve, { prop: 'foo' })

    assert.throws(signed, /The "data" argument.*string./)
  })

  it('should generate a signature', function () {
    var signed = curve.sign('foo')

    assert.ok(typeof signed === 'string')
    assert.ok(signed.length > 0)
    assert.ok(/^[a-zA-Z0-9+/]+={0,2}$/.test(signed))
  })
})

describe('verify', function () {
  it('should require an argument', function () {
    var verified = curve.verify.bind(curve)

    assert.throws(verified, /The "data" argument.*required./)
  })

  it('should be of type string', function () {
    var verified = curve.verify.bind(curve, { prop: 'foo' })

    assert.throws(verified, /The "data" argument.*string./)
  })

  it('should verify a valid signature', function () {
    var signed = curve.sign('foo')
    var verified = curve.verify('foo', signed)

    assert.strictEqual(verified, true)
  })

  it('should verify an invalid signature', function () {
    var verified = curve.verify('foo', 'bar')

    assert.strictEqual(verified, false)
  })
})
