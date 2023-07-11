'use strict';

module.exports = function (withResolvers, t) {
	if (typeof Promise !== 'function') {
		return t.skip('No global Promise detected');
	}

	var obj = withResolvers(Promise);
	t.deepEqual(
		obj,
		{ promise: obj.promise, resolve: obj.resolve, reject: obj.reject },
		'returned object has expected keys'
	);

	t.ok(obj.promise instanceof Promise, 'promise is a Promise');
	t.equal(typeof obj.resolve, 'function', 'resolve is a function');
	t.equal(typeof obj.reject, 'function', 'reject is a function');

	t.test('resolved', function (st) {
		st.plan(1);

		var toResolve = withResolvers(Promise);
		var sentinel = {};
		toResolve.resolve(sentinel);
		return toResolve.promise.then(function (value) {
			st.equal(value, sentinel, 'resolved to sentinel');
		});
	});

	t.test('rejected', function (st) {
		st.plan(1);

		var toResolve = withResolvers(Promise);
		var sentinel = {};
		toResolve.reject(sentinel);
		return toResolve.promise.then(
			function () { throw st.fail('fail'); },
			function (reason) {
				st.equal(reason, sentinel, 'rejected to sentinel');
			}
		);
	});

	t.test('pending', function (st) {
		st.plan(1);

		return Promise.race([
			withResolvers(Promise).promise,
			new Promise(function (resolve) { setTimeout(resolve, 0); })
		]).then(function () {
			st.pass();
		});
	});

	return t.comment('tests completed');
};
