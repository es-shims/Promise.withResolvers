'use strict';

var defineProperties = require('define-properties');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();
var hasStrictMode = require('has-strict-mode')();

var runTests = require('./tests');

module.exports = function (t) {
	t.equal(Promise.withResolvers.length, 0, 'Promise.withResolvers has a length of 0');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Promise.withResolvers.name, 'withResolvers', 'Promise.withResolvers has name "withResolvers"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Promise, 'withResolvers'), 'Promise.withResolvers is not enumerable');
		et.end();
	});

	t.test('bad object value', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Promise.withResolvers.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Promise.withResolvers.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(function withResolvers() { return Promise.withResolvers.call(typeof this === 'undefined' ? Promise : this); }, t);
};
