module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '\\.svg$': '<rootDir>/helpers/fileTransformer.js',
  },
  moduleNameMapper: {
    '^#/(.*)': '<rootDir>/src/$1',
    '^.+\\.scss': '<rootDir>/helpers/fileMock.js',
    '^relay(.*)$': '<rootDir>/src/relay$1',
    '^contexts(.*)$': '<rootDir>/src/contexts$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^common(.*)$': '<rootDir>/src/common$1',
    '^mutations(.*)$': '<rootDir>/src/mutations$1',
    '^images(.*)$': '<rootDir>/assets/images$1',
    '^types$': '<rootDir>/src/types/index',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^services(.*)$': '<rootDir>/src/services$1',
  },
  setupFilesAfterEnv: ['./helpers/setupTests.js'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
