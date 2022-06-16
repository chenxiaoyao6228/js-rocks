const parser = require('../parser');
const traverse = require('../traverse');
const generate = require('../generate');
const template = require('../template');

function transformSync (code, options) {
  const ast = parser.parse(code, options.parserOpts);

  const pluginApi = {
    template,
  };
  const visitors = {};
  options.plugins &&
    options.plugins.forEach(([plugin, options]) => {
      const res = plugin(pluginApi, options);
      Object.assign(visitors, res.visitor);
    });

  traverse(ast, visitors);
  return generate(ast, code, options.fileName);
}

module.exports = {
  transformSync,
};
