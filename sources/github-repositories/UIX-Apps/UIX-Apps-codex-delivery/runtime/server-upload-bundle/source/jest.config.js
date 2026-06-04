export default {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/apps/', '/exports/', '/runtime/'],
  modulePathIgnorePatterns: ['<rootDir>/apps/', '<rootDir>/exports/', '<rootDir>/runtime/'],
  collectCoverageFrom: [
    'config/**/*.js',
    'public/**/*.js',
    '!apps/**',
    '!exports/**',
    '!runtime/**',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  transform: {},
  verbose: true
};
