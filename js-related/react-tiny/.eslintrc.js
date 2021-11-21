module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  plugins: ['babel', 'prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    browser: true,
    commonjs: true
  },
  globals: {
    process: true,
    describe: true,
    test: true,
    __dirname: true,
    expect: true,
    jest: true
  }
}
