module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  setupFiles: ['<rootDir>/test/setup-jest.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: true,
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  coverageThreshold: {
    global: { statements: 90 }
  },
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: [
    '<rootDir>/assets/js/utils/**/*.{ts,js}',
    '<rootDir>/mixins/**/*.{ts,js}',
    '<rootDir>/middleware/**/*.{ts,js}',
    '<rootDir>/store/**/*.{ts,js}',
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/layouts/**/*.vue'
  ]
}
