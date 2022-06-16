console.log("확인");

let elInputUsername = document.querySelector("#username");

let elFailureMessage = document.querySelector(".failure-message");
let elSuccessMessage = document.querySelector(".success-message");

elInputUsername.onkeyup = function () {
  console.log(elInputUsername.value);
  if (isMoreThanLength(elInputUsername.value)) {
    //성공 메세지 보여야함
    elSuccessMessage.classList.remove("hide");

    //실패 메세지가 가려져야함
    elFailureMessage.classList.add("hide");
  } else {
    elSuccessMessage.classList.add("hide");
    elFailureMessage.classList.remove("hide");
  }
};

function isMoreThanLength(value) {
  return value.length >= 4;
}
