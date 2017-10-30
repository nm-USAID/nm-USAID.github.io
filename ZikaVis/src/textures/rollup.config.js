import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		plugins: [uglify({}, minify)],
		output: {file: pkg.browser, format: 'umd'},
		name: 'textures'
	},
	{
		input: 'src/main.js',
		output: [
			{file: pkg.main, format: 'cjs'},
			{file: pkg.module, format: 'es'}
		]
	}
];
