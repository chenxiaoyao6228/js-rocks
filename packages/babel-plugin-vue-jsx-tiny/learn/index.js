var acorn = require('acorn');
var jsx = require('./acorn-jsx');
acorn.Parser.extend(jsx()).parse('<div>{hello}</div>', {});
