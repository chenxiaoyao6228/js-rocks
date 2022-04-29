module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    'no-empty-function': 'off',
    'no-unused-vars': 'off',
    'no-console': 'warn',
    'space-before-function-paren': 'warn',
    semi: 'warn',
    quotes: ['warn', 'single'],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx', '**/*.test.js', '**/*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
};
