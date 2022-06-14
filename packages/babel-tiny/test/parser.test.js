// test parse
const { parse } = require('../src/parser/index');

describe('parser', () => {
  test('should accept plugin', () => {
    const code = `
          const a = 1
          const b = '2'
      `;
    const res = parse(code);
    // console.log('res------', res.body[0].declarations);
  });
});
