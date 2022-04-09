module.exports = {
    testRegex: 'src/tests/.*.spec.js$',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
        '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,vue}'],
    collectCoverage: false,
    coverageReporters: ['html', 'lcov', 'text-summary'],
    coverageDirectory: './coverage',
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/src/tests/setup.js'],
    testURL: 'http://localhost:8080/',
    setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
    testTimeout: 30000,
    verbose: true,
};
