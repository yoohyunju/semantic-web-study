// 동영상 강의에 나온 코드를 그대로 실습하세요
// TODO : DOM으로부터 필요한 엘리먼트를 불러오세요.
//import {onlyNumberAndEnglish, strongPassword} from './validator.js'

const inputUsername = document.querySelector('#username');
const successUsername = document.querySelector('.success-message');
const failureUsername = document.querySelector('.failure-message');
const inputPassword = document.querySelector('#password');
const inputPasswordCheck = document.querySelector('#password-retype');
const failurePasswordMsg = document.querySelector('.mismatch-message');

function isMoreThan4Length(value) {
  // TODO : 동영상 강의를 보고 이 함수를 완성하세요.
  if(value.length >= 4){
    // successUsername.classList.remove('hide');
    // failureUsername.classList.add('hide');
    showMsg(failureUsername, successUsername, 'hide');
    // inputUsername.classList.add('border-blue');
    // inputUsername.classList.remove('border-red');
    changeBorderColor(inputUsername, 'border-blue', 'border-red');

  }else {
    // successUsername.classList.add('hide');
    // failureUsername.classList.remove('hide');
    showMsg(successUsername, failureUsername, 'hide');
    // inputUsername.classList.add('border-red');
    // inputUsername.classList.remove('border-blue');
    changeBorderColor(inputUsername, 'border-red', 'border-blue');
  }
}

function isMatch (password1, password2) {
  // TODO : 동영상 강의를 보고 이 함수를 완성하세요.
  // 문자열 2개를 입력받고 boolean타입(true or false) 리턴
  // 일치 여부에 따른 시각적 피드백 제공
  // 비밀번호 확인 창에 keyup 이벤트 핸들러 존재해야 함
  // 비밀번호 확인창 값과 비밀번호 값이 서로 일치하는 경우 메시지가 더이상 보이지 않아야 함
  // 일치하지 않는 경우 불일치 메시지 표시
  if(password1 === password2){
    failurePasswordMsg.classList.add('hide');
    changeBorderColor(inputPasswordCheck, 'border-blue', 'border-red');
    return true;
  }else {
    failurePasswordMsg.classList.remove('hide');
    changeBorderColor(inputPasswordCheck, 'border-red', 'border-blue');
    return false;
  }
}

function showMsg (addSelector, removeSelector, className) {
  addSelector.classList.add(className);
  removeSelector.classList.remove(className);
}

function changeBorderColor (selector, addClassName, removeClassName) {
  selector.classList.add(addClassName);
  selector.classList.remove(removeClassName);
}

inputUsername.onkeyup = () => {
  console.log(inputUsername.value);
  // 만약 value의 길이가 4이상이면 success-message를 보이게 해준다. (실패 메시지 가려야함)
  // 그렇지 않으면 성공 메시지를 가리고 failure-message를 보이게 해준다.
  isMoreThan4Length(inputUsername.value);
}

inputPasswordCheck.onkeyup = () => {
  isMatch(inputPassword.value, inputPasswordCheck.value);
}