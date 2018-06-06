jasmine.VERBOSE = true;

const reporters = require('jasmine-reporters'); // eslint-disable-line

const junitReporter = new reporters.JUnitXmlReporter({
  savePath: 'output/',
  consolidateAll: false,
});

jasmine.getEnv().addReporter(junitReporter);
