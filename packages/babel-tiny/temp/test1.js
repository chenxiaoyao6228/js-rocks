// test parse
const { parse } = require('../src/parser/index');

const code = `
    const a = 1
    const b = '2'
    console.log(a)
`;

const res = parse(code);
console.log('res------', res);
