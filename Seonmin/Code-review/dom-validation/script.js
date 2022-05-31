const userInput = document.querySelector('#username');
const successMessage = document.querySelector('.success-message');
const failureMessage = document.querySelector('.failure-message');

const inputPassword = document.querySelector('#password');
const inputPasswordRetype = document.querySelector('#password-retype');
const mismatchMessage = document.querySelector('.mismatch-message');
const matchMessage = document.querySelector('.match-message');

const signUpButton = document.querySelector('#login-button');

const phoneNumber = document.querySelector('.phoneNumber');

const certifiButton = document.querySelector('#certifiButton');
const certifiNumber = document.querySelector('.certifiNumber');

const fieldset = document.querySelectorAll('fieldset');
const h1 = document.querySelector('h1');
const img = document.querySelector('img');
const name = document.querySelector('#nickname');

const musthaveMsg = document.querySelectorAll('.musthaveMessage');

//한칸이라도 비어있으면 안내문구 뜨게 하기 (유효성검사)

function musthaveMsgHandler(input) {
  input.value === '';
}

signUpButton.onclick = function () {
  if (musthaveMsgHandler(userInput)) {
    musthaveMsg.classList.remove('hide');
  } else {
    musthaveMsg.classList.add('hide');
  }
};

//회원가입 버튼 클릭시 환영문구 및 배경사진 전환
signUpButton.addEventListener('click', welcomeHandler);
function welcomeHandler() {
  fieldset.forEach.call(fieldset, function (node) {
    node.parentNode.removeChild(node);
  });
  h1.textContent = name.value + '님 가입을 축하합니다!';
  img.setAttribute('src', '배경화면2.jpeg');
}

// 전화번호 인증 버튼 활성화, 비활성화
certifiButton.disabled = true;
phoneNumber.addEventListener('change', certifiHandle);
function certifiHandle() {
  if (phoneNumber.value === '') {
    certifiButton.disabled = true;
  } else {
    certifiButton.disabled = false;
  }
}

// 회원가입 버튼 활성화, 비활성화
signUpButton.disabled = true;
certifiNumber.addEventListener('keyup', signupHandle);
function signupHandle() {
  if (certifiNumber.value === '') {
    signUpButton.disabled = true;
  } else {
    signUpButton.disabled = false;
  }
}

// 비밀번호 4자리 이상 유효성 검사
function isMoreThan4Length(value) {
  return value.length >= 4;
}

userInput.onkeyup = function () {
  if (isMoreThan4Length(userInput.value)) {
    successMessage.classList.remove('hide');
    failureMessage.classList.add('hide');
  } else {
    successMessage.classList.add('hide');
    failureMessage.classList.remove('hide');
  }
};

// 비밀번호 일치 여부 유효성 검사
function isMatch(password1, password2) {
  return password1 === password2;
}

inputPasswordRetype.onkeyup = function () {
  if (isMatch(inputPassword.value, inputPasswordRetype.value)) {
    mismatchMessage.classList.add('hide');
    matchMessage.classList.remove('hide');
  } else {
    mismatchMessage.classList.remove('hide');
    matchMessage.classList.add('hide');
  }
};
