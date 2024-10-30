module.exports = {
	// https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
	// This option interrupts the configuration hierarchy at this file
	// Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
	root: true,

	// https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
	// Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
	// `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
	parserOptions: {
		parser: require.resolve('@typescript-eslint/parser'),
		extraFileExtensions: ['.vue']
	},

	env: {
		browser: true,
		es2021: true,
		node: true
	},

	// Rules order is important, please avoid shuffling them
	extends: [
		// Base ESLint recommended rules
		// 'eslint:recommended',

		// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
		// ESLint typescript rules
		'plugin:@typescript-eslint/recommended',

		// Uncomment any of the lines below to choose desired strictness,
		// but leave only one uncommented!
		// See https://eslint.vuejs.org/rules/#available-rules
		'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
		// 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
		// 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

		// https://github.com/prettier/eslint-config-prettier#installation
		// usage with Prettier, provided by 'eslint-config-prettier'.
		'prettier',
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript"
	],

	plugins: [
		// required to apply rules which need type information
		'@typescript-eslint',

		// https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
		// required to lint *.vue files
		'vue',

		// https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
		// Prettier has not been included as plugin to avoid performance impact
		// add it as an extension for your IDE
		// "simple-import-sort",
	],

	globals: {
		ga: 'readonly', // Google Analytics
		cordova: 'readonly',
		__statics: 'readonly',
		__QUASAR_SSR__: 'readonly',
		__QUASAR_SSR_SERVER__: 'readonly',
		__QUASAR_SSR_CLIENT__: 'readonly',
		__QUASAR_SSR_PWA__: 'readonly',
		process: 'readonly',
		Capacitor: 'readonly',
		chrome: 'readonly'
	},

	settings: {
		"import/resolver": {
			"typescript": {},
			"node": {
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	},
	// add your custom rules here
	rules: {
		// 'sort-imports': 'error',
		"import/order": [
			"warn",
			{
				groups: ["builtin", "external", ["sibling", "parent"], "index"],
				pathGroups: [
					{
						pattern: "$app/**",
						group: "external"
					},
					{
						pattern: "~/**",
						group: "sibling"
					}
				],
				alphabetize: {
					order: "asc",
					caseInsensitive: true
				},
				"newlines-between": "always"
			}
		],
		// 'simple-import-sort/imports': [
		// 	"error",
		// 	{
		// 		"groups": [
		// 			// 1. Side effect imports at the start. For me this is important because I want to import reset.css and global styles at the top of my main file.
		// 			["^\\u0000"],
		// 			// 2. `react` and packages: Things that start with a letter (or digit or underscore), or `@` followed by a letter.
		// 			["^vue$", "^@?\\w"],
		// 			// 3. Absolute imports and other imports such as Vue-style `@/foo`.
		// 			// Anything not matched in another group. (also relative imports starting with "../")
		// 			["^@", "^"],
		// 			// 4. relative imports from same folder "./" (I like to have them grouped together)
		// 			["^\\./"],
		// 			// 5. style module imports always come last, this helps to avoid CSS order issues
		// 			["^.+\\.(module.css|module.scss)$"],
		// 			// 6. media imports
		// 			["^.+\\.(gif|png|svg|jpg)$"]
		// 		]
		// 	}
		// ],
		// 'simple-import-sort/exports': 'error',

		'prefer-promise-reject-errors': 'off',

		quotes: ['warn', 'single', { avoidEscape: true }],

		// this rule, if on, would require explicit return type on the `render` function
		'@typescript-eslint/explicit-function-return-type': 'off',

		// in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
		'@typescript-eslint/no-var-requires': 'off',

		// The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
		// does not work with type definitions
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',

		// allow debugger during development only
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

		'@typescript-eslint/no-explicit-any': 'off',
	}
}
