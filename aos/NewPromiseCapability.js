'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsCallable = require('es-abstract/2022/IsCallable');
var IsConstructor = require('es-abstract/2022/IsConstructor');

module.exports = function NewPromiseCapability(C) {
	if (!IsConstructor(C)) {
		throw new $TypeError('C must be a constructor'); // step 1
	}

	var resolvingFunctions = { '[[Resolve]]': void undefined, '[[Reject]]': void undefined }; // step 3

	var executor = function (resolve, reject) { // steps 4-5
		if (typeof resolvingFunctions['[[Resolve]]'] !== 'undefined' || typeof resolvingFunctions['[[Reject]]'] !== 'undefined') {
			throw new $TypeError('executor has already been called'); // step 4.a, 4.b
		}
		resolvingFunctions['[[Resolve]]'] = resolve; // step 4.c
		resolvingFunctions['[[Reject]]'] = reject; // step 4.d
	};

	var promise = new C(executor); // step 6

	if (!IsCallable(resolvingFunctions['[[Resolve]]']) || !IsCallable(resolvingFunctions['[[Reject]]'])) {
		throw new $TypeError('executor must provide valid resolve and reject functions'); // steps 7-8
	}

	return {
		'[[Promise]]': promise,
		'[[Resolve]]': resolvingFunctions['[[Resolve]]'],
		'[[Reject]]': resolvingFunctions['[[Reject]]']
	}; // step 9
};
