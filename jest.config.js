const { pathsToModuleNameMapper } = require('ts-jest/utils');
const tsconfig = require('./tsconfig.json')

process.env.JEST_ENV = "test";


const tsPaths = pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' })

module.exports = {
  "transform": {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "ts-jest",
  },
  "moduleFileExtensions": [
    "cjs",
    "js",
    "ts",
  ],
  "setupFilesAfterEnv": [
  ],
  "modulePathIgnorePatterns": [
    ".history",
    "battlecry"
  ],
  moduleNameMapper: {
    ...tsPaths,
    /**
     * Just adding "svelte-awesome/icons": "identity-object-proxy" didn't make it.
     * It's something between automocking and module resolving. Weird, but this way it works.
     */
  },
  // transformIgnorePatterns: [`/node_modules/(?!(${ ignoreModules }))`]
}
