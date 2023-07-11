'use strict';

require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');
var hasStrictMode = require('has-strict-mode')();
var functionsHaveNames = require('functions-have-names')();

var isEnumerable = Object.prototype.propertyIsEnumerable;

var runTests = require('./tests');

test('shimmed', { skip: typeof Promise !== 'function' }, function (t) {
	var fn = Promise.withResolvers;
	t.equal(fn.length, 0, 'Promise.withResolvers has a length of 0');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(fn.name, 'withResolvers', 'Promise.withResolvers has name "withResolvers"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Promise, 'withResolvers'), 'Promise.withResolvers is not enumerable');
		et.end();
	});

	t.test('bad array/this value', { skip: !hasStrictMode }, function (st) {
		/* eslint no-useless-call: 0 */
		st['throws'](function () { return fn.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return fn.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(fn), t);

	t.end();
});
