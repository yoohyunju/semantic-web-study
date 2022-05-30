describe('identity', function () {
  checkNativeMethods(function () {
    _.identity(1);
  });

  it('전달받은 입력값을 그대로 리턴해야 합니다', function () {
    const uniqueObject = {};
    expect(_.identity(1)).to.equal(1);
    expect(_.identity('string')).to.equal('string');
    expect(_.identity(false)).to.be.false;
    expect(_.identity(uniqueObject)).to.equal(uniqueObject);
  });
});

describe('take', function () {
  checkNativeMethods(function () {
    _.take([1, 2, 3]);
    _.take([1, 2, 3], 2);
    _.take([1, 2, 3], 10);
  });

  it('두 번째 입력이 생략된 경우, 빈 배열을 리턴해야 합니다', function () {
    expect(_.take([1, 2, 3])).to.eql([]);
  });

  it('차례대로 처음 n개의 요소를 갖는 배열을 리턴해야 합니다', function () {
    expect(_.take([1, 2, 3], 2)).to.eql([1, 2]);
  });

  it('두 번째 입력이 0인 경우, 빈 배열을 리턴해야 합니다', function () {
    expect(_.take([1, 2, 3], 0)).to.eql([]);
  });

  it('두 번째 입력이 배열의 길이를 벗어날 경우, 배열 전체를 리턴해야 합니다', function () {
    expect(_.take([1, 2, 3], 5)).to.eql([1, 2, 3]);
  });
});

describe('drop', function () {
  checkNativeMethods(function () {
    _.drop([1, 2, 3]);
    _.drop([1, 2, 3], 1);
    _.drop([1, 2, 3], 9);
  });

  it('두 번째 입력이 생략된 경우, 전체 배열을 리턴해야 합니다', function () {
    expect(_.drop([1, 2, 3])).to.eql([1, 2, 3]);
  });

  it('차례대로 처음 n개의 요소가 제외된 배열을 리턴해야 합니다', function () {
    expect(_.drop([1, 2, 3], 2)).to.eql([3]);
  });

  it('두 번째 입력이 0인 경우, 전체 배열을 리턴해야 합니다', function () {
    expect(_.drop([1, 2, 3], 0)).to.eql([1, 2, 3]);
  });

  it('두 번째 입력이 배열의 길이를 벗어날 경우, 빈 배열을 리턴해야 합니다', function () {
    expect(_.drop([1, 2, 3], 5)).to.eql([]);
  });
});

describe('last', function () {
  checkNativeMethods(function () {
    _.last([1, 2, 3]);
    _.last([1, 2, 3], 0);
    _.last([1, 2, 3], 2);
    _.last([1, 2, 3], 3);
    _.last([1, 2, 3], 5);
  });

  it('두 번째 입력이 생략된 경우, 마지막 요소만을 담은 배열을 리턴해야 합니다', function () {
    expect(_.last([1, 2, 3])).to.eql([3]);
  });

  it('차례대로 마지막 n개의 요소를 갖는 배열을 리턴해야 합니다', function () {
    expect(_.last([1, 2, 3], 2)).to.eql([2, 3]);
  });

  it('두 번째 입력이 0인 경우, 빈 배열을 리턴해야 합니다', function () {
    expect(_.last([1, 2, 3], 0)).to.eql([]);
  });

  it('두 번째 입력이 배열의 길이를 벗어날 경우, 배열 전체 리턴해야 합니다', function () {
    expect(_.last([1, 2, 3], 5)).to.eql([1, 2, 3]);
  });
});

describe('each', function () {
  checkNativeMethods(function () {
    _.each([1, 2, 3, 4], function (number) {});
  });

  it('명시적인 리턴문을 작성하지 않아야 합니다', function () {
    const returnValue = _.each([], function () {});
    expect(returnValue).to.not.exist;
  });

  it('배열을 입력받은 경우, 배열을 순회하면서 배열의 요소에 접근할 수 있어야 합니다', function () {
    const letters = ['a', 'b', 'c'];
    const result = [];

    _.each(letters, function (letter) {
      result.push(letter);
    });

    expect(result).to.eql(['a', 'b', 'c']);
  });

  it('배열을 입력받은 경우, 배열을 순회하면서 배열의 요소와 인덱스에 접근할 수 있어야 합니다', function () {
    const letters = ['a', 'b', 'c'];
    const iterations = [];

    _.each(letters, function (letter, index) {
      iterations.push([letter, index]);
    });

    expect(iterations).to.eql([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });

  it('배열을 입력받은 경우, 배열을 순회하면서 배열의 요소, 인덱스, 배열 그 자체에 접근할 수 있어야 합니다', function () {
    const letters = ['a', 'b', 'c'];
    const iterations = [];

    _.each(letters, function (letter, index, collection) {
      iterations.push([letter, index, collection]);
    });

    expect(iterations).to.eql([
      ['a', 0, letters],
      ['b', 1, letters],
      ['c', 2, letters],
    ]);
  });

  it('객체를 입력받은 경우, 객체의 속성값에 접근할 수 있어야 합니다', function () {
    const letters = { d: 'dog', e: 'elephant', f: 'flotsam' };
    const result = [];

    _.each(letters, function (value) {
      result.push(value);
    });

    expect(result).to.eql(['dog', 'elephant', 'flotsam']);
  });

  it('객체를 입력받은 경우, 객체의 속성값, 속성이름에 접근할 수 있어야 합니다', function () {
    const letters = { d: 'dog', e: 'elephant', f: 'flotsam' };
    const result = [];

    _.each(letters, function (value, key) {
      result.push([value, key]);
    });

    expect(result).to.eql([
      ['dog', 'd'],
      ['elephant', 'e'],
      ['flotsam', 'f'],
    ]);
  });

  it('객체를 입력받은 경우, 객체의 속성값, 속성이름, 객체 자체에 접근할 수 있어야 합니다', function () {
    const letters = { d: 'dog', e: 'elephant', f: 'flotsam' };
    const result = [];

    _.each(letters, function (value, key, object) {
      result.push([value, key, object]);
    });

    expect(result).to.eql([
      ['dog', 'd', letters],
      ['elephant', 'e', letters],
      ['flotsam', 'f', letters],
    ]);
  });

  it('객체를 입력받은 경우, `length` 속성(property)은 배열의 length와는 다르다는 것을 이해해야 합니다', function () {
    const dresser = { length: 39, width: 79, height: 127 };
    const objValueSize = Object.values(dresser).length;
    const objKeySize = Object.keys(dresser).length;
    let length = 0;
    result = [];

    _.each(dresser, function (value, property, object) {
      result.push([value, property, object]);
      length++;
    });

    expect(result).to.eql([
      [39, 'length', dresser],
      [79, 'width', dresser],
      [127, 'height', dresser],
    ]);
    expect(length).to.not.equal(dresser.length);
    expect(length).to.equal(objValueSize);
    expect(length).to.equal(objKeySize);
  });
});

describe('indexOf', function () {
  checkNativeMethods(function () {
    _.indexOf([10, 20, 30, 40], 40);
    _.indexOf([10, 20, 30, 40], 20);
    _.indexOf([10, 20, 30, 40], 50);
  });

  checkIterationAlgorithm(function () {
    _.indexOf([10, 20, 30, 40], 40);
  });

  it('target이 있는 경우, target의 index를 리턴해야 합니다', function () {
    const numbers = [10, 20, 30, 40, 50];
    expect(_.indexOf(numbers, 40)).to.equal(3);
    expect(_.indexOf(numbers, 20)).to.equal(1);
  });

  it('target이 없는 경우, -1을 리턴해야 합니다', function () {
    const numbers = [10, 20, 30, 40, 50];
    expect(_.indexOf(numbers, 35)).to.equal(-1);
  });

  it('target이 여러 개 있을 경우, 가장 낮은 index를 리턴해야 합니다', function () {
    const numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];
    expect(_.indexOf(numbers, 40)).to.equal(1);
  });
});

describe('filter', function () {
  const isEven = function (num) {
    return num % 2 === 0;
  };

  checkNativeMethods(function () {
    _.filter([1, 2, 3, 4], isEven);
    _.filter([1, 3, 5, 7], isEven);
  });

  checkIterationAlgorithm(function () {
    _.filter([1, 2, 3, 4], isEven);
  });

  it('callback으로 짝수를 판별하는 함수를 입력받은 경우, 짝수만을 요소로 갖는 배열을 리턴해야 합니다', function () {
    const isEven = function (num) {
      return num % 2 === 0;
    };

    const arr = [1, 2, 3, 4, 5, 6];
    const evens = _.filter(arr, isEven);

    expect(evens).to.eql([2, 4, 6]);
  });

  it('callback으로 문자열의 길이가 6이상인지 판별하는 함수를 입력받은 경우, 길이 6 이상의 문자열만을 요소로 갖는 배열을 리턴해야 합니다', function () {
    const isLargerThanEqualSix = function (ele) {
      return ele.length >= 6;
    };

    const arr = ['hello', 'codestates', 'javascript', 'sw', 'web'];
    const longs = _.filter(arr, isLargerThanEqualSix);

    expect(longs).to.eql(['codestates', 'javascript']);
  });

  it('callback의 결과가 falsy인 요소를 제외한 새로운 배열을 리턴해야 합니다', function () {
    const arr = [1, 0, 2, false, true, null, undefined, ''];
    const results = _.filter(arr, _.identity);

    expect(results).to.eql([1, 2, true]);
  });

  it('입력받은 배열을 변경하지 않고 새로운 배열을 리턴해야 합니다', function () {
    const isOdd = function (num) {
      return num % 2 !== 0;
    };

    const numbers = [1, 2, 3, 4, 5, 6];
    const evens = _.filter(numbers, isOdd);

    expect(evens).to.not.equal(numbers);
    expect(numbers).to.eql([1, 2, 3, 4, 5, 6]);
  });
});

describe('reject', function () {
  const isEven = function (num) {
    return num % 2 === 0;
  };

  checkNativeMethods(function () {
    _.reject([1, 2, 3, 4, 5, 6], isEven);
    _.reject([1, 3, 5, 7], isEven);
    _.reject([2, 4, 6, 8], isEven);
  });

  checkIterationAlgorithm(function () {
    _.reject([1, 2, 3, 4], isEven);
  });

  it('callback으로 짝수를 판별하는 함수를 입력받은 경우, 짝수가 포함되지 않은 배열을 리턴해야 합니다', function () {
    const isEven = function (num) {
      return num % 2 === 0;
    };

    const arr = [1, 2, 3, 4, 5, 6];
    const evens = _.reject(arr, isEven);

    expect(evens).to.eql([1, 3, 5]);
  });

  it('callback으로 문자열의 길이가 6이상인지 판별하는 함수를 입력받은 경우, 길이 6 미만의 문자열만 요소로 갖는 배열을 리턴해야 합니다', function () {
    const isLargerThanEqualSix = function (ele) {
      return ele.length >= 6;
    };

    const arr = ['hello', 'codestates', 'javascript', 'sw', 'web'];
    const longs = _.reject(arr, isLargerThanEqualSix);

    expect(longs).to.eql(['hello', 'sw', 'web']);
  });

  it('입력받은 배열을 변경하지 않고 새로운 배열을 리턴해야 합니다', function () {
    const isOdd = function (num) {
      return num % 2 !== 0;
    };

    const numbers = [1, 2, 3, 4, 5, 6];
    const evens = _.reject(numbers, isOdd);

    expect(evens).to.not.equal(numbers);
    expect(numbers).to.eql([1, 2, 3, 4, 5, 6]);
  });
});

describe('uniq', function () {
  checkNativeMethods(function () {
    _.uniq([1, 2, 3, 4]);
    _.uniq([1, 1, 3, 4, 5, 4]);
    _.uniq([1, '1', 3, 4, 5, 4]);
  });

  checkIterationAlgorithm(function () {
    _.uniq([1, 2, 3, 4]);
  });

  it('중복된 요소가 제거된 배열을 리턴해야 합니다', function () {
    const numbers = [1, 2, 2, 3, 4, 4];
    expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
  });

  it('중복 여부의 판단은 엄격한 동치 연산(strict equality, ===)을 사용해야 합니다', function () {
    const arr = [1, 2, 1, 3, 1, '3', 4, '1', 2];
    expect(_.uniq(arr)).to.eql([1, 2, 3, '3', 4, '1']);
  });

  it('입력받은 배열을 변경하지 않고 새로운 배열을 리턴해야 합니다', function () {
    const arr = [1, 2, 1, 3, 1, '3', 4, '1', 2];
    const uniqueArr = _.uniq(arr);
    expect(arr).to.eql([1, 2, 1, 3, 1, '3', 4, '1', 2]);
    expect(uniqueArr).to.eql([1, 2, 3, '3', 4, '1']);
    expect(uniqueArr).to.not.equal(arr);
  });
});

describe('map', function () {
  checkNativeMethods(function () {
    _.map([1, 2, 3, 4], function (num) {
      return num * 2;
    });
  });

  checkIterationAlgorithm(function () {
    _.map([1, 2, 3, 4], function (num) {
      return num * 2;
    });
  });

  it('전달받은 callback 함수를 배열의 모든 요소에 적용해야 합니다', function () {
    const squared = _.map([1, 2, 3], function (num) {
      return num ** 2;
    });
    expect(squared).to.eql([1, 4, 9]);
  });

  it('입력받은 배열을 변경하지 않고 새로운 배열을 리턴해야 합니다', function () {
    const arr = [1, 2, 3, 4, 5];
    const result = _.map(arr, function (num) {
      return num * 2;
    });
    expect(arr).to.eql([1, 2, 3, 4, 5]);
    expect(result).to.not.equal(arr);
  });

  it('입력받은 배열을 변경하지 않고 새로운 배열을 리턴해야 합니다', function () {
    const arr = [1, 2, 3];
    const result = _.map(arr, function (num) {
      return num;
    });

    expect(arr).to.eql([1, 2, 3]);
    expect(result).to.eql([1, 2, 3]);
    expect(result).to.not.equal(arr);
  });
});

describe('pluck', function () {
  checkNativeMethods(function () {
    const people = [
      { name: 'moe', age: 30 },
      { name: 'curly', age: 50 },
    ];
    _.pluck(people, 'name');
    _.pluck(people, 'height');
  });

  checkIterationAlgorithm(
    function () {
      const people = [
        { name: 'moe', age: 30 },
        { name: 'curly', age: 50 },
      ];
      _.pluck(people, 'name');
    },
    ['map']
  );

  it('각 요소에서 원하는 속성의 값만을 요소로 갖는 배열을 리턴해야 합니다', function () {
    const people = [
      { name: 'moe', age: 30 },
      { name: 'curly', age: 50 },
    ];
    const names = _.pluck(people, 'name');
    expect(names).to.eql(['moe', 'curly']);
  });

  it('입력받은 배열을 변경하지 않고 새로운 배열을 리턴해야 합니다', function () {
    const people = [
      { name: 'moe', age: 30 },
      { name: 'curly', age: 50 },
    ];
    const ages = _.pluck(people, 'age');

    expect(ages).to.eql([30, 50]);
    expect(people).to.eql([
      { name: 'moe', age: 30 },
      { name: 'curly', age: 50 },
    ]);
  });
});

describe('reduce', function () {
  const add = function (tally, item) {
    return tally + item;
  };

  checkNativeMethods(function () {
    _.reduce([1, 2, 3, 4], add);
    _.reduce([1, 2, 3, 4], add, 10);
  });

  checkIterationAlgorithm(function () {
    _.reduce([1, 2, 3, 4], add);
  });

  it('반복 작업의 누적된 값을 리턴해야 합니다', function () {
    const result = _.reduce([3, 2, 1], function (justPrevItem, item) {
      return item;
    });
    expect(result).to.be.defined;
  });

  it('입력받은 배열을 변경하지 말아야 합니다', function () {
    const arr = [1, 2, 3, 4, 5];
    function getInitVal(unchangedInitVal, item) {
      return unchangedInitVal;
    }
    let result = _.reduce(arr, getInitVal);
    expect(arr).to.eql([1, 2, 3, 4, 5]);

    result = _.reduce(arr, getInitVal, 10);
    expect(arr).to.eql([1, 2, 3, 4, 5]);
  });

  it('iteratee는 차례대로 누적값, 요소, 인덱스, 전체 배열을 입력받아야 합니다', function () {
    let accInCb, itemInCb, idxInCb, arrInCb;

    const result = _.reduce(
      ['item1'],
      function (acc, item, idx, src) {
        accInCb = acc;
        itemInCb = item;
        idxInCb = idx;
        arrInCb = src;
      },
      'initValue'
    );

    expect(result).to.equal(undefined);
    expect(accInCb).to.equal('initValue');
    expect(itemInCb).to.equal('item1');
    expect(idxInCb).to.equal(0);
    expect(arrInCb).to.eql(['item1']);
  });

  it('초기 값(accumulator)을 입력받은 경우, 배열의 모든 요소가 iteratee에 전달됩니다', function () {
    const orderTraversed = [];
    const result = _.reduce(
      [1, 2, 3, 4],
      function (left, item) {
        orderTraversed.push(item);
        return left - item;
      },
      12
    );
    expect(result).to.equal(2);
    expect(orderTraversed).to.eql([1, 2, 3, 4]);
  });

  it('초기 값(accumulator)으로 fasly 값을 입력받을 수 있습니다', function () {
    function add(sum, item) {
      return sum + item;
    }

    function mul(prod, item) {
      return prod * item;
    }

    const sum = _.reduce([1, 2, 3], add, 0);
    const prod = _.reduce([1, 2, 3], mul, 0);

    expect(sum).to.equal(6);
    expect(prod).to.equal(0);
  });

  it('초기 값(accumulator)을 입력받지 않은 경우, 배열의 첫 번째 요소를 accumulator로 사용해야 합니다', function () {
    const result = _.reduce([1, 2, 3], function (total, item) {
      return total * item + 1;
    });
    expect(result).to.equal(10);
  });

  it('초기 값(accumulator)을 입력받지 않은 경우, 배열의 2번째 요소부터 반복 작업을 해야 합니다', function () {
    const orderTraversed = [];
    const result = _.reduce([1, 2, 3, 4], function (tally, item) {
      orderTraversed.push(item);
      return tally * item;
    });
    expect(result).to.equal(24);
    expect(orderTraversed).to.eql([2, 3, 4]);
  });
});
