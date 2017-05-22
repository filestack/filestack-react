jasmine.VERBOSE = true;

var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
  savePath: 'output/',
  consolidateAll: false
});
jasmine.getEnv().addReporter(junitReporter);
