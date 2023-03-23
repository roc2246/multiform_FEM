let stepNo = 0;

const steps = document.getElementsByClassName("step");

const nextStep = document.getElementsByClassName("btn--next-step")[0];
const prevStep = document.getElementsByClassName("btn--go-back")[0];
const confirmBtn = document.getElementsByClassName("btn--confirm")[0];

const nameInput = document.getElementsByClassName(
  "personal-info__controls--input"
)[0];
const emailInput = document.getElementsByClassName(
  "personal-info__controls--input"
)[1];
const phoneInput = document.getElementsByClassName(
  "personal-info__controls--input"
)[2];

const checkName = /^(?!\s*$).+/;
const checkEmail =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const checkPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

function hideSteps() {
  Object.keys(steps).forEach((step) => {
    steps[step].style.display = "none";
  });
}

function btnMgmt() {
  if (stepNo === steps.length - 2) {
    nextStep.style.display = "none";
    confirmBtn.style.display = "inline-block";
  } else {
    nextStep.style.display = "inline-block";
    confirmBtn.style.display = "none";
  }

  if (stepNo === 0) {
    prevStep.style.display = "none";
  } else {
    prevStep.style.display = "inline-block";
  }
}

function verify(regex, input) {
  if (!regex.test(input.value)) {
    input.value = "";
    input.focus();
  }
}

function formatPhone(obj) {
  var numbers = obj.value.replace(/\D/g, ""),
    char = { 0: "(", 3: ") ", 6: "-" };
  obj.value = "";
  for (var i = 0; i < numbers.length; i++) {
    obj.value += (char[i] || "") + numbers[i];
  }
}

phoneInput.addEventListener("keyup", () => {
  formatPhone(phoneInput);
});

function stepIncrement(inc) {
  if (
    checkName.test(nameInput.value) &&
    checkEmail.test(emailInput.value) &&
    checkPhone.test(phoneInput.value)
  ) {
    hideSteps();
    stepNo += inc;
    steps[stepNo].style.display = "block";
    btnMgmt();
  }

  verify(checkName, nameInput);
  verify(checkEmail, emailInput);
  verify(checkPhone, phoneInput);
}

nextStep.onclick = () => {
  stepIncrement(1);
};

prevStep.onclick = () => {
  stepIncrement(-1);
};

confirmBtn.onclick = () => {
  hideSteps();
  steps[steps.length - 1].style.display = "flex";
  nextStep.style.display = "none";
  prevStep.style.display = "none";
  confirmBtn.style.display = "none";
};
