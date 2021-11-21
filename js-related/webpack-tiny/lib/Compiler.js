const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { SyncHook } = require('tapable'); // 实现发布订阅

// babel 相关的插件

// babylon, 将代码解析为ast
// https://www.npmjs.com/package/babylon
let babylon = require('babylon');

// @babel/traverse, 提供了相应的钩子函数, 遍历ast修改节点
// https://babeljs.io/docs/en/babel-traverse
// 可以通过: https://astexplorer.net 的查看ast的结构
let traverse = require('@babel/traverse').default;

// @babel/generator: 将ast转化为代码,
// https://babeljs.io/docs/en/next/babel-generator.html
let generator = require('@babel/generator').default;

// @babel/types: ast中的类型定义, 如表达式等
// https://babeljs.io/docs/en/next/babel-types.html
const t = require('@babel/types');

class Compiler {
	constructor(config) {
		this.config = config;
		this.entryId;
		// 工作路径
		this.root = process.cwd();
		this.entry = config.entry;
		this.modules = {};
		this.hooks = {
			entryOption: new SyncHook(),
			compile: new SyncHook(),
			afterCompile: new SyncHook(),
			afterPlugins: new SyncHook(),
			run: new SyncHook(),
			emit: new SyncHook(),
			done: new SyncHook()
		};

    // 如果传递了plugin参数, 遍历所有的Plugins, 执行apply方法
    // plugin类拿到compiler实例, 然后订阅hooks中定义的事件, 如compile, afterCompile
		let plugins = this.config.plugins;
		if (Array.isArray(plugins)) {
			plugins.forEach(plugin => {
				plugin.apply(this);
			});
		}
		this.hooks.afterPlugins.call();
	}
	getSource(modulePath) {
		// modulePath可能是其他文件类型, 如less文件
		let content = fs.readFileSync(modulePath, 'utf-8');
		let rules = this.config.module.rules;
		for (let i = 0; i < rules.length; i++) {
			let { test, use } = rules[i];
			let len = use.length - 1;
			if (test.test(modulePath)) {
				// 从最后一个loader开始,递归调用所有的loader函数来处理content
				function normalLoader() {
					let loader = require(use[len--]);
					content = loader(content);
					if (len >= 0) {
						normalLoader();
						console.log(content);
					}
				}
				normalLoader();
			}
		}
		return content;
	}
	parse(source, parentPath) {
		let ast = babylon.parse(source);
		let dependencies = [];
		// 对ast做修改, 将require方法改为__webpack_require__, 同时收集依赖
		traverse(ast, {
			CallExpression(p) {
				let node = p.node;
				if (node.callee.name === 'require') {
					node.callee.name = '__webpack_require__';
					let moduleName = node.arguments[0].value; // 模块的引用名
					moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); // 添加文件扩展名
					moduleName = path.join(parentPath, moduleName).replace('\\', '/');
					dependencies.push(moduleName);
					node.arguments = [t.stringLiteral(moduleName)]; // __webpack_require__('./src/index.js')
				}
			}
		});
		let sourceCode = generator(ast).code;
		return { sourceCode, dependencies };
	}

	buildModules(modulePath, isEntry) {
		// 读取文件, 拿到当前模块中内容
		let source = this.getSource(modulePath);
		// 拿到模块的id, 也就是相对路径
		let moduleName = path.relative(this.root, modulePath);

		if (isEntry) {
			// this.entryId = path.join(moduleName);
			this.entryId = moduleName.replace('\\', '/');
		}
		let { sourceCode, dependencies } = this.parse(
			source,
			path.dirname(moduleName) // 文件夹名
		);
		// 把相对路径和模块中的内容对应起来
		// this.modules[path.join(moduleName)] = sourceCode;
		this.modules[moduleName.replace('\\', '/')] = sourceCode;

		dependencies.forEach(dep => {
			//递归加载
			this.buildModules(path.join(this.root, dep), false);
		});
	}
	emitFile() {
		// 输入文件到我们的output配置下
		let main = path.join(this.config.output.path, this.config.output.filename);
		let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
		let code = ejs.render(templateStr, {
			entryId: this.entryId,
			modules: this.modules,
			keys: Object.keys(this.modules)
		});
		this.assets = {};
		this.assets[main] = code;
		fs.writeFileSync(main, this.assets[main]);
	}
	run() {
		// 开始运行的钩子
		this.hooks.run.call();
		// 执行并创建模块之间的依赖关系

		// 开始编译的钩子
		this.hooks.compile.call();

		this.buildModules(path.resolve(this.root, this.entry), true);

		// 结束编译的钩子
		this.hooks.afterCompile.call();

		// 发射一个文件, 打包后的文件
		this.emitFile();

		// 发射成功, 结束的钩子
		this.hooks.emit.call();
		this.hooks.done.call();
	}
}

module.exports = Compiler;
