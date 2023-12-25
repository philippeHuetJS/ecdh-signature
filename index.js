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

module.exports = (function curve() {
  return new Curve('secp256k1')
})()

/**
 * Module constructors.
 * @private
 */

function Curve(scheme) {
  this.derivedKey = generateKey()

  var keys = crypto.generateKeyPairSync('ec', {
    namedCurve: scheme,

    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'sec1',
      format: 'pem',
      cipher: 'blowfish',
      passphrase: this.derivedKey
    }
  })

  this.publicKey = keys.publicKey
  this.privateKey = keys.privateKey
}

/**
 * Method to generate a signature.
 *
 * @param {String} data - The data to sign with ECDH key exchange scheme.
 * @returns {String} - The signature in base64 format.
 * @throws {Error} - In case of invalid input.
 * @public
 */

Curve.prototype.sign = function sign(data) {
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
    .sign(
      {
        key: this.privateKey,
        passphrase: this.derivedKey
      },
      'base64'
    )
    .replace(/=+$/, '')
}

/**
 * Method to verify a signature.
 *
 * @param {String} data - The data to verify with ECDH key exchange scheme.
 * @param {String} sig - The signature in base64 format.
 * @returns {Boolean} - True if the signature matches the data, false otherwise.
 * @throws {Error} - In case of invalid input.
 * @public
 */

Curve.prototype.verify = function verify(data, sig) {
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
    .verify(
      {
        key: this.publicKey,
        asymmetricKeyDetails: {
          namedCurve: this.scheme
        }
      },
      sig,
      'base64'
    )
}

/**
 * Function to generate a key for Blowfish.
 *
 * @returns {String} - The generated key in hexadecimal format.
 * @private
 */

function generateKey() {
  // generate Blowfish key
  return crypto
    .pbkdf2Sync(
      JSON.stringify(process.env.KEY),
      crypto.randomBytes(16),
      10000,
      64,
      'sha512'
    )
    .toString('hex')
}
