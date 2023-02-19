const parser = require('../parser');
const traverse = require('../traverse');
const generate = require('../generate');
const template = require('../template');

function transformSync(code, options) {
  const { plugins, parserOpts, fileName } = options;
  const ast = parser.parse(code, parserOpts);

  const pluginApi = {
    template,
  };
  const visitors = {};
  plugins &&
    plugins.forEach(([plugin, options]) => {
      const res = plugin(pluginApi, options);
      Object.assign(visitors, res.visitor);
    });

  options.presets &&
    options.presets.reverse().forEach(([preset, options]) => {
      const plugins = preset(pluginApi, options);
      plugins.forEach(([plugin, options]) => {
        const res = plugin(pluginApi, options);
        Object.assign(visitors, res.visitor);
      });
    });

  traverse(ast, visitors);
  return generate(ast, code, fileName);
}

module.exports = {
  transformSync,
};
