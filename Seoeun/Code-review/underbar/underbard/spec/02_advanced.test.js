describe('once', function () {
  checkNativeMethods(function () {
    const num = 0;
    const increment = _.once(function () {
      num += 1;
    });
  });

  it('함수를 리턴해야 합니다', function () {
    const noop = _.once(function () {});
    expect(noop).to.be.an.instanceOf(Function);
  });

  it('callback 함수는 한번만 호출되어야 합니다', function () {
    let num = 0;
    const increment = _.once(function () {
      num++;
    });
    increment();
    increment();
    increment();
    expect(num).to.equal(1);
  });

  it('_.once가 리턴하는 함수는 callback 함수에 인자를 정확히 전달해야 합니다.', function () {
    const add = _.once(function (x, y, z) {
      return x + y + z;
    });
    expect(add(1, 2, 3)).to.equal(6);
  });

  it('_.once가 리턴하는 함수가 여러 번 호출되어도 항상 첫 번째 호출의 결과값을 리턴해야 합니다', function () {
    const add = _.once(function (x, y, z) {
      return x + y + z;
    });

    expect(add(1, 2, 3)).to.equal(6);
    expect(add(4, 5, 6)).to.equal(6);
    expect(add(7, 8, 9)).to.equal(6);
  });
});

describe('delay', function () {
  let callback, clock;
  beforeEach(function () {
    callback = sinon.spy();
    clock = sinon.useFakeTimers();
  });

  it('입력으로 전달되는 시간이 지난 후에 callback 함수를 실행해야 합니다', function () {
    _.delay(callback, 100);
    clock.tick(99);

    expect(callback.called).to.be.false;
    clock.tick(10);

    expect(callback.called).to.be.true;
  });

  it('추가로 전달되는 인자가 있는 경우, callback 함수의 호출 시 인자로 전달해야 합니다', function () {
    _.delay(callback, 100, 1, 2);
    clock.tick(100);
    expect(callback.calledWith(1, 2)).to.be.true;
  });
});



describe('includes', function () {
  checkNativeMethods(function () {
    _.includes([4, 5, 6], 5);
    _.includes([4, 5, 6], 1);
  });

  checkIterationAlgorithm(
    function () {
      _.includes([4, 5, 6], 2);
    },
    ['each', 'reduce']
  );

  it('입력받은 배열을 변경하지 말아야 합니다', function () {
    const arr = [1, 2, 3, 4, 5];
    const result = _.includes(arr, 4);
    expect(arr).to.eql([1, 2, 3, 4, 5]);
  });

  it('배열의 요소가 찾는 값과 일치할 경우, true를 리턴해야 합니다', function () {
    const arr = [1, 2, 3];
    const value = 1;
    expect(_.includes(arr, value)).to.be.true;
  });

  it('배열의 요소가 찾는 값과 일치하지 않을 경우, false를 리턴해야 합니다', function () {
    const arr = [1, 2, 3];
    const value = 4;
    expect(_.includes(arr, value)).to.be.false;
  });
});

describe('every', function () {
  const isEven = function (num) {
    return num % 2 === 0;
  };

  checkNativeMethods(function () {
    _.every([4, 5, 6], _.identity);
    _.every([4, 5, 6], isEven);
    _.every([2, 4, 6], isEven);
  });

  it('boolean 타입을 리턴해야 합니다', function () {
    expect(_.every([1], _.identity)).to.be.true;
    expect(_.every([0], _.identity)).to.be.false;
  });

  it('빈 배열을 입력받은 경우, true를 리턴해야 합니다', function () {
    expect(_.every([])).to.be.true;
  });

  it('배열의 모든 요소가 test를 통과할 경우, true를 리턴해야 합니다', function () {
    expect(_.every([true, {}, 1], _.identity)).to.be.true;
    expect(_.every([2, 4, 6, 8, 10], isEven)).to.be.true;
  });

  it('배열의 요소 중 하나라도 test를 통과하지 못할 경우, false를 리턴해야 합니다', function () {
    expect(_.every([2, 3, 5, 7], isEven)).to.be.false;
    expect(_.every([true, 1, 2, undefined], _.identity)).to.be.false;
  });

  it('callback 함수가 주어지지 않을 경우, 요소 자체의 값을 기준으로 판단합니다', function () {
    expect(_.every([true, true, true])).to.be.true;
    expect(_.every([true, true, false])).to.be.false;
    expect(_.every([false, false, false])).to.be.false;
  });
});

describe('some', function () {
  const isEven = function (number) {
    return number % 2 === 0;
  };

  checkNativeMethods(function () {
    _.some([4, 5, 6], _.identity);
    _.some([4, 5, 6], isEven);
    _.some([1, 3, 5], isEven);
  });

  it('boolean 타입을 리턴해야 합니다', function () {
    expect(_.some([1], _.identity)).to.be.true;
    expect(_.some([0], _.identity)).to.be.false;
  });

  it('빈 배열을 입력받은 경우, false를 리턴해야 합니다', function () {
    expect(_.some([])).to.be.false;
  });

  it('배열의 요소 중 하나라도 test를 통과할 경우, true를 리턴해야 합니다', function () {
    expect(_.some([true, {}, 1], _.identity)).to.be.true;
    expect(_.some([1, 3, 5, 7, 8, 8], isEven)).to.be.true;
  });

  it('배열의 모든 요소가 test를 통과하지 못할 경우, false를 리턴해야 합니다', function () {
    expect(_.some([3, 5, 7], isEven)).to.be.false;
    expect(_.some([0, null, false, undefined], _.identity)).to.be.false;
  });

  it('callback 함수가 주어지지 않을 경우, 요소 자체의 값을 기준으로 판단합니다', function () {
    expect(_.some([true, true, true])).to.be.true;
    expect(_.some([true, true, false])).to.be.true;
    expect(_.some([false, false, false])).to.be.false;
  });
});

describe('extend', function () {
  checkNativeMethods(function () {
    _.extend({ a: 1 }, { b: 1 }, { c: 1 });
    _.extend({ a: 1 }, { b: 1 }, { a: 2 });
  });

  checkIterationAlgorithm(function () {
    _.extend({ a: 1 }, { b: 1 }, { c: 1 });
  });

  it('전달받은 첫 번째 객체를 리턴해야 합니다', function () {
    const destination = {};
    const source = {};
    const extended = _.extend(destination, source);
    expect(extended).to.equal(destination);
  });

  it('첫 번째 객체에 차례대로 다음 객체들의 속성을 추가해야 합니다', function () {
    const destination = {};
    const source = { a: 'b' };
    const extended = _.extend(destination, source);
    expect(extended.a).to.equal('b');
  });

  it('동일한 속성을 가진 객체들을 입력받은 경우, 가장 뒤에 위치한 객체의 속성값을 저장합니다', function () {
    const destination = { a: 'x' };
    const source = { a: 'b' };
    const extended = _.extend(destination, source);
    expect(extended.a).to.equal('b');
  });

  it('입력으로 전달되는 객체의 개수는 정해져 있지 않습니다', function () {
    const extended = _.extend(
      { c: 'x' },
      { a: 'a', x: 2 },
      { a: 1 },
      { b: 2, x: 3 }
    );
    expect(extended).to.eql({ c: 'x', x: 3, a: 1, b: 2 });
  });
});

describe('defaults', function () {
  checkNativeMethods(function () {
    _.defaults({ a: 1 }, { b: 1 }, { c: 1 });
    _.defaults({ a: 1 }, { b: 1 }, { a: 2 });
  });

  it('전달받은 첫 번째 객체를 리턴해야 합니다', function () {
    const destination = {};
    const source = {};
    const defaulted = _.defaults(destination, source);
    expect(defaulted).to.equal(destination);
  });

  it('첫 번째 객체에 차례대로 다음 객체들의 속성을 추가해야 합니다', function () {
    const destination = {};
    const source = { a: 1, b: 'two' };
    const extended = _.defaults(destination, source);
    expect(extended.a).to.equal(1);
    expect(extended.b).to.equal('two');
  });

  it('첫 번째 객체가 이미 가지고 있는 속성은 수정하지 말아야 합니다', function () {
    let destination = { a: 'x' };
    let source = { a: 'b' };
    let extended = _.defaults(destination, source);
    expect(extended.a).to.equal('x');

    destination = { a: 1, b: 2 };
    source = { a: 100, b: 200, c: 300 };
    extended = _.defaults(destination, source);
    expect(destination.a).to.equal(1);
    expect(destination.b).to.equal(2);
    expect(destination.c).to.equal(300);
  });

  it('동일한 속성을 가진 객체들을 입력받은 경우, 가장 앞에 위치한 객체의 속성값을 저장합니다', function () {
    const base = { c: 'x' };
    const extended = _.defaults(
      base,
      { a: 'a', x: 2 },
      { a: 1 },
      { b: 2, x: 3 }
    );
    expect(extended).to.equal(base);
    expect(extended).to.eql({ c: 'x', x: 2, a: 'a', b: 2 });
  });

  it('이미 존재하는 속성의 값이 (undefined를 제외한) falsy이더라도 수정하지 말아야 합니다', function () {
    const destination = { a: '', b: null, c: NaN };
    const source = { a: 1, b: 2, c: 3 };

    _.defaults(destination, source);

    expect(destination.a).to.equal('');
    expect(destination.b).to.equal(null);
    expect(isNaN(destination.c)).to.equal(true);
  });

  it('입력으로 전달되는 객체의 개수는 정해져 있지 않습니다', function () {
    const base = {};
    const sources = [
      { a: 1 },
      { b: 2, c: 'three', a: 11 },
      { d: 'four', b: 22, c: 'four' },
      { a: 111, b: 222, e: 'ee' },
    ];
    _.defaults(base, ...sources);
    expect(base.a).to.equal(1);
    expect(base.b).to.equal(2);
    expect(base.c).to.equal('three');
    expect(base.d).to.equal('four');
    expect(base.e).to.equal('ee');
  });
});

describe('zip', function () {
  checkNativeMethods(function () {
    _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false]);
    _.zip(['moe', 'larry'], [30, 50], [true, false]);
    _.zip(['moe', 'larry'], [], [true, false]);
  });

  checkIterationAlgorithm(
    function () {
      _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false]);
    },
    ['each', 'reduce', 'pluck']
  );

  it('배열을 리턴해야 합니다', function () {
    const result = _.zip(['moe'], [30]);
    expect(Array.isArray(result)).to.eql(true);
  });

  it('입력받은 배열들의 요소들 중 서로 같은 index의 요소끼리 결합해야 합니다', function () {
    const oneDigits = [1, 2, 3];
    const twoDigits = [11, 22, 33];
    const threeDigits = [111, 222, 333];
    expect(_.zip(oneDigits, twoDigits, threeDigits)).to.eql([
      [1, 11, 111],
      [2, 22, 222],
      [3, 33, 333],
    ]);
  });

  it('입력으로 전달되는 배열의 길이는 서로 다를 경우, 가장 긴 배열의 길이가 기준이 됩니다', function () {
    expect(_.zip(['a', 'b', 'c', 'd'], [1])).to.eql([
      ['a', 1],
      ['b', undefined],
      ['c', undefined],
      ['d', undefined],
    ]);
    expect(_.zip([1, 2], ['a', 'b', 'c'], ['A'])).to.eql([
      [1, 'a', 'A'],
      [2, 'b', undefined],
      [undefined, 'c', undefined],
    ]);
  });

  it('입력으로 전달되는 배열의 개수는 정해져 있지 않습니다', function () {
    expect(_.zip([1, 2, 3])).to.eql([[1], [2], [3]]);
    expect(_.zip([1, 2, 3], ['a', 'b', 'c'])).to.eql([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
    expect(_.zip([1], ['a', 'b', 'c'], ['A'])).to.eql([
      [1, 'a', 'A'],
      [undefined, 'b', undefined],
      [undefined, 'c', undefined],
    ]);
  });
});

describe('zipStrict', function () {
  checkNativeMethods(function () {
    _.zipStrict(['moe', 'larry'], [30, 40], [true, false]);
    _.zipStrict(['moe', 'larry', 'curly'], [30, 40, 50], [true, false]);
    _.zipStrict(['moe', 'larry', 'curly'], [], [true, false]);
  });

  checkIterationAlgorithm(
    function () {
      _.zipStrict(['moe', 'larry', 'curly'], [30, 40, 50], [true, false]);
    },
    ['each', 'reduce', 'pluck']
  );

  it('배열을 리턴해야 합니다', function () {
    const result = _.zipStrict(['moe'], [30]);
    expect(Array.isArray(result)).to.eql(true);
  });

  it('입력받은 배열들의 요소들 중 서로 같은 index의 요소끼리 결합해야 합니다', function () {
    const oneDigits = [1, 2, 3];
    const twoDigits = [11, 22, 33];
    const threeDigits = [111, 222, 333];
    expect(_.zipStrict(oneDigits, twoDigits, threeDigits)).to.eql([
      [1, 11, 111],
      [2, 22, 222],
      [3, 33, 333],
    ]);
  });

  it('입력으로 전달되는 배열의 길이는 서로 다를 경우, 가장 짧은 배열의 길이가 기준이 됩니다', function () {
    expect(_.zipStrict(['a', 'b', 'c', 'd'], [1])).to.eql([['a', 1]]);
    expect(_.zipStrict([1, 2], ['a', 'b', 'c'], ['A', 'B'])).to.eql([
      [1, 'a', 'A'],
      [2, 'b', 'B'],
    ]);
  });

  it('입력으로 전달되는 배열의 개수는 정해져 있지 않습니다', function () {
    expect(_.zipStrict([1, 2, 3])).to.eql([[1], [2], [3]]);
    expect(_.zipStrict([1, 2, 3], ['a', 'b', 'c'])).to.eql([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
    expect(_.zipStrict([1], ['a', 'b', 'c'], ['A'])).to.eql([[1, 'a', 'A']]);
  });
});

describe('intersection', function () {
  checkNativeMethods(function () {
    _.intersection(['moe', 'curly', 'larry'], ['moe', 'groucho']);
    _.intersection(['moe', 'curly', 'larry'], ['moe', 'groucho'], ['moe']);
    _.intersection(['moe', 'curly', 'larry'], ['moe', 'groucho'], ['larry']);
    _.intersection(['moe', 'curly', 'larry'], [], ['larry']);
    _.intersection([], ['moe', 'groucho'], ['larry']);
  });

  checkIterationAlgorithm(
    function () {
      _.intersection(['moe', 'curly', 'larry'], ['moe', 'groucho']);
    },
    ['each', 'reduce']
  );

  it('입력으로 전달받은 배열들의 교집합을 리턴해야 합니다', function () {
    const stooges = ['moe', 'curly', 'larry'];
    const leaders = ['moe', 'groucho'];
    expect(_.intersection(stooges, leaders)).to.eql(['moe']);

    const bts = ['jimin', 'jin', 'rm', 'v', 'suga', 'j-hope', 'jungkook'];
    const bias = ['jin', 'v', 'rm'];
    const fakeBias = ['sugar', 'V', 'v', 'jin'];
    const fakeLove = ['hankook', 'jin', 'salt', 'v'];
    expect(_.intersection(bts, bias, fakeBias, fakeLove)).to.eql([
      'jin',
      'v',
    ]);
  });

  it('교집합이 없는 경우, 빈 배열을 리턴해야 합니다', function () {
    expect(_.intersection(['1'], [1], [1], ['1'])).to.eql([]);
    expect(_.intersection(['1'], [], [1], ['1'])).to.eql([]);
    expect(_.intersection([], [], [])).to.eql([]);
  });

  it('입력으로 전달되는 배열의 개수는 정해져 있지 않습니다', function () {
    expect(_.intersection([1, 2, 3], [1, 2, '3'], [2, 1])).to.eql([1, 2]);
    expect(_.intersection([7], ['7', 7], [7, 6], [7, '7', 8])).to.eql([7]);
  });
});

describe('difference', function () {
  checkNativeMethods(function () {
    _.difference([1, 2, 3], [2, 30, 40]);
    _.difference([1, 2, 3], [2, 30, 40], [40, 50, 100, 3]);
    _.difference([1, 2, 3], []);
    _.difference([], [2, 30, 40]);
  });

  checkIterationAlgorithm(
    function () {
      _.difference([1, 2, 3], [2, 30, 40]);
    },
    ['each', 'reduce']
  );

  it('입력으로 전달받은 배열들의 차집합을 리턴해야 합니다', function () {
    const stooges = ['moe', 'curly', 'larry'];
    const leaders = ['moe', 'groucho'];
    expect(_.difference(stooges, leaders)).to.eql(['curly', 'larry']);

    const bts = ['jimin', 'jin', 'rm', 'v', 'suga', 'j-hope', 'jungkook'];
    const bias = ['jin', 'v', 'salt', 'rm', 'apple'];
    expect(_.difference(bts, bias)).to.eql([
      'jimin',
      'suga',
      'j-hope',
      'jungkook',
    ]);
  });

  it('차집합이 없는 경우, 빈 배열을 리턴해야 합니다', function () {
    expect(_.difference([], [1, 2, 3])).to.eql([]);
    expect(_.difference([1, 2, 3], [1, 2, 3])).to.eql([]);
    expect(_.difference([1, 2], [4, 3, 2, 1])).to.eql([]);
  });

  it('입력으로 전달되는 배열의 개수는 정해져 있지 않습니다', function () {
    expect(_.difference([1, 2, 3], [1, 2, '3'], [2, 1])).to.eql([3]);
    expect(_.difference([7, 8, 9, 10], ['7'], ['7', 8])).to.eql([7, 9, 10]);
  });

  it('세 배열간의 겹치지 않는 요소를 반환해야 합니다', function () {
    const result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);

    expect(result).to.eql([3, 4]);
  });
});

describe('sortBy', function () {
  checkNativeMethods(function () {
    _.sortBy(
      [
        { name: 'curly', age: 50 },
        { name: 'moe', age: 30 },
      ],
      function (person) {
        return person.age;
      }
    );
  });

  it('transform이 전달되지 않은 경우, 배열의 요소끼리 비교하여 정렬해야 합니다', function () {
    const list = [7, 4, 1, 6, 3, 2];
    const sorted = _.sortBy(list);
    expect(sorted).to.eql([1, 2, 3, 4, 6, 7]);
  });

  it('transform를 사용하여 비교해야 합니다', function () {
    const list = ['one', 'two', 'three', 'four', 'five'];
    function byLength(str) {
      return str.length;
    }
    const byLen = _.sortBy(list, byLength);
    expect(byLen).to.eql(['one', 'two', 'four', 'five', 'three']);
    const byLexical = _.sortBy(list, _.identity);
    expect(byLexical.join()).to.eql(
      ['five', 'four', 'one', 'three', 'two'].join()
    );
  });

  it('order 값에 따라 오름차순, 내림차순을 구분하여 정렬해야 합니다', function () {
    const list = [7, 4, 11, 1, 6, 3, 2];
    const asc = _.sortBy(list, _.identity, 1);
    const des = _.sortBy(list, _.identity, -1);
    expect(asc).to.eql([1, 2, 3, 4, 6, 7, 11]);
    expect(des).to.eql([11, 7, 6, 4, 3, 2, 1]);
  });

  it('transform과 order에 따라 정렬해야 합니다', function () {
    const bias = [
      { name: 'jin', height: 179, age: 27 },
      { name: 'jimin', height: 178, age: 24 },
      { name: 'suga', age: 26 },
    ];

    const byAgeDes = _.sortBy(
      bias,
      function (person) {
        return person.age;
      },
      -1
    );
    expect(_.pluck(byAgeDes, 'name')).to.eql(['jin', 'suga', 'jimin']);

    const byHeightAsc = _.sortBy(bias, function (person) {
      return person.height || 180; // 키(height) 속성이 없는 경우 180을 디폴트로 간주
    });
    expect(_.pluck(byHeightAsc, 'name')).to.eql(['jimin', 'jin', 'suga']);
  });
});
