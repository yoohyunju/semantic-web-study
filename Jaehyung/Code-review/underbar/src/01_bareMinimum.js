'use strict';

_.identity = function (val) {
  return val;
};


_.slice = function (arr, start, end) {
  let _start = start || 0,
    _end = end;

  if (start < 0) _start = Math.max(0, arr.length + start);
  if (end < 0) _end = Math.max(0, arr.length + end);
  if (_end === undefined || _end > arr.length) _end = arr.length;
  let result = [];
  for (let i = _start; i < _end; i++) {
    result.push(arr[i]);
  }
  return result;
};


_.take = function (arr, n) {
  return n === undefined ? [] : this.slice(arr, 0, n);
};


_.drop = function (arr, n) {
  return this.slice(arr, n, arr.length);
};


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

_.indexOf = function (arr, target) {
  let result = -1;

  _.each(arr, function (item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });

  return result;
};


_.filter = function (arr, test) {
  const result = [];
  this.each(arr, (v) => test(v) ? result.push(v) : null);
  return result;
};

_.reject = function (arr, test) {
  return this.filter(arr, (v) => !test(v));
};


_.uniq = function (arr) {
  const result = [];
  this.each(arr, (v, i) => i === this.indexOf(arr, v) ? result.push(v) : null);
  return result;
};


_.map = function (arr, iteratee) {
  const result = [];
  this.each(arr, (v) => result.push(iteratee(v)));
  return result;
};


_.pluck = function (arr, keyOrIdx) {
  return this.map(arr, (v) => v[keyOrIdx]);
};

_.reduce = function (arr, iteratee, initVal) {
  // TODO: 여기에 코드를 작성합니다.
  let result;
  let params;
  initVal !== undefined ?
    (params = arr, result = initVal) :
    (params = this.slice(arr, 1, arr.length), result = arr[0]);
  this.each(params, (v, i, c) => result = iteratee(result, v, i, c));

  return result;
};

