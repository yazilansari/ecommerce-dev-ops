module.exports = {
  //preset: 'ts-jest', // For TypeScript, omit if using JavaScript
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
};
