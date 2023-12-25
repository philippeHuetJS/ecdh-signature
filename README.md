# ecdh-signature

[![CI status](https://img.shields.io/github/actions/workflow/status/philippeHuetJS/ecdh-signature/ci.yml)](https://github.com/philippeHuetJS/ecdh-signature/actions)
[![MIT license](https://img.shields.io/github/license/philippeHuetJS/ecdh-signature)](https://github.com/philippeHuetJS/ecdh-signature/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/philippeHuetJS/ecdh-signature)](https://github.com/philippeHuetJS/ecdh-signature/releases)

Module to sign and verify a data

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm](https://www.npmjs.com/) registry.

```sh
$ npm install ecdh-signature
```

## API

```js
var Curve = require('ecdh-signature')
```

TypeScript:

```typescript
import Curve from 'ecdh-signature'
```

### curve.sign(data)

```js
var curve = new Curve('secp256k1');

var signed = curve.sign('foo')
console.log(signed) // "MEUCIHMRmuRdNeSfaxFCeliGzj3+p0sh6jjybLl9uChiljwCAiEA2VaHSt25UW1j/VacH3ZxQs0zHlqy0ImOjjV7fQlrn7E"
```

### curve.verify(data, sig)

```js
var verified = curve.verify('foo', signed)
console.log(verified) // true
```

## Description

Signs and verifies a data with ECDH key exchange scheme. Returns a string in base64 format and boolean value.

## Test

```sh
$ npm run test
```

## Documentation

Find [here](https://nodejs.org/en/docs/) the official documentation.

## License

[MIT](LICENSE)
