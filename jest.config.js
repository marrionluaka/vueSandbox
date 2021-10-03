module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: ['/src/plugins/*', '/node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'vue', 'pug'],
  globals: {
    'ts-jest': {
      compiler: 'typescript'
    },
    'vue-jest': {
      pug: {
        filename: 'pug',
        doctype: 'html',
        basedir: './'
      }
    }
  }
}
