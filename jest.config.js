module.exports = {
  transform: { '^.+\\.ts?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src', 'tests'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: '50%',
  testTimeout: 15000,
};
