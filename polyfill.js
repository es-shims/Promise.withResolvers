'use strict';

var requirePromise = require('./requirePromise');

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	requirePromise();
	return typeof Promise.withResolvers === 'function' ? Promise.withResolvers : implementation;
};
