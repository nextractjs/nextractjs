module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtension: ['ts', 'js', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  setupFiles: ['dotenv/config'],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  coverageProvider: "v8",
  verbose: true
}
