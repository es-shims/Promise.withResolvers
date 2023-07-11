'use strict';

var requirePromise = require('./requirePromise');

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimWithResolvers() {
	requirePromise();

	var polyfill = getPolyfill();
	define(Promise, { withResolvers: polyfill }, {
		withResolvers: function testWithResolvers() {
			return Promise.withResolvers !== polyfill;
		}
	});
	return polyfill;
};
