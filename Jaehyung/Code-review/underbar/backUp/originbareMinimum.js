'use strict';


// _.identity는 전달인자(argument)가 무엇이든, 그대로 리턴합니다.
// 이 함수는 underbar의 기능 구현 및 테스트를 위해 재사용되는 함수입니다.
_.identity = function (val) {
  return val;
};


// _.slice는 배열의 start 인덱스부터 end 인덱스 이전까지의 요소를 shallow copy하여 새로운 배열을 리턴합니다.
_.slice = function (arr, start, end) {
  // 변수를 선언할 경우, 아래와 같이 콤마(,)를 이용해 선언할 수 있습니다.
  // 이때, 콤마로 연결된 변수들은 모두 동일한 선언 키워드(let, const)가 적용됩니다.
  // 이런 코딩 스타일도 가능하다는 것을 보여드리기 위한 예시일 뿐, 사용을 권장하는 것은 아닙니다.
  // 오픈 소스에 기여하든, 회사 내에서 개발을 하든 본인이 속한 조직의 코딩 스타일, 코딩 컨벤션을 따르면 됩니다.
  // 그리고 아래와 같은 코딩 스타일을 봐도 당황하지 않고 해석할 수 있으면 됩니다.
  let _start = start || 0, // `start`가 undefined인 경우, slice는 0부터 동작합니다.
    _end = end;

  // 입력받은 인덱스가 음수일 경우, 마지막 인덱스부터 매칭한다. (예. -1 => arr.length - 1, -2 => arr.length - 2)
  // 입력받은 인덱스는 0 이상이어야 한다.
  if (start < 0) _start = Math.max(0, arr.length + start);
  if (end < 0) _end = Math.max(0, arr.length + end);

  // `end`가 생략될 경우(undefined), slice는 마지막 인덱스까지 동작합니다.
  // `end`가 배열의 범위를 벗어날 경우, slice는 마지막 인덱스까지 동작합니다.
  if (_end === undefined || _end > arr.length) _end = arr.length;

  let result = [];
  // `start`가 배열의 범위를 벗어날 경우, 빈 배열을 리턴합니다.
  for (let i = _start; i < _end; i++) {
    result.push(arr[i]);
  }
  return result;
};

// _.take는 배열의 처음 n개의 element를 담은 새로운 배열을 리턴합니다.
// n이 undefined이거나 음수인 경우, 빈 배열을 리턴합니다.
// n이 배열의 길이를 벗어날 경우, 전체 배열을 shallow copy한 새로운 배열을 리턴합니다.
// 동작완료 or return

_.take = function (arr, n) {
  if(n === undefined) {
    return [];
  }
  return this.slice(arr, 0, n);
};

// _.drop는 _.take와는 반대로, 처음 n개의 element를 제외한 새로운 배열을 리턴합니다.
// n이 undefined이거나 음수인 경우, 전체 배열을 shallow copy한 새로운 배열을 리턴합니다.
// n이 배열의 길이를 벗어날 경우, 빈 배열을 리턴합니다.

_.drop = function (arr, n) {
  return this.slice(arr, n, arr.length);
};

// _.last는 배열의 마지막 n개의 element를 담은 새로운 배열을 리턴합니다.
// n이 undefined이거나 음수인 경우, 배열의 마지막 요소만을 담은 배열을 리턴합니다.
// n이 배열의 길이를 벗어날 경우, 전체 배열을 shallow copy한 새로운 배열을 리턴합니다.
// _.take와 _.drop 중 일부 또는 전부를 활용할 수 있습니다.
_.last = function (arr, n) {
  if(n === undefined) {
    return [arr[arr.length - 1]];
  }else if(n === 0) {
    return [];
  }else if(n > arr.length) {
    return arr;
  }
  return this.drop(arr, n - 1);
};

// _.each는 collection의 각 데이터에 반복적인 작업을 수행합니다.
//  1. collection(배열 혹은 객체)과 함수 iteratee(반복되는 작업)를 인자로 전달받아 (iteratee는 함수의 인자로 전달되는 함수이므로 callback 함수)
//  2. collection의 데이터(element 또는 property)를 순회하면서
//  3. iteratee에 각 데이터를 인자로 전달하여 실행합니다.

// iteratee에는 테스트 케이스에 따라서 다양한 함수가 할당됩니다.
// Array.prototype.forEach 메소드를 사용할 때, 다양한 형태의 callback 함수를 사용할 수 있었던 걸 기억하시나요?
// 우리가 만드는 _.each 함수도 그렇게 잘 작동하게 하기 위한 방법을 고민해 봅시다.

/*
 * SpecRunner를 열고 each의 네 번째 테스트 케이스를 눌러 보시기 바랍니다.
 * 이 테스트 케이스의 collection은 letters이고,
 * iteratee는 익명함수 function(letter) { iterations.push(letter); }); 입니다.
 *
 *  const letters = ['a', 'b', 'c'];
 *  const iterations = [];
 *  _.each(letters, function(letter) {
 *   iterations.push(letter);
 *  });
 *  expect(iterations).to.eql(['a', 'b', 'c']);
 *
 * iteratee는 차례대로 데이터(element 또는 value), 접근자(index 또는 key), collection을 다룰 수 있어야 합니다.
 *  배열 arr을 입력받을 경우, iteratee(ele, idx, arr)
 *  객체 obj를 입력받을 경우, iteratee(val, key, obj)
 * 이처럼 collection의 모든 정보가 iteratee의 인자로 잘 전달되어야 모든 경우를 다룰 수 있습니다.
 * 실제로 전달되는 callback 함수는 collection의 모든 정보가 필요하지 않을 수도 있습니다.
 */

// _.each는 명시적으로 어떤 값을 리턴하지 않습니다.
_.each = function (collection, iteratee) {
  if(Array.isArray(collection)) {
    for(let i = 0; i < collection.length; i++) {
      iteratee(collection[i], i, collection);   
    }
  }else if(collection.constructor === Object) {
    for(let j in collection) {
      iteratee(collection[j], j, collection);
    }
  }
};

// _.indexOf는 target으로 전달되는 값이 arr의 요소인 경우, 배열에서의 위치(index)를 리턴합니다.
// 그렇지 않은 경우, -1을 리턴합니다.
// target이 중복해서 존재하는 경우, 가장 낮은 index를 리턴합니다.
_.indexOf = function (arr, target) {
  // 배열의 모든 요소에 접근하려면, 순회 알고리즘(iteration algorithm)을 구현해야 합니다.
  // 반복문을 사용하는 것이 가장 일반적이지만, 지금부터는 이미 구현한 _.each 함수를 활용하여야 합니다.
  // 아래 _.indexOf의 구현을 참고하시기 바랍니다.
  let result = -1;

  _.each(arr, function (item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });

  return result;
};

// _.filter는 test 함수를 통과하는 모든 요소를 담은 새로운 배열을 리턴합니다.
// test(element)의 결과(return 값)가 truthy일 경우, 통과입니다.
// test 함수는 각 요소에 반복 적용됩니다.
_.filter = function (arr, test) {
  const result = [];
  this.each(arr, (v) => test(v) ? result.push(v) : null);
  return result;
};

// _.reject는 _.filter와 정반대로 test 함수를 통과하지 않는 모든 요소를 담은 새로운 배열을 리턴합니다.
_.reject = function (arr, test) {
  // TODO: 여기에 코드를 작성합니다.
  // TIP: 위에서 구현한 `filter` 함수를 사용해서 `reject` 함수를 구현해 보세요.
  return this.filter(arr, (v) => !test(v));
};

// _.uniq는 주어진 배열의 요소가 중복되지 않도록 새로운 배열을 리턴합니다.
// 중복 여부의 판단은 엄격한 동치 연산(strict equality, ===)을 사용해야 합니다.
// 입력으로 전달되는 배열의 요소는 모두 primitive value라고 가정합니다.
_.uniq = function (arr) {
  // TODO: 여기에 코드를 작성합니다.
  const result = [];
  this.each(arr, (v, i) => i === this.indexOf(arr, v) ? result.push(v) : null);
  // this.each(arr, (v, i) => console.log(`v = ${v} index = ${i} indexOf = `, this.indexOf(arr,v)));
  
  return result;
};


// _.map은 iteratee(반복되는 작업)를 배열의 각 요소에 적용(apply)한 결과를 담은 새로운 배열을 리턴합니다.
// 함수의 이름에서 드러나듯이 _.map은 배열의 각 요소를 다른 것(iteratee의 결과)으로 매핑(mapping)합니다.
_.map = function (arr, iteratee) {
  // TODO: 여기에 코드를 작성합니다.
  // _.map 함수는 매우 자주 사용됩니다.
  // _.each 함수와 비슷하게 동작하지만, 각 요소에 iteratee를 적용한 결과를 리턴합니다.
  const result = [];
  this.each(arr, (v) => result.push(iteratee(v)));
  return result;
};

// _.pluck은
//  1. 객체 또는 배열을 요소로 갖는 배열과 각 요소에서 찾고자 하는 key 또는 index를 입력받아
//  2. 각 요소의 해당 값 또는 요소만을 추출하여 새로운 배열에 저장하고,
//  3. 최종적으로 새로운 배열을 리턴합니다.
// 예를 들어, 각 개인의 정보를 담은 객체를 요소로 갖는 배열을 통해서, 모든 개인의 나이만으로 구성된 별도의 배열을 만들 수 있습니다.
// 최종적으로 리턴되는 새로운 배열의 길이는 입력으로 전달되는 배열의 길이와 같아야 합니다.
// 따라서 찾고자 하는 key 또는 index를 가지고 있지 않은 요소의 경우, 추출 결과는 undefined 입니다.
_.pluck = function (arr, keyOrIdx) {
  // TODO: 여기에 코드를 작성합니다.

  return this.map(arr, (v) => v[keyOrIdx]);
};

// _.reduce는
//  1. 배열을 순회하며 각 요소에 iteratee 함수를 적용하고,
//  2. 그 결과값을 계속해서 누적(accumulate)합니다.
//  3. 최종적으로 누적된 결과값을 리턴합니다.
// 예를 들어, 배열 [1, 2, 3, 4]를 전부 더해서 10이라는 하나의 값을 리턴합니다.
// 각 요소가 처리될 때마다 누적되는 값은 차례대로 1, 1+2, 1+2+3, 1+2+3+4 입니다.
// 이처럼 _.reduce는 배열이라는 다수의 정보가 하나의 값으로 축소(응축, 환원, reduction)되기 때문에 reduce라는 이름이 붙게 된 것입니다.

// _.reduce는 위에서 구현한 많은 함수처럼, 입력으로 배열과 각 요소에 반복할 작업(iteratee)을 전달받습니다.
// iteratee에 대해서 복습하면 아래와 같습니다. (일반적으로 객체를 reduce 하지는 않으므로, 배열 부분만 복습합니다.)
// iteratee는 차례대로 데이터(element 또는 value), 접근자(index 또는 key), collection을 다룰 수 있어야 합니다.
//  배열 arr을 입력받을 경우, iteratee(ele, idx, arr)

// _.reduce는 반복해서 값을 누적하므로 이 누적되는 값을 관리해야 합니다.
// 따라서 _.reduce의 iteratee는 인자가 하나 더 추가되어 최종 형태는 아래와 같습니다.
//  iteratee(acc, ele, idx, arr)
// 누적되는 값은 보통 tally, accumulator(앞글자만 따서 acc로 표기하기도 함)로 표현하거나
// 목적을 더 분명하게 하기 위해 sum(합), prod(곱), total 등으로 표현하기도 합니다.
// 이때, acc는 '이전 요소까지'의 반복 작업의 결과로 누적된 값입니다.
// ele는 잘 아시다시피 반복 작업을 수행할(아직 수행하지 않은) 현재의 요소입니다.

// 여기까지 내용을 정리하면 다음과 같습니다.
//  _.reduce(arr, iteratee)
//  iteratee(acc, ele, idx, arr)
// 그런데 사실 누적값에 대해서 빠뜨린 게 하나 있습니다.
// 바로 '누적값은 어디서부터 시작하는가'라는 의문에 대한 대답을 하지 않았습니다.
// 이를 해결하는 방법은 초기 값을 직접 설정하거나 자동으로 설정하는 것입니다.
// _.reduce는 세 번째 인자로 초기 값을 전달받을 수 있습니다.
// 이 세 번째 인자로 초기 값이 전달되는 경우, 그 값을 누적값의 기초(acc)로 하여 배열의 '첫 번째' 요소부터 반복 작업이 수행됩니다.
// 반면 초기 값이 전달되지 않은 경우, 배열의 첫 번째 요소를 누적값의 출발로 하여 배열의 '두 번째' 요소부터 반복 작업이 수행됩니다.

// 따라서 최종적인 형태는 아래와 같습니다.
//  _.reduce(arr, iteratee, initVal)
//  iteratee(acc, ele, idx, arr)

// 아래 예제를 참고하시기 바랍니다.
//  const numbers = [1,2,3];
//  const sum = _.reduce(numbers, function(total, number){
//    return total + number;
//  }); // 초기 값이 주어지지 않았으므로, 초기 값은 배열의 첫 요소인 1입니다. 두 번째 요소부터 반복 작업이 시작됩니다.
//      // 1 + 2 = 3; (첫 작업의 결과가 누적되어 다음 작업으로 전달됩니다.)
//      // 3 + 3 = 6; (마지막 작업이므로 최종적으로 6이 리턴됩니다.)
//
//  const identity = _.reduce([3, 5], function(total, number){
//    return total + number * number;
//  }, 2); // 초기 값이 2로 주어졌습니다. 첫 번째 요소부터 반복 작업이 시작됩니다.
//         // 2 + 3 * 3 = 11; (첫 작업의 결과가 누적되어 다음 작업으로 전달됩니다.)
//         // 11 + 5 * 5 = 36; (마지막 작업이므로 최종적으로 36이 리턴됩니다.)
_.reduce = function (arr, iteratee, initVal) {
  // TODO: 여기에 코드를 작성합니다.
  let result;
  let params;
  initVal !== undefined ?
    (params = arr, result = initVal) :
    (params = this.slice(arr, 1, arr.length), result = arr[0]);
  this.each(params, (v, i, c) => result = iteratee(result, v, i, c))

  return result;
};