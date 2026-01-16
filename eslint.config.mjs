import ljharb from '@ljharb/eslint-config/flat';

export default [
	...ljharb,
	{
		rules: {
			'id-length': 'off',
			'new-cap': [
				'error', {
					capIsNewExceptions: [
						'CreateDataPropertyOrThrow',
						'GetIntrinsic',
						'IsCallable',
						'IsConstructor',
						'NewPromiseCapability',
					],
				},
			],
			'sort-keys': 'off',
		},
	},
	{
		files: ['test/**'],
		rules: {
			'func-style': 'off',
			'max-lines-per-function': 'off',
			'max-params': 'off',
			'no-invalid-this': 'off',
		},
	},
];
