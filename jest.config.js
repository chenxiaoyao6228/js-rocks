/** @type {import('ts-jest').JestConfigWithTsJest} */

// TODO pass pkg name through process.env
module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.test.(js|ts)',
    '!<rootDir>/packages/**/src/**/constant.(js|ts)',
    '!<rootDir>/packages/**/src/**/index.(js|ts)',
  ],
  projects: [
     {
      displayName: 'template-package',
      transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
      },
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/packages/template-package/**/*.test.(js|ts)',
        '<rootDir>/packages/template-package/**/test/*.test.(js|ts)',
      ],
      moduleNameMapper: {
        '@js-rocks/lodash-tiny': '<rootDir>/packages/lodash-tiny/src'
      },
   },
   {
      displayName: 'vue-tiny',
      testEnvironment: 'jsdom',
       transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
      },
      testMatch: [
         '<rootDir>/packages/vue-tiny/**/*.test.(js|ts)',
        '<rootDir>/packages/vue-tiny/**/test/*.test.(js|ts)',
      ],
        moduleNameMapper: {
        '@js-rocks/lodash-tiny': '<rootDir>/packages/lodash-tiny/src'
      },
   },
   {
      displayName: 'react-tiny',
      testEnvironment: 'jsdom',
       transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
      },
      testMatch: [
        '<rootDir>/packages/react-tiny/**/*.test.(js|ts)',
        '<rootDir>/packages/react-tiny/**/test/*.test.(js|ts)',
      ],
        moduleNameMapper: {
        '@js-rocks/lodash-tiny': '<rootDir>/packages/lodash-tiny/src'
      },
   },
   {
      displayName: 'lodash-tiny',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/packages/lodash-tiny/**/*.test.(js|ts)',
        '<rootDir>/packages/lodash-tiny/**/test/*.test.(js|ts)',
      ]
   },
   {
      displayName: 'promise-tiny',
      testEnvironment: 'jsdom',
      testMatch: [
         '<rootDir>/packages/promise-tiny/**/*.test.(js|ts)',
        '<rootDir>/packages/promise-tiny/**/test/*.test.(js|ts)',
      ]
   },
  {
      displayName: 'babel-tiny',
      testEnvironment: 'jsdom',
      testMatch: [
         '<rootDir>/packages/babel-tiny/**/*.test.(js|ts)',
        '<rootDir>/packages/babel-tiny/**/test/*.test.(js|ts)',
      ]
   },
  {
      displayName: 'jsx-parser-tiny',
      testEnvironment: 'jsdom',
      testMatch: [
         '<rootDir>/packages/jsx-parser-tiny/**/*.test.(js|ts)',
        '<rootDir>/packages/jsx-parser-tiny/**/test/*.test.(js|ts)',
      ]
   }
]
};