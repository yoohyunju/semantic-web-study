*커링함수와 클로저의 차이에 대해 알아보았습니다.* 

*커링함수가 클로저의 사용 사례 중 하나라고 말하는 엔지니어가 있는 반면,* 

*클로저는 자바스크립트의 핵심 기능이고, 커링함수는 자바스크립트에 내장 지원되지 않기 때문에 완전히 다른 개념이라고 말하는 엔지니어가 있었습니다.* 

---

# 1. closure : 자바스크립트의 핵심 기능 중 하나입니다.

클로저는 외부 함수 범위와 외부 함수 외부에서 실행되는 경우에도 위의 모든 범위에 액세스할 수 있는 내부 함수입니다. 

- 클로저를 언제 쓸까?

주로 정보를 은닉할 때 사용하고, 전역 변수의 사용을 억제하기 위해 사용합니다. 

```jsx
function numbers(firstNum, secondNum) {
	let a = 'The result is';
	return add();
}
function add() {
	let b = firstNum + secondNum;
	return a + b;
}
console.log(numbers(2,5));

// 출력값: ReferenceError: firstNum is not defined
```

add()가 numbers() 외부에 정의되어 있기 때문에 *numbers()*의 **변수에 **액세스할 **수 **없습니다*.* 그래서 ***firstNum*이 **정의되지 **않았다는 ****오류가 발생합니다.

위와 같은 범위로 인해 발행하는 문제를 극복하기 위해 나온 것이 바로 closer 입니다.

**CLOSURES** 는 변수 및 전역 변수 외에 다른 함수의 변수에 액세스할 수 있는 함수입니다.

```jsx
function numbers(firstNum, secondNum) {
	let a = 'The result is ';
function add() {
	let b = firstNum + secondNum;
	return a + b;
}
	return add();
}

console.log(numbers(2,5));

// 출력값: The result is 7
```

이 경우 add()는 numbers() 내부에 정의되어 있으며 모든 변수에 액세스할 수 있습니다. 따라서 출력은 ‘The result is 7’ 이 됩니다.

---

---

---

# 2. currying: 자바스크립트에 내장 지원이 없습니다.

클로저의 사용 사례 중 하나다. 

커링 함수는 한 번에 모든 인수를 취하는 대신 여러 인수를 한 번에 하나씩 취하는 함수를 분해하는 함수입니다.

커링 함수에서 각 중첩 함수는 클로저에서 외부 함수에 전달된 인수를 추적합니다.

- 커링을 언제 쓸까?

어떤 함수를 호출할 때 대부분의 매개 변수가 항상 비슷하다면 커링을 쓰면 편하다.

예를 들어, 아래 코드를 커링 함수로 변환한다면

```jsx
function multiply(x, y, z){
  return x, y, z;
}

console.log(multiply(3, 5, 7));  // 3*5*7
console.log(multiply(3, 5, 8));  // 3*5*8
console.log(multiply(3, 2, 1));  // 3*2*1
```

👇 커링함수로 변환한 코드

```jsx
function multiply(x) {
  return function(y) {
    return function(z){
      return x*y*z;
    }
  }
}

let multiply3 = multiply(3);   // 3이 고정됨
let multiply3And5 = multiply3(5);  // 3과 5가 고정됨
let multiply3And2 = multiply3(2);  // 3과 2가 고정됨
console.log(multiply3And5(7));
console.log(multiply3And5(8));
console.log(multiply3And2(1));
```

👇 다른 커링 함수의 예제 코드

```jsx
var sayWhat = function(a){
    return function(b){
        return function(c){
            console.log(`say ${a} to ${b} using ${c}`);
        }
    }
}

sayWhat("hello")("friends")("currying function"); // say hello to friends using currying function
```

<aside>
💡 혹시 잘못된 정보가 있다면 댓글 남겨주세요. 저의 성장에 많은 도움이 됩니다.

</aside>
<br>

참고

[https://codingnconcepts.com/javascript/lexical-scope-closures-and-currying/](https://codingnconcepts.com/javascript/lexical-scope-closures-and-currying/)

[https://www.quora.com/Is-there-any-difference-between-currying-and-closure-in-JavaScript](https://www.quora.com/Is-there-any-difference-between-currying-and-closure-in-JavaScript)
