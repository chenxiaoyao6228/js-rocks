const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const compilerSFC = require('@vue/compiler-sfc');
const compilerDOM = require('@vue/compiler-dom');

const app = new Koa();

function rewriteImport (path) {
  return path.replace(/ from ['"](.*)['"]/g, (s1, s2) => {
    if (['./', '/', '../'].some(p => s2.startsWith(p))) {
      return s1;
    } else {
      return ` from '/modules/${s2}'`;
    }
  });
}

app.use(async ctx => {
  try {
    const { url, query, request } = ctx;
    const p = url.split('?')[0];
    // eslint-disable-next-line no-undef
    const resourceRoot = path.join(__dirname, '../examples');

    if (p === '/') {
      const indexHTML = fs.readFileSync(path.join(resourceRoot, '/index.html'), 'utf8');
      ctx.type = 'text/html';
      ctx.body = indexHTML;
    } else if (p.endsWith('.js')) {
      let rawcontent = fs.readFileSync(path.join(resourceRoot, url), 'utf8');
      let content = rewriteImport(rawcontent);
      ctx.type = 'application/javascript';
      ctx.body = content;
    } else if (p.startsWith('/modules/')) {
      const moduleName = url.replace('/modules/', '');
      // eslint-disable-next-line
      const prefix = path.join(__dirname, '../node_modules', moduleName);
      const pkgPath = path.join(prefix, 'package.json');
      const distPath = path.join(prefix, require(pkgPath).module);
      const content = fs.readFileSync(distPath, 'utf8');
      ctx.type = 'application/javascript';
      ctx.body = content;
    } else if (p.endsWith('.vue')) {
      const content = fs.readFileSync(path.join(resourceRoot, p), 'utf8');
      const res = compilerSFC.parse(content);
      const scriptContent = res.descriptor.script.content;
      ctx.type = 'application/javascript';
      ctx.body = rewriteImport(scriptContent);
    }
  } catch (error) {
    console.log('server error:', error);
  }
});

app.listen(3000, () => {
  console.log('vite server is running!');
});
