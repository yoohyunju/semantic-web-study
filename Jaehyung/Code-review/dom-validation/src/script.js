const userName = document.getElementById('username');
const userPw = document.getElementById('password');
const verifyPw = document.getElementById('password-retype');

const failureMessage = document.querySelector('.failure-message');
const successMessage = document.querySelector('.success-message');
const mismatchMessage = document.querySelector('.mismatch-message');
const submitBtn = document.querySelector('.signup-text');
const loginBtn = document.querySelector('.login-text');
const selectBtn = document.getElementsByClassName('select-btn');

userName.addEventListener('keyup', (v) => {
  const nameValue = v.target.value;
  
  if(isMoreThan4Length(nameValue)) {
    successMessage.classList.remove('hide');
    failureMessage.classList.add('hide');
  }else {
    successMessage.classList.add('hide');
    failureMessage.classList.remove('hide');
  }
});


userPw.addEventListener('keyup', (v) => {
  const value = v.target.value;
  loginBtnStatus(value);
});


// 일치 시 메세지 x, 불일치 시 메세지 o
verifyPw.addEventListener('keyup', (v) => {
  const pwValue = v.target.value;

  if(isMatch(pwValue, userPw.value)) {
    mismatchMessage.classList.add('hide');
    
  }else {
    mismatchMessage.classList.remove('hide');
  }
  submitBtnStatus(checkAllPass(isMatch(pwValue, userPw.value)));
});



const loginBtnStatus = (check) => {
  if(check && loginBtn.classList.contains('non-active')) {
    loginBtn.classList.remove('non-active');
  }else if(!check && !(loginBtn.classList.contains('non-active'))) {
    loginBtn.classList.add('non-active');
  }
};

const submitBtnStatus = (check) => {
  if(check && submitBtn.classList.contains('non-active')) {
    submitBtn.classList.remove('non-active');
  }else if(!check && !(submitBtn.classList.contains('non-active'))) {
    submitBtn.classList.add('non-active');
  }
};

const addSelectEvent = (btn) => {
  for(let i of btn) {
    i.addEventListener('click', (v) => {
      selectClickEvent(v);
    });
  }
};

const selectClickEvent = (ele) => {
  for(let e of selectBtn) {
    e.classList.remove('select-border');
    e.removeAttribute('disabled');
  }
  // console.log(ele.target);

  if(!(ele.target.classList.contains('select-border'))) {
    ele.target.classList.add('select-border');
    ele.target.setAttribute('disabled', 'true');
  }

  if(ele.target.classList.contains('select-signup')) {
    submitBtn.classList.remove('hide');
    loginBtn.classList.add('hide');
    verifyPw.parentNode.parentNode.classList.remove('hide');
  }else {
    submitBtn.classList.add('hide');
    loginBtn.classList.remove('hide');
    verifyPw.parentNode.parentNode.classList.add('hide');
  }

};

const loginCheck = (check) => {
  return isMoreThan4Length(userName.value) && check;
};

const checkAllPass = (match) => {
  return !(successMessage.classList.contains('hide')) && match;
};

function isMoreThan4Length(value) {
  return value.length >= 4;
}

function isMatch (password1, password2) {
  return password1 === password2;
}

addSelectEvent(selectBtn);

// 1. 인증번호
// 2. 언어 선택
// 3. 확인버튼 시 필수요소 UI 추가
// 4. css UI 업데이트
// 5. 로그인 회원가입 따로
// 6. 최종 로그인 확인 창 추가
// 7. SNS 회원가입 추가(해당 사이트 회원가입 url로 이동)
// 8. 최종 체크박스 추가