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

module.exports = Curve

/**
 * Module constructors.
 *
 * @class Curve
 * @classdesc A class representing an ECDH-based cryptographic scheme for key exchange.
 * @param {String} scheme - The name of the scheme.
 * @param {String} [key] - Optional key for EC.
 * @throws {TypeError} Throws an error if the provided scheme or key is invalid.
 * @public
 */

function Curve(scheme, key = generateKey()) {
  if (
    !scheme ||
    typeof scheme !== 'string' ||
    !crypto.getCurves().includes(scheme)
  ) {
    throw new TypeError(
      `Invalid scheme. Expected one of: ${crypto
        .getCurves()
        .join(', ')}`
    )
  }

  this.scheme = scheme
  this.derivedKey = generateDerivedKey(key)

  var keys = crypto.generateKeyPairSync('ec', {
    namedCurve: this.scheme,

    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'sec1',
      format: 'pem',
      cipher: 'aes-256-cbc',
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
 * @throws {TypeError} - In case of invalid input.
 * @public
 */

Curve.prototype.sign = function sign(data) {
  if (arguments.length === 0) {
    throw new TypeError('The "data" argument is required.')
  }

  if (!data || typeof data !== 'string') {
    throw new TypeError(
      'The "data" argument must be a non-empty string.'
    )
  }

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
 * @throws {TypeError} - In case of invalid input.
 * @public
 */

Curve.prototype.verify = function verify(data, sig) {
  if (arguments.length === 0) {
    throw new TypeError('The "data" argument is required.')
  }

  if (!data || typeof data !== 'string') {
    throw new TypeError(
      'The "data" argument must be a non-empty string.'
    )
  }

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
 * Function to generate a derived key for encryption.
 *
 * @param {String} key - The secret passphrase used for key derivation.
 * @returns {String} - The derived key in hexadecimal format.
 * @private
 */

function generateDerivedKey(key) {
  return crypto
    .pbkdf2Sync(key, crypto.randomBytes(16), 10000, 64, 'sha512')
    .toString('hex')
}

/**
 * Function to generate a key when no key is provided.
 *
 * @returns {String} - The generated key in hexadecimal format.
 * @private
 */

function generateKey() {
  return crypto
    .generateKeySync('aes', { length: 128 })
    .export()
    .toString('hex')
}
