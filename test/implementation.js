'use strict';

var test = require('tape');
var callBind = require('call-bind');

var implementation = require('../implementation');
var runTests = require('./tests');

var bound = callBind(implementation);

var rebindable = function withResolvers() {
	return bound(typeof this === 'undefined' ? Promise : this);
};

test('as a function', { skip: typeof Promise !== 'function' }, function (t) {
	t.test('bad Promise/this value', function (st) {
		// eslint-disable-next-line no-useless-call
		st['throws'](function () { implementation.call(undefined); }, TypeError, 'undefined is not an object');

		// eslint-disable-next-line no-useless-call
		st['throws'](function () { implementation.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	t['throws'](
		implementation,
		TypeError,
		'no receiver throws'
	);

	runTests(rebindable, t);

	t.end();
});
