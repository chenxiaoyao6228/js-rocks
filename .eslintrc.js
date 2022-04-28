module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 8
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars":  [
      "error",
      {
        "varsIgnorePattern": "^_"
      }
    ],
    "no-unused-vars": "off",
    "no-console": "warn",
    "space-before-function-paren": "warn",
    "semi": "warn",
    "quotes": ["warn", "single"]
  }
}