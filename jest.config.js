module.exports = {
    automock: false,

    clearMocks: true,

    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    coveragePathIgnorePatterns: ['/node_modules/'],

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    coverageReporters: ['json'],

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

    notify: true,

    // The root directory that Jest should scan for tests and modules within
    rootDir: 'src',

    // Allows you to use a custom runner instead of Jest's default test runner

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

    testPathIgnorePatterns: ['/node_modules/'],
}
