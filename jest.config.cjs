module.exports = {
    "collectCoverageFrom":["backend/util/validators.js", "!./backend/node_modules"],
    "coverageReporters": ["html", "text", "text-summary", "cobertura"],
    "testMatch": ["backend/src/test/validators.test.js"]
  }