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

let arcadePrice = document.getElementsByClassName("plan__option--price")[0]
let advancedPrice = document.getElementsByClassName("plan__option--price")[1]
let proPrice = document.getElementsByClassName("plan__option--price")[2]
let trial = document.getElementsByClassName("plan__option--trial")


const toggleCont = document.getElementsByClassName("plan__toggle-box--toggle")[0]
const payToggle = document.getElementsByClassName("plan__toggle-box--checkbox")[0]

const addOns = document.getElementsByClassName("add-ons__control")
const addOnsCheck= document.getElementsByClassName("add-ons__control--checkbox")

let onlinePrice = document.getElementsByClassName("add-ons__control--price")[0]
let storagePrice = document.getElementsByClassName("add-ons__control--price")[1]
let profilePrice = document.getElementsByClassName("add-ons__control--price")[2]

const planName = document.getElementsByClassName("plan__option--name")
const chosenPlanPrice = document.getElementsByClassName("plan__option--price")

let selectedPlanName = document.getElementsByClassName("plan-name")[0]
let selectedPlanPrice = document.getElementsByClassName("plan-price")[0]

let totalPerSpan = document.getElementsByClassName("confirmation__total--heading")[0]

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

let planNo = 0
Object.keys(plans).forEach((plan => {
  plans[plan].onclick = () => {
    removeBorder();
    setBorderColor(plan)
    planNo = plan
    selectedPlanName.innerHTML = planName[plan].innerHTML
    selectedPlanPrice.innerHTML = chosenPlanPrice[plan].innerHTML
  };
}))

payToggle.onclick = () => {
  if(!payToggle.checked) {
    arcadePrice.innerHTML = "$9/mo"
    advancedPrice.innerHTML = "$12/mo"
    proPrice.innerHTML = "$15/mo"
    onlinePrice.innerHTML = "+$1/mo"
    storagePrice.innerHTML = "+$2/mo"
    profilePrice.innerHTML = "+$2/mo"
    totalPerSpan.innerHTML = "Total (per month)"
    selectedPlanPrice.innerHTML = chosenPlanPrice[planNo].innerHTML
    Object.keys(trial).forEach((plan) => {
      trial[plan].innerHTML = "&nbsp"
    })
  } else {
    arcadePrice.innerHTML = "$90/yr"
    advancedPrice.innerHTML = "$120/yr"
    proPrice.innerHTML = "$150/yr"
    onlinePrice.innerHTML = "+$10/mo"
    storagePrice.innerHTML = "+$20/yr"
    profilePrice.innerHTML = "+$20/yr"
    totalPerSpan.innerHTML = "Total (per year)"
    selectedPlanPrice.innerHTML = chosenPlanPrice[planNo].innerHTML
    Object.keys(trial).forEach((plan) => {
      trial[plan].innerHTML = "2 months free"
    })
  }
}

Object.keys(addOnsCheck).forEach((check) => {
  addOnsCheck[check].onclick = () => {
    if(addOnsCheck[check].checked) {
      addOns[check].style.borderColor = "white"
    } else {
      addOns[check].style.borderColor = "black"
    }
  }
})


