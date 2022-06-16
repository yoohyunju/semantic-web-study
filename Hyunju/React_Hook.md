## React Hook이란?

> **기존 React의 문제점**

1. 컴포넌트 사이에서 상태 로직을 재사용하기 어려움.
2. 코드가 길고 복잡한 컴포넌트들을 이해하기 어려움.
3. Class는 사람과 기계를 혼동시킴. (Class 사용을 위해서는 this 키워드 작동을 알아야 하는데, 다른 언어와는 다르게 작동하여 혼란을 주었음.)

결론적으로, 클래스형 컴포넌트가 함수형 컴포넌트에 비해 단점이 많아서 Hook이 나온 것이다!
> 

- **정의** :  Hook은 계층의 변화 없이 상태 관련 로직을 재사용할 수 있도록 도와주는 도구. 즉, 함수형 컴포넌트가 클래스형 컴포넌트의 기능을 사용할 수 있도록 해주는 기능이다.

## 클래스형 컴포넌트와 함수형 컴포넌트

- **클래스형 컴포넌트** (this.setState() 사용)
    
    ```jsx
    // 더하기 버튼을 클릭하면 1 증가, 빼기 버튼을 클릭하면 1 감소하는 코드
    
    import React from "react";
    
    class App extends React.Component {
      state = {
          number: 0
      };
      render() {
        return (
          <div style={{ "textAlign": "center" }}>
            <div style={{ "fontSize": "100px" }}>{this.state.number}</div>
            <button onClick={this.handleClickIncrement}>더하기</button>
            <button onClick={this.handleClickDecrement}>빼기</button>
          </div>
        );
      }
      handleClickIncrement = () => {
        this.setState(state => ({
          number: state.number + 1
        }));
      };
      handleClickDecrement = () => {
        this.setState(state => ({
          number: state.number - 1
        }));
      };
    }
    
    export default App;
    ```
    

- **함수형 컴포넌트** (useState 사용)
    
    ```jsx
    // 더하기 버튼을 클릭하면 1 증가, 빼기 버튼을 클릭하면 1 감소하는 코드
    
    import React, { useState } from "react";
    
    const App = () => {
      const [number, setNumber] = useState(0);
      return (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "100px" }}>{number}</div>
          <button onClick={() => setNumber(number + 1)}>더하기</button>
          <button onClick={() => setNumber(number - 1)}>빼기</button>
        </div>
      );
    };
    
    export default App;
    ```
    
## React Hook의 규칙

- 최상위에서만 Hook을 호출해야 한다.
- 일반적인 JavaScript 함수가 아닌 React 함수 내에서만 Hook을 호출해야 한다.

➡️ 위의 두 가지 규칙을 강제하는 ESLint 플러그인이 있다. 이는 Create React App에 기본적으로 포함되어있다.

## Hooks API

- [**기본 Hook**](https://ko.reactjs.org/docs/hooks-reference.html#basic-hooks)
    - `[useState](https://ko.reactjs.org/docs/hooks-reference.html#usestate)`
    - `[useEffect](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)`
    - `[useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)`
- [**추가 Hooks**](https://ko.reactjs.org/docs/hooks-reference.html#additional-hooks)
    - `[useReducer](https://ko.reactjs.org/docs/hooks-reference.html#usereducer)`
    - `[useCallback](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)`
    - `[useMemo](https://ko.reactjs.org/docs/hooks-reference.html#usememo)`
    - `[useRef](https://ko.reactjs.org/docs/hooks-reference.html#useref)`
    - `[useImperativeHandle](https://ko.reactjs.org/docs/hooks-reference.html#useimperativehandle)`
    - `[useLayoutEffect](https://ko.reactjs.org/docs/hooks-reference.html#uselayouteffect)`
    - `[useDebugValue](https://ko.reactjs.org/docs/hooks-reference.html#usedebugvalue)`
    

[[react] 리액트 훅(react hook)이란? - 클래스형 컴포넌트와 비교](https://codingbroker.tistory.com/23)

[React(23) 리액트 훅이란?](https://devbirdfeet.tistory.com/52)