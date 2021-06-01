module.exports = function (wallaby) {
  return {
    files: ["src/**/*.ts"],

    tests: ["test/**/*.test.ts"],
    env: {
      type: "node",
    },

    testFramework: "mocha",
    compilers: {
      "**/*.ts": wallaby.compilers.typeScript({}),
    },
  };
};
