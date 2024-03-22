'use strict';

var requirePromise = require('./requirePromise');

requirePromise();

var CreateDataPropertyOrThrow = require('es-abstract/2024/CreateDataPropertyOrThrow');

var NewPromiseCapability = require('es-abstract/2024/NewPromiseCapability');

module.exports = function withResolvers() {
	var C = this; // step 1

	var promiseCapability = NewPromiseCapability(C); // step 2

	var obj = {}; // step 3

	CreateDataPropertyOrThrow(obj, 'promise', promiseCapability['[[Promise]]']); // step 4

	CreateDataPropertyOrThrow(obj, 'resolve', promiseCapability['[[Resolve]]']); // step 5

	CreateDataPropertyOrThrow(obj, 'reject', promiseCapability['[[Reject]]']); // step 6

	return obj; // step 7
};
