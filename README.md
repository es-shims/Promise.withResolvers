# promise.withresolvers <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

ES proposal spec-compliant shim for Promise.withResolvers. Invoke its "shim" method to shim `Promise.withResolvers` if it is unavailable or noncompliant. **Note**: a global `Promise` must already exist: the [es6-shim](https://github.com/es-shims/es6-shim) is recommended.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment that has `Promise` available globally, and complies with the [spec](https://tc39.es/proposal-promise-with-resolvers/).

Most common usage:
```js
var assert = require('assert');
var withResolvers = require('promise.withresolvers');

var obj = withResolvers(Promise);
assert.equal(obj.promise instanceof Promise, true);
assert.equal(typeof obj.resolve, 'function');
assert.equal(typeof obj.reject, 'function');

withResolvers.shim(); // will be a no-op if not needed

var obj2 = Promise.withResolvers();

assert.equal(obj2.promise instanceof Promise, true);
assert.equal(typeof obj2.resolve, 'function');
assert.equal(typeof obj2.reject, 'function');
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.com/package/promise.withresolvers
[npm-version-svg]: https://versionbadg.es/es-shims/Promise.withResolvers.svg
[deps-svg]: https://david-dm.org/es-shims/Promise.withResolvers.svg
[deps-url]: https://david-dm.org/es-shims/Promise.withResolvers
[dev-deps-svg]: https://david-dm.org/es-shims/Promise.withResolvers/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Promise.withResolvers#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/promise.withresolvers.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/promise.withresolvers.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/promise.withresolvers.svg
[downloads-url]: https://npm-stat.com/charts.html?package=promise.withresolvers
[codecov-image]: https://codecov.io/gh/es-shims/Promise.withResolvers/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/Promise.withResolvers/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Promise.withResolvers
[actions-url]: https://github.com/es-shims/Promise.withResolvers/actions
