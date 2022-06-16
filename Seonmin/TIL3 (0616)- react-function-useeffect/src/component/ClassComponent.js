import React, { Component } from 'react';

export default class ClassComponent extends Component {
  // Lifecycle Methods 생명주기

  componentDidMount() {
    // 컴포넌트가 DOM 트리에 추가된 직후 실행되는 함수입니다.
    // 😃(FunctionalComponent에서 [] 빈배열과 비슷함)
  }

  componentDidUpdate() {
    // 해당 함수는 최초 렌더링 이후에는 호출되지 않으며, 갱신이 이루어진 직후에 호출됩니다.
    // 컴포넌트가 갱신되었을 때 DOM조작을 수행하기 적합하며, props의 변경에 따른 AJAX를 수행하기에 좋습니다.
    // 😃(FunctionalComponent에서 [특정값] 넣은 것과 비슷함)
  }

  componentWillUnmount() {
    // 해당 함수는 컴포넌트가 DOM트리에서 제거되기 직전에 호출됩니다.
    // 타이머 제거, 네트워크 요청 취소, 구독 해제 등 컴포넌트 정리 작업을 수행하기에 적합합니다.
  }

  // 생성 및 마운트
  // constructor()
  // getDerivedStateFromProps()
  // componentWillMount()
  // componentDidMount()

  // 업데이트
  // getDerivedStateFromProps()
  // componentWillReceivePropsshouldComponentUpdate()
  // componentWillUpdate()
  // render()
  // getSnapshotBeforeUpdate()
  // componentDidUpdate()

  // 마운트 해제
  // componentWillUnmount()

  // 오류 처리
  // getDerivedStateFromError()
  // componentDidCatch()

  render() {
    return <div></div>;
  }
}
