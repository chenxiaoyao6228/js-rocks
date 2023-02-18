/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.test.ts',
    '!<rootDir>/packages/**/src/**/constant.ts',
    '!<rootDir>/packages/**/src/**/index.ts',
  ],
  projects: [
   
  {
      displayName: 'babel-tiny',
      testEnvironment: 'node',
      transform: {'^.+\\.ts?$': 'ts-jest'},
      testMatch: [
        '<rootDir>/packages/babel-tiny/**/src/**/*.test.ts',
        '<rootDir>/packages/babel-tiny/**/src/**/test/*.test.ts',
      ]
   },
  {
      displayName: 'jsx-parser-tiny',
      testEnvironment: 'node',
      transform: {'^.+\\.ts?$': 'ts-jest'},
      testMatch: [
        '<rootDir>/packages/jsx-parser-tiny/**/src/**/*.test.ts',
        '<rootDir>/packages/jsx-parser-tiny/**/src/**/test/*.test.ts',
      ]
   },
    {
      displayName: 'lodash-tiny',
      testEnvironment: 'node',
      transform: {'^.+\\.ts?$': 'ts-jest'},
      testMatch: [
        '<rootDir>/packages/lodash-tiny/**/src/**/*.test.ts',
        '<rootDir>/packages/lodash-tiny/**/src/**/test/*.test.ts',
      ]
   },
   {
      displayName: 'vue-tiny',
      testEnvironment: 'jsdom',
      transform: {'^.+\\.ts?$': 'ts-jest'},
      testMatch: [
        '<rootDir>/packages/vue-tiny/**/src/**/*.test.ts',
        '<rootDir>/packages/vue-tiny/**/src/**/test/*.test.ts',
      ]
   }
]
};