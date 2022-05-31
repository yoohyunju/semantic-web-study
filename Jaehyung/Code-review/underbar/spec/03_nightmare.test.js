describe('memoize', function () {
  checkNativeMethods(function () {
    _.memoize(function add(a, b) {
      return a + b;
    });
  });

  function inspectFunc(func) {
    return sinon.spy(func);
  }

  it('memoization의 적용 여부는 함수의 실행 결과에는 영향을 미치지 않아야 합니다', function () {
    function add(a, b) {
      return a + b;
    }
    const memoAdd = _.memoize(add);
    expect(add(1, 2) === memoAdd(1, 2)).to.equal(true);
    expect(add(10, 3) === memoAdd(10, 3)).to.equal(true);
  });

  it('memoization이 적용된 함수는 이전과 동일한 입력이 전달될 경우, 호출되지 않아야 합니다', function () {
    const add = inspectFunc(function (a, b) {
      return a + b;
    });

    add(2, 3);
    add(2, 3);
    expect(add.callCount).to.equal(2);
    add.resetHistory();

    const memoized = _.memoize(add);
    memoized(3, 3);
    expect(add.calledWith(3, 3)).to.equal(true);
    add.resetHistory();
    memoized(3, 3);
    expect(add.calledWith(3, 3)).to.equal(false);
    expect(add.callCount).to.equal(0);
  });

  it('메모이제이션은 중복되는 연산을 제거해 실행 속도를 줄일 수 있습니다', function () {
    // this.timeout(2000);
    function fibo(num) {
      if (num <= 1) return 1;
      return fibo(num - 1) + fibo(num - 2);
    }

    fibo = _.memoize(fibo);
    expect(fibo(42)).to.equal(433494437);
    // done();
  }).timeout(2000);
});

describe('throttle', function () {
  let callback, clock;
  beforeEach(function () {
    callback = sinon.spy();
    clock = sinon.useFakeTimers();
  });

  checkNativeMethods(function () {
    _.throttle(callback, 100);
  });

  it('함수를 리턴해야 합니다', function () {
    const noop = _.throttle(function () {}, 100);
    expect(noop).to.be.an.instanceOf(Function);
  });

  it('이전 함수의 실행 이후 입력으로 전달되는 구간이 지나면 함수를 실행할 수 있어야 합니다', function () {
    const fn = _.throttle(callback, 100);
    fn(); // called
    setTimeout(fn, 50);
    setTimeout(fn, 100); // called
    setTimeout(fn, 150);
    setTimeout(fn, 199);
    clock.tick(200);

    expect(callback.callCount).to.equal(2);
  });

  it('입력으로 전달되는 구간은 함수 실행의 최소 간격을 의미합니다', function () {
    const fn = _.throttle(callback, 100);
    fn(); // called
    setTimeout(fn, 50);
    setTimeout(fn, 110); // called
    setTimeout(fn, 150);
    setTimeout(fn, 220); // called
    setTimeout(fn, 310); // 직전에 실행된 함수는 220ms 시점에 실행되었기 때문에, 이 후 90ms가 지난 시점에서는 실행 불가
    setTimeout(fn, 319);
    clock.tick(320);

    expect(callback.callCount).to.equal(3);
  });
});
