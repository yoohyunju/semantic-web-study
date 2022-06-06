// 동영상 강의에 나온 코드를 그대로 실습하세요
// TODO : DOM으로부터 필요한 엘리먼트를 불러오세요.
let username = document.querySelector('#username')
let successMessage = document.querySelector('.success-message')
let failureMessage = document.querySelector('.failure-message')
let password = document.querySelector('#password')
let password_retype = document.querySelector('#password-retype')
let mismatch_message = document.querySelector('.mismatch-message')


username.onkeyup = function() {
  //아이디의 길이가 4이상이면
  if(isMoreThan4Length(username.value)) {
    //성공메시지를 출력해야한다.
    successMessage.classList.remove('hide')
    //실패메시지를 삭제해야한다.
    failureMessage.classList.add('hide')
  }
  else if(isMoreThan4Length(username.value) === 0) {
    failureMessage.classList.add('hide')
    successMessage.classList.add('hide')

  }
  else {
    //성공메시지를 삭제해야한다.
    successMessage.classList.add('hide')
    //실패메시지를 출력해야한다.
    failureMessage.classList.remove('hide')
  }
}

password_retype.onkeyup = function() {
  //만약 비밀번호가 일치한다면 실패메시지를 삭제
  if(isMatch(password.value, password_retype.value)) {
    mismatch_message.classList.add('hide')
  }
  else {
    //실패메시지를 출력해야한다.
    mismatch_message.classList.remove('hide')
  }

}

function isMoreThan4Length(value) {
  if(value.length >= 4) {
    return true;
  }
  else if(value.length === 0) {
    return 0;
  }
  else {
    return false;
  }
}

function isMatch (password1, password2) {
  // TODO : 동영상 강의를 보고 이 함수를 완성하세요.
  //password1 === password2 -> true
  return password1 === password2;
  
  //password1 !== password2 -> false
 }
