const acorn = require('acorn');

const syntaxPlugin = {
  literal: require('./plugins/literal'),
};

const defaultOptions = {
  plugins: [],
};

function parse(code, options) {
  const resolvedOptions = Object.assign({}, defaultOptions, options);

  const newParser = resolvedOptions.plugins.reduce((Parser, pluginName) => {
    let plugin = syntaxPlugin[pluginName];
    return plugin ? Parser.extend(plugin) : Parser;
  }, acorn.Parser);

  return new newParser(code, {
    locations: true,
  });
}

module.exports = {
  parse,
};
