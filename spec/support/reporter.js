const JasmineConsoleReporter = require('jasmine-console-reporter');
const JasmineReporters = require('jasmine-reporters');
const path = require('path');

const jasmineEnv = jasmine.getEnv();

// 1. Configure Jasmine Console Reporter
const consoleReporter = new JasmineConsoleReporter({
    colors: 1,           // Use colors in the output (0 for no colors, 1 for colors)
    cleanStack: 1,       // Clean stack traces (0 for no, 1 for yes)
    verbosity: 4,        // Verbosity level (0-4, 4 is most verbose)
    listStyle: 'flat',   // List style ('flat' or 'indent')
    activity: false      // Show activity indicator
});

// Add the console reporter to Jasmine
jasmineEnv.addReporter(consoleReporter);

// 2. Configure Jasmine JUnit XML Reporter
const junitReporter = new JasmineReporters.JUnitXmlReporter({
    savePath: path.join(__dirname, '../../test-results'),
    filePrefix: 'junit-report',
    consolidateAll: true
});

jasmineEnv.addReporter(junitReporter);