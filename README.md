# ecdh-signature

[![CI status](https://img.shields.io/github/workflow/status/philippeHuetJS/ecdh-signature/GitHub%20CI)](https://github.com/philippeHuetJS/ecdh-signature/actions)
[![MIT license](https://img.shields.io/github/license/philippeHuetJS/ecdh-signature)](https://github.com/philippeHuetJS/ecdh-signature/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/philippeHuetJS/ecdh-signature)](https://github.com/philippeHuetJS/ecdh-signature/releases)

Wrapper to sign and verify a data

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

### Curve.sign(data)

```js
var signed = Curve.sign('foo')
console.log(signed) // "MEYCIQDmfwUVbDLzZ32uG4VX5Cvur6C6DGhU41lqkXD5p4Vb9AIhAKwtT4422q3KP4+6CsCQgqnva34Cw0KO3qoDxvwS3+Lu"
```

### Curve.verify(data, sig)

```js
var verified = Curve.verify('foo', signed)
console.log(verified) // true
```

Signs and verifies a data with ECDH asymmetric key pair. Returns a string with base64 encoding and boolean value.

## Testing

```sh
$ npm run test
```

## Documentation

Find [here](https://nodejs.org/en/docs/) the official documentation.

## License

[MIT](LICENSE)
