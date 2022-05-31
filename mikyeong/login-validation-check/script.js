const userName = document.querySelector("#userName");
const userPassword = document.querySelector("#password");
const userRePassword = document.querySelector("#password-retype");
const submit = document.querySelector("#submit");
const input = document.querySelector("input");
const isCorrect = {
  userName: false,
  userPassword: false,
  userRePassword: false,
};

// 정규표현식 : 아이디
const regExpId = (value) => {
  return /^[a-z0-9][a-z0-9]{5,20}$/.test(value);
};

// 정규표현식 : 비밀번호
const regExpPw = (value) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(
    value
  );
};

// 아이디 패턴에 따라 메세지 표시
const isCorrectId = () => {
  const successMsg = document.querySelector(".id-success-msg");
  const failureMsg = document.querySelector(".id-failure-msg");

  if (regExpId(userName.value)) {
    successMsg.classList.remove("hide");
    failureMsg.classList.add("hide");
    isCorrect.userName = true;
  } else {
    successMsg.classList.add("hide");
    failureMsg.classList.remove("hide");
    isCorrect.userName = false;
  }
};

// 비밀번호 패턴에 따라 메세지 표시
const isCorrectPw = () => {
  const mismatchMsg = document.querySelector(".pw-mismatch-msg");
  if (regExpPw(userPassword.value)) {
    mismatchMsg.classList.add("hide");
    isCorrect.userPassword = true;
  } else {
    mismatchMsg.classList.remove("hide");
    isCorrect.userPassword = false;
  }
};

// 비밀번호 재확인 시 메세지 표시
const isRecorrectPw = () => {
  const mismatchMsg = document.querySelector(".rePw-mismatch-msg");
  if (userPassword.value === userRePassword.value) {
    mismatchMsg.classList.add("hide");
    isCorrect.userRePassword = true;
  } else {
    mismatchMsg.classList.remove("hide");
    isCorrect.userRePassword = false;
  }
};

// 회원가입 조건 확인
const joinCondition = (obj) => {
  for (const value of Object.values(obj)) {
    if (!value) {
      return false;
    }
  }
  return true;
};

// 회원가입 버튼 클릭
const join = () => {
  const modal = document.querySelector(".modal__container");
  const modalContent = modal.querySelector(".modal__content");
  let msg = `${userName.value}님,\r\n 스터디 semantic의\r\n 회원가입을 축하드립니다!`;

  if (joinCondition(isCorrect)) {
    modal.classList.remove("hide");
    modalContent.textContent = msg;
  } else {
    modal.classList.add("hide");
    const failureMsg = document.querySelectorAll(".failure");
    for (const msg of failureMsg) {
      msg.classList.remove("hide");
    }
  }
};

userName.addEventListener("keyup", isCorrectId);
userPassword.addEventListener("keyup", isCorrectPw);
userRePassword.addEventListener("keyup", isRecorrectPw);
submit.addEventListener("click", join);
