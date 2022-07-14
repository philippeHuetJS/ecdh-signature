/*!
 * ecdh-signature
 * Copyright(c) 2022 Philippe Huet
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var crypto = require('crypto')

/**
 * Module exports.
 * @public
 */

module.exports = curve()

/**
 * Module instances.
 * @private
 */

function curve () {
  return new Curve('aes-256-cbc')
}

/**
 * Module constructors.
 * @param {String} algorithm
 * @private
 */

function Curve (algorithm) {
  this.key = crypto.randomBytes(32)
  // asymmetric key pair
  var keyPair = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'sec1',
      format: 'pem',
      cipher: algorithm,
      passphrase: this.key
    }
  })
  this.publicKey = keyPair.publicKey
  this.privateKey = keyPair.privateKey
}

/**
 * Method to generate a signature.
 *
 * @param {String} data
 * @returns {String}
 * @public
 */

Curve.prototype.sign = function sign (data) {
  if (!data) {
    throw new TypeError('The "data" argument is required.')
  }
  if (typeof data !== 'string') {
    throw new TypeError('The "data" argument must be a string.')
  }
  // generate signature
  return crypto
    .createSign('sha256')
    .update(data)
    .sign({
      key: this.privateKey,
      passphrase: this.key
    }, 'base64')
    .replace(/=+$/, '')
}

/**
 * Method to verify a signature.
 *
 * @param {String} data
 * @param {String} sig
 * @returns {Boolean}
 * @public
 */

Curve.prototype.verify = function verify (data, sig) {
  if (!data) {
    throw new TypeError('The "data" argument is required.')
  }
  if (typeof data !== 'string') {
    throw new TypeError('The "data" argument must be a string.')
  }
  // verify signature
  return crypto
    .createVerify('sha256')
    .update(data)
    .verify({
      key: this.publicKey
    }, sig, 'base64')
}
