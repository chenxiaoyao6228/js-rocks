// https://github.com/acornjs/acorn/tree/master/acorn
const acorn = require('acorn');

const syntaxPlugin = {
  literal: require('./plugins/literal'),
};

const defaultOptions = {
  plugins: [],
};

function parse (code, options) {
  const resolvedOptions = Object.assign({}, defaultOptions, options);

  const newParser = resolvedOptions.plugins.reduce((Parser, pluginName) => {
    let plugin = syntaxPlugin[pluginName];
    return plugin ? Parser.extend(plugin) : Parser;
  }, acorn.Parser);

  return newParser.parse(code);
}

module.exports = {
  parse,
};
