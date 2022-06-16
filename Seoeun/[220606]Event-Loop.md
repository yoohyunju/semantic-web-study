# Event Loop

자바스트립트는 단일 스레드 기반의 언어로 한 순간 하나의 작업만을 처리 할 수 있습니다. 하지만 단일 스레드에도 불구하고 **비동기로 동작하여 동시에 많은 작업을 수행**합니다.

**비동기로 동작하는 핵심요소**는 자바스크립트 언어가 아니라 **브라우저**가 가지고 있습니다. 브라우저는 **Web API, Event Table, Callback Queue, Event Loop등으로 구성**됩니다.

자바스크립트는 **이벤트 루프를 이용해서 비동기 방식으로 동시성을 지원**합니다.

- Heap : 메모리 할당이 일어나는 곳 (구조화 되지 않은 넓은 메모리 영역 → 객체(변수,함수 등)들이 담긴다.)
- Call Stack(호출 스택) : 코드가 실행될때 쌓이는 곳, 실행될 코드를 한줄 단위로 할당되어 실행
- Web API : DOM, AJAX, setTimeout 등 브라우저가 제공하는 API(비동기를 처리를 담당)
- Callback Queue : 비동기 처리가 끝난 후 실행되어야 할 `콜백 함수`가 차례로 할당
- Event Loop : Queue에 할당된 콜백함수를 순서에 맞춰 Call Stack에 할당

## 예제

```jsx
console.log("시작")

setTimeout(()=> console.log("중간"),3000)

console.log("끝")

//시작 끝 중간
```

- call Stack : 선언한 모든 코드를 갖고있는 anonyumous → console.log("시작") → setTimeout(비동기여서 web API로 감) →anonyumous →비어있는 단계 → console.log("끝")
- Web API : timeout과 동시에 끝이 호출되고 3초를 돌리고있음, 여기있던 콜백함수가 콜백큐로 넘어감
- Callback Queue : 콜백함수 → 이벤트 루프가 콜스택이 비어있는지를 검사 → 비어있다면 콜백스택으로 함수가 넘어감
- console :시작 → 끝 → 중간

만약 0초여도 콜백큐에서 이벤트루프로 콜스택을 확인했을때 비어있지않으면 콜백큐 안에 들어있는 익명함수가 콜스택으로 갈수없으므로 콜스택안에있는 것들을 다 종료후에 이동가능 함

### 즉, Callback Queue 는 비동기적으로 실행된 콜백 함수가 보관되는 곳으로 콜스택에 가기 위한 `대기열` , `콜스택이 비어져있을때 먼저 대기열에 들어온 순서대로 수행`

여기서 Promise는 setTimeout보다 우선순위가 높기때문에 늦게 들어와도 먼저 콜백스택으로 이동한다. 왜일까? 콜백큐안에는 여러가지 구성이있고 그 중 Microtask Queue 개념을 보면됨

콜백큐는 선입선출 구조이지만 그 안에 여러개로 구성되어있어서 우선순위가 존재한다. 크게 Microtask Queue, Animation Frames, Task Queue로 구성(더많음) → web API의 종류에 따라 다른 큐로 이동 → 콜백 큐에서 실행 스택으로 옮겨지는 우선 순위는 1.Microtask Queue 2.Animation Frames 3.Task Queue

Microtask Queue안에 Promise가 있고 Task Queue안에 setTimeout, setInterval등이있다.
