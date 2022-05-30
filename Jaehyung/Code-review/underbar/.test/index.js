global.expect = require('../lib/chai').expect;
global.sinon = require('sinon');

describe('Bare Minimum Requirements', function () {
  require('../lib/testSupport.js');
  require('../src/01_bareMinimum.js');
  require('../spec/01_bareMinimum.test.js');
});

// Advanced Challenge에 도전하려면 xdescribe를 describe로 변경하세요.
describe('Advanced Challenge', function () {
  require('../lib/testSupport.js');
  require('../src/02_advanced.js');
  require('../spec/02_advanced.test.js');
});

// Nightmare에 도전하려면 xdescribe를 describe로 변경하세요.
xdescribe('Nigthmare', function () {
  require('../lib/testSupport.js');
  require('../src/03_nightmare.js');
  require('../spec/03_nightmare.test.js');
});
