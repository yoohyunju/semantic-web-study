Side Effect and useEffect

# **Side Effect란?**

함수 내에서 어떤 구현이 함수 외부에 영향을 끼치는 경우 해당 함수는 Side Effect가 있다고 이야기한다. 즉, 순수 함수의 출력값에 영향을 미치는 모든 작업들 (유어클래스)

➥ React 컴포넌트가 화면에 렌더링된 이후에 비동기로 처리되어야 하는 부수적인 효과들을 Side Effect라고 한다.

### **React 컴포넌트에서의 Side Effect**

- 타이머 사용 (setTimeout)
- 데이터 가져오기 (fetch API, localStorage(🤔쿠키 저장))

# useEffect(함수, [종속성1, 종속성2, ...])

React에서는 Side-Effect 처리를 위해 useEffect()함수를 제공합니다.

useEffect라는 `Hook`을 이용해서 DOM 렌더링 직후에 컴포넌트가 할 일을 지시합니다. 많은 경우 네트워크 요청(데이터 요청) 또는 수동으로 DOM 변화를 지시합니다.

🤔 useEffect를 쓰지 않는다면??

```jsx
function UserProfile({ name }) {
  const message = `${name}님 환영합니다!`; //함수 반환 값 생성

  // Bad!
  document.title = `${name}의 개인정보`; //함수 외부와 상호작용하는 Side-effect 코드
  return <div>{message}</div>;
}
```

➥ 위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.

만약 document.title을 수정하는 대신에 무거운 작업을 수행하는 코드였다면, 컴포넌트가 렌더링 될 때마다 프로그램을 지연시키게 될 것입니다.

```jsx
function UserProfile({ name }) {
  const message = `${name}님 환영합니다!`;

  //Side-Effect 코드를 UseEffect로 분리
  useEffect(() => {
    document.title = `${name}의 개인정보`;
  }, [name]);
  return <div>{message}</div>;
}
```

➥ useEffect()를 사용하면 어떤 개발자라도 컴포넌트에 Side-Effect가 포함된다는 것을 알 수 있습니다. 또한 React에서는 useEffect()에 등록된 Side-Effect 코드를 최적화된 시점에 실행하기 때문에 컴포넌트의 실행속도를 개선하는데도 도움이 될 것입니다.

(🤓실행하려는 시기를 제어할 수 있으니까!!)

클래스 기반 컴포넌트는 함수 기반 컴포넌트에 비해 복잡하고 따라서 오류가 발생하기 쉽고 유지 보수가 힘들다.

참고

[https://blog.logrocket.com/using-localstorage-react-hooks/](https://blog.logrocket.com/using-localstorage-react-hooks/)

[https://www.daleseo.com/react-hooks-use-web-storage/](https://www.daleseo.com/react-hooks-use-web-storage/)

[https://seoyun-is-connecting-the-dots.tistory.com/349](https://seoyun-is-connecting-the-dots.tistory.com/349)

[https://godsenal.com/posts/함수형-프로그래밍이란/](https://godsenal.com/posts/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80/)

[https://dmitripavlutin.com/react-useeffect-explanation/](https://dmitripavlutin.com/react-useeffect-explanation/)

[https://kjwsx23.tistory.com/523](https://kjwsx23.tistory.com/523)
