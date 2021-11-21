const path = require('path');

class P {
	apply(compiler) {
		console.log('start');
		// 订阅emit事件
		compiler.hooks.emit.tap('afterPlugin', function() {
			console.log('afterPlugin');
		});
		compiler.hooks.emit.tap('emit', function() {
			console.log('emit');
		});
	}
}

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					path.resolve(__dirname, 'loaders', 'style-loader'),
					path.resolve(__dirname, 'loaders', 'less-loader')
				]
			}
		]
	},
	plugins: [new P()]
};
