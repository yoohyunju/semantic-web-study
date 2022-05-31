'use strict';
let that;
if (typeof window !== 'undefined') {
  // mocha.setup({ ui: 'bdd' });
  mocha.setup('bdd');
  window.expect = chai.expect;

  window.onload = function () {
    window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();
  };
  window._ = {};
  that = window;
} else {
  global.checkNativeMethods = checkNativeMethods;
  global.checkIterationAlgorithm = checkIterationAlgorithm;
  global._ = {};
  that = global;
}

const getMethods = (obj) =>
  Object.getOwnPropertyNames(obj).filter((item) => {
    try {
      return typeof obj[item] === 'function';
    } catch (error) {
      return false;
    }
  });

const allowed = ['pop', 'push', 'shift', 'sort'];
const arrMethodsBanned = getMethods(Array.prototype).filter(
  (method) => !allowed.includes(method)
);

before(function () {
  arrMethodsBanned.forEach((method) => sinon.spy(Array.prototype, method));

  sinon.spy(that, 'Set');
  sinon.spy(Set.prototype, 'constructor');

  sinon.spy(that, 'Map');
  sinon.spy(Map.prototype, 'constructor');

  // force to use reusable underbar functions for iteration algorithm
  sinon.spy(_, 'each');
  sinon.spy(_, 'map');
  sinon.spy(_, 'reduce');
  sinon.spy(_, 'pluck');
});

function checkNativeMethods(runUnderbarFunc) {
  // TODO: new Map(), new Set, Array.from()
  it('Array, Set, Map 내장 메소드를 사용하지 않고, 언더바의 메스드를 구현할 수 있어야 합니다', function () {
    for (let i = 0; i < arrMethodsBanned.length; i++) {
      const method = arrMethodsBanned[i];
      Array.prototype[method].resetHistory();
    }

    Set.resetHistory();
    Set.prototype.constructor.resetHistory();
    Map.resetHistory();
    Map.prototype.constructor.resetHistory();

    runUnderbarFunc();

    for (let i = 0; i < arrMethodsBanned.length; i++) {
      const method = arrMethodsBanned[i];
      expect(Array.prototype[method].called).to.equal(false);
    }
    expect(Set.called).to.equal(false);
    expect(Set.prototype.constructor.called).to.equal(false);
    expect(Map.called).to.equal(false);
    expect(Map.prototype.constructor.called).to.equal(false);
  });
}

function checkIterationAlgorithm(runUnderbarFunc, methods = ['each']) {
  const intructionTarget =
    methods.length === 1
      ? `_.${methods[0]} 함수`
      : `${methods.map((m) => `_.${m}`).join(', ')} 중 하나`;
  const intructionAction = '를 사용해야 합니다';

  it(`${intructionTarget}${intructionAction}`, function () {
    methods.forEach((m) => _[m].resetHistory());
    runUnderbarFunc();
    const called = methods.some((m) => _[m].called);
    expect(called).to.equal(true);
  });
}
