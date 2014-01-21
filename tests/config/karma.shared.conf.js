var shared = {};
shared.plugins = [
  'karma-mocha',
  // 'karma-ng-scenario',
  'karma-chrome-launcher',
  'karma-coverage'
];

shared.frameworks = ['mocha'];
shared.basePath  = '../../';
shared.singleRun = false;
shared.autoWatch = true;
shared.colors    = true;

shared.reporters = ['progress', 'coverage'];
shared.browsers = ['Chrome'];
shared.proxies = {
  '/': 'http://localhost:3001/'
};

shared.files = [
  './tests/config/mocha.conf.js',

  //3rd Party Code
  'public/bower_components/angular/angular.js',
  'public/bower_components/angular-ui-router/release/angular-ui-router.js',

  //App-specific Code
  // 'app/static/js/ng/main.js',

  //Test-Specific Code
  './node_modules/chai/chai.js',
  './tests/lib/chai-should.js',
  './tests/lib/chai-expect.js',
  './node_modules/supertest/index.js'
];

shared.preprocessors = {
  // 'app/static/js/ng/**/*.js': 'coverage'
  // 'app/controllers/**/*.js': 'coverage'
};

shared.coverageReporter = {
  // cf. http://gotwarlost.github.io/istanbul/public/apidocs/
  type : 'html',
  dir : 'coverage/'
};

exports.shared = shared;
