# CH1.선언형 vs 절차형 💁🏻

### 1. 선언형

> 무엇을 할것인가, 과정보다 어떤것을 할것인지에 중점을 두는 방식

```jsx
function double(arr) {
  return arr.map((i) => i * 2);
}
```

⇒ EX) HTML, CSS, XML, SQL

### 2. 절차형

> 무엇을 어떻게 할 것인가, 즉 원하는 결과를 만들어 가는 과정에 중점을 두는 프로그래밍 방식

```jsx
function double(arr) {
  let result;
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  return result;
}
```


⇒ 순차적인 처리, 컴퓨터와 유사한 처리구조로 실행속도 빠름

⇒ but, 유지보수 어려움, 코드의 순서가 바뀌면 동일한 동작 결과를 보장하지 못함

⇒ 아고라 스테이츠에서 했던 creatElement도 절차형? (코드가 위→ 아래로 순차적 ) 예를들어서

```jsx
const a = `hello, world`;

const $p = document.createElement("p");
$p.inneHTML = a;

const $button = document.getElementByID("button");
$button.appendChild($p);
```

```jsx
fuuction p(text){
	const $p = document.createElement("p");
	$p.inneHTML = text;
	return $p;
}
fuuction render(ele){
	const $button = document.getElementByID("button");
	$button.appendChild($p);
}

const a = `hello, world`;
render(p(a));
```

⇒ 아고라 스테이츠 코드가 많아지면 성능을 높이고 싶을때 혹은 기능을 추가하고 싶을때 어려움이 있을것, 이를 함수의 형태로 분리한다면 직관적인 코드가됨.

# CH2.getter vs setter 💁🏻

객체의 프로퍼티는 두 종류로 나뉨.

1. 데이터 프로퍼티 : 객체에 속해있는 프로퍼티
2. 접근자 프로퍼티 : 본질은 함수, 값을 획득하고 설정하는 역할. but, 외부코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보임


###

```jsx
let obj = {
  get propName() {
    // getter, obj.propName을 실행할 때 실행되는 코드
  },

  set propName(value) {
    // setter, obj.propName = value를 실행할 때 실행되는 코드
  },
};
```

⇒ getter 메서드는 프로퍼티를 읽을때, setter는 프로퍼티에 값을 할당할때

## 함수합성: 함수들을 조합해서 새로운 함수 만드는 것

- 왜? → 프로그램을 간결하고 실용적으로 작성하기 위해, 가독성 굳,
