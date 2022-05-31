'use strict';


_.once = function (func) {
  let check = false;
  let result;
  return function () {
    check ? null : (check = true, result = (func.apply(this, arguments)));
    return result;
  };
};


_.delay = function (func, wait, ...args) {
  setTimeout(func, wait, ...args);
};


_.includes = function (arr, target) {
  // TODO: 여기에 코드를 작성합니다.
  // console.log(this)
  let result = false;
  this.each(arr, (v) => v === target? result = true : result);
  return result;
};


_.every = function (arr, iteratee) {
  let check = false;
  arr.length === 0 ?
    check = true :
    this.each(arr, (v) => iteratee ? iteratee(v) ? check = true : check = false : v ? check = true : check = false);
  return check;
};


_.some = function (arr, iteratee) {
  // TODO: 여기에 코드를 작성합니다.
  let check = false;
  this.each(arr, (v) => iteratee ? iteratee(v) ? check = true : null : v ? check = true : null);
  return check;
};


_.extend = function (obj, ...args) {
  this.each(args, (v) => this.each(Object.entries(v), (t) => obj[t[0]] = t[1]));
  return obj;
};


_.defaults = function (obj, ...args) {
  this.each(args, (v) => this.each(Object.entries(v), (t) => obj[t[0]] !== undefined ? null : obj[t[0]] = t[1]));
  return obj;
};


_.zip = function (arr1, arr2, ...args) {
  // pluck
};


_.zipStrict = function () {
  // TODO: 여기에 코드를 작성합니다.
};


_.intersection = function (set1, ...args) {
  const result = {};
  const answer = [];
  for(let i = 0; i < args.length; i++) {
    this.each(args[i], (v, i) => {
      if(this.includes(set1, v)) {
        if(result[v]) {
          result[v] += 1;
        }else {
          result[v] = 1;
        }
      }
    });
  }
  for(let j in result) {
    if(result[j] === args.length) {
      answer.push(j)
    }
  }
  return answer;
};



_.difference = function () {
  // TODO: 여기에 코드를 작성합니다.
};


_.sortBy = function (arr, transform, order) {
  let answer;
  if(transform === undefined) {
    return arr.sort((a, b) => {
      if(a > b) {
        return 1;
      }else if(a < b) {
        return -1;
      }else {
        return 0;
      }
    });
  }else if(transform !== undefined) {
    if(order === 1 || order === undefined) {
      answer = arr.sort((a, b) => {
        if(transform(a) > transform(b)) {
          return 1;
        }else if(transform(a) < transform(b)) {
          return -1;
        }else {
          return 0;
        }
      });
      return [...answer];
    }else if(order === -1) {
      answer = arr.sort((a, b) => {
        if(transform(a) > transform(b)) {
          return -1;
        }else if(transform(a) < transform(b)) {
          return 1;
        }else {
          return 0;
        }
      });
      return [...answer];
    }
  }
};


_.shuffle = function (arr) {
  let arrCloned = arr.slice();
  for (let fromIdx = 0; fromIdx < arr.length; fromIdx++) {
    const toIdx = Math.floor(Math.random() * arr.length);
    let temp = arrCloned[fromIdx];
    arrCloned[fromIdx] = arrCloned[toIdx];
    arrCloned[toIdx] = temp;
  }
  return arrCloned;
};