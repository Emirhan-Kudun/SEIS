export default {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.sync-backups/',
    '/apps/',
    '/Codex/',
    '/exports/',
    '/runtime/',
    '/UIX-Apps-codex-delivery/'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/.sync-backups/',
    '<rootDir>/apps/',
    '<rootDir>/Codex/',
    '<rootDir>/exports/',
    '<rootDir>/runtime/',
    '<rootDir>/UIX-Apps-codex-delivery/'
  ],
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
