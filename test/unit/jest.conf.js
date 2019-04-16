
const path = require('path')
process.env.JEST_REPORT_FILE = path.resolve(__dirname, './reports/mocha.json')
module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  roots: ['<rootDir>/src/', '<rootDir>/test/unit/specs', `<rootDir>/test/unit/specs`],
  moduleFileExtensions: [
    'js', 'vue', 'json'
  ],
  moduleDirectories: [
    '<rootDir>/src/components/',
    '<rootDir>/src',
    '<rootDir>/node_modules'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'test/(.*)$': '<rootDir>/test/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    'test': '<rootDir>/test/unit/utils/test.js',
    'services/(.*)$': `<rootDir>/src/services/$1`,
    'store$': `<rootDir>/src/store`,
    '^store/(.*)$': `<rootDir>/src/store/$1`,
    '.(css|less|scss)$': '<rootDir>/test/unit/__mocks__/style-mock.js'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/unit/__mocks__/file-transform.js'
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: [`<rootDir>/test/unit/setup`],
  setupTestFrameworkScriptFile: '<rootDir>/test/unit/setupTest',
  coverageDirectory: `<rootDir>/test/unit/coverage`,
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    'src/utilities/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/components/widgets/*.{js,vue}',
    '!src/components/modules/formfield-launcher.vue'
  ],
  'coverageThreshold': {
    'global': {
      'branches': 80,
      'functions': 80,
      'lines': 80,
      'statements': 80
    }
  },
  'testResultsProcessor': 'jest-bamboo-reporter',
  'coverageReporters': ['clover', 'text-summary', 'lcov'],
  testPathIgnorePatterns: [],
  testURL: 'http://localhost:1364'
}
