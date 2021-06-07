module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/__tests__', '<rootDir>'],
  preset: 'ts-jest',

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './setupTests.ts'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  // testRegex: "(/src/.*|(\\.|/)(test|spec))\\.tsx?$",
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/src/**/*.test.ts?(x)'],

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  // moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
    '\\.(png|jpg|webm)$': '<rootDir>/__mocks__/fileMock.ts',
    'discord-ui-toolkit': '<rootDir>/src/index.tsx',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@inputs(.*)$': '<rootDir>/src/components/inputs$1',
    '^@internal(.*)$': '<rootDir>/src/components/internal$1',
    '^@layout(.*)$': '<rootDir>/src/components/layout$1',
    '^@lists(.*)$': '<rootDir>/src/components/lists$1',
    '^@assets(.*)$': '<rootDir>/src/components/assets$1',
  },
};
