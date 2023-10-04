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

	t.test('test262: test/built-ins/Promise/withResolvers/capability-executor-called-twice.js', function (st) {
		var checkPoint = '';
		function fn1(executor) {
			checkPoint += 'a';
			executor();
			checkPoint += 'b';
			executor(function () {}, function () {});
			checkPoint += 'c';
		}
		Promise.withResolvers.call(fn1);
		st.equal(checkPoint, 'abc', 'executor initially called with no arguments');

		checkPoint = '';
		function fn2(executor) {
			checkPoint += 'a';
			executor(undefined, undefined);
			checkPoint += 'b';
			executor(function () {}, function () {});
			checkPoint += 'c';
		}
		Promise.withResolvers.call(fn2);
		st.equal(checkPoint, 'abc', 'executor initially called with (undefined, undefined)');

		checkPoint = '';
		function fn3(executor) {
			checkPoint += 'a';
			executor(undefined, function () {});
			checkPoint += 'b';
			executor(function () {}, function () {});
			checkPoint += 'c';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn3); },
			TypeError,
			'executor initially called with (undefined, function)'
		);
		st.equal(checkPoint, 'ab', 'executor initially called with (undefined, function)');

		checkPoint = '';
		function fn4(executor) {
			checkPoint += 'a';
			executor(function () {}, undefined);
			checkPoint += 'b';
			executor(function () {}, function () {});
			checkPoint += 'c';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn4); },
			TypeError,
			'executor initially called with (function, undefined)'
		);
		st.equal(checkPoint, 'ab', 'executor initially called with (function, undefined)');

		checkPoint = '';
		function fn5(executor) {
			checkPoint += 'a';
			executor('invalid value', 123);
			checkPoint += 'b';
			executor(function () {}, function () {});
			checkPoint += 'c';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn5); },
			TypeError,
			'executor initially called with (String, Number)'
		);
		st.equal(checkPoint, 'ab', 'executor initially called with (String, Number)');

		st.end();
	});

	t.test('test262: test/built-ins/Promise/withResolvers/capability-executor-not-callable.js', function (st) {
		var checkPoint = '';
		function fn1() {
			checkPoint += 'a';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn1); },
			TypeError,
			'executor not called at all'
		);
		st.equal(checkPoint, 'a', 'executor not called at all');

		checkPoint = '';
		function fn2(executor) {
			checkPoint += 'a';
			executor();
			checkPoint += 'b';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn2); },
			TypeError,
			'executor called with no arguments'
		);
		st.equal(checkPoint, 'ab', 'executor called with no arguments');

		checkPoint = '';
		function fn3(executor) {
			checkPoint += 'a';
			executor(undefined, undefined);
			checkPoint += 'b';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn3); },
			TypeError,
			'executor called with (undefined, undefined)'
		);
		st.equal(checkPoint, 'ab', 'executor called with (undefined, undefined)');

		checkPoint = '';
		function fn4(executor) {
			checkPoint += 'a';
			executor(undefined, function () {});
			checkPoint += 'b';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn4); },
			TypeError,
			'executor called with (undefined, function)'
		);
		st.equal(checkPoint, 'ab', 'executor called with (undefined, function)');

		checkPoint = '';
		function fn5(executor) {
			checkPoint += 'a';
			executor(function () {}, undefined);
			checkPoint += 'b';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn5); },
			TypeError,
			'executor called with (function, undefined)'
		);
		st.equal(checkPoint, 'ab', 'executor called with (function, undefined)');

		checkPoint = '';
		function fn6(executor) {
			checkPoint += 'a';
			executor(123, 'invalid value');
			checkPoint += 'b';
		}
		st['throws'](
			function () { Promise.withResolvers.call(fn6); },
			TypeError,
			'executor called with (Number, String)'
		);
		st.equal(checkPoint, 'ab', 'executor called with (Number, String)');

		st.end();
	});

	return t.comment('tests completed');
};
