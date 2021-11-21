#!/usr/bin/env node

let path = require('path');

let config = require(path.resolve(process.cwd(), 'webpack.config.js'));

let Compiler = require('../lib/Compiler.js');

let compiler = new Compiler(config);

// 调用开始执行的钩子函数
compiler.hooks.entryOption.call();

compiler.run();
