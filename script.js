let stepNo = 0;

const steps = document.getElementsByClassName("step");

const nextStep = document.getElementsByClassName("btn--next-step")[0];
const prevStep = document.getElementsByClassName("btn--go-back")[0];
const confirmBtn = document.getElementsByClassName("btn--confirm")[0];

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const checkName = /^(?!\s*$).+/;
const checkEmail =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const checkPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const plans = document.getElementsByClassName("plan__option");

function hideSteps() {
  Object.keys(steps).forEach((step) => {
    steps[step].style.display = "none";
  });
}

function removeBorder() {
  Object.keys(plans).forEach((plan) => {
    plans[plan].style.borderStyle = "none";
  });
}

function setBorderColor(no){
  plans[no].style.borderStyle = "solid"
  plans[no].style.borderColor = "black"
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
  const numbers = obj.value.replace(/\D/g, "");
  const char = { 0: "(", 3: ") ", 6: "-" };
  obj.value = "";
  Object.keys(numbers).forEach((number) => {
    obj.value += (char[number] || "") + numbers[number];
  });
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


Object.keys(plans).forEach((plan => {
  plans[plan].onclick = () => {
    removeBorder();
    setBorderColor(plan)
  };
}))


