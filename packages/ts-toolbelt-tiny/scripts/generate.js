const glob = require('glob');
const path = require('path');
const fs = require('fs');

String.prototype.replaceBetween = function(start, end, what) {
  return this.substring(0, start) + what + this.substring(end);
};

const files = glob.sync('**/*.ts', { cwd: path.join(__dirname, '../src/') });
const filterdFiles = files.filter(f => f.includes('template'));
const srcPath = path.join(__dirname, '../src');
let res = '';
let res2 = '\n';

filterdFiles.forEach(fileName => {
  const fileAbsPath = path.join(srcPath, fileName);
  const fileContent = fs.readFileSync(fileAbsPath, 'utf8');
  const regex = /export\s*type\s*(_[a-zA-Z]*)</;
  const _match = fileContent.match(regex);
  if (_match) {
    const exportName = _match[1];
    res += `export { ${exportName} } from './${fileName}';\n`;
    res2 += `- [${exportName}](./${fileName})\n`;
  }
});

generateTS(res);
generateMD(res2);

function generateTS(content) {
  fs.writeFileSync(path.join(srcPath, 'index.d.ts'), content, 'utf8');
}

function generateMD(content) {
  let mdFilePath = path.join(__dirname, '../README.md');
  let mdFileContent = fs.readFileSync(mdFilePath, 'utf8');
  const startIndex = mdFileContent.indexOf('## Table of Contents') + 20;
  const endIndex = mdFileContent.indexOf('## Implementation details');
  mdFileContent = mdFileContent.replaceBetween(startIndex, endIndex, content);
  fs.writeFileSync(mdFilePath, mdFileContent, 'utf8');
}

console.log('generate file successfully!');
