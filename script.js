let stepNo = 0;
let planNo = 0;
let addOnNo = 0;
let timeSpan;

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

let arcadePrice = document.getElementsByClassName("plan__option--price")[0];
let advancedPrice = document.getElementsByClassName("plan__option--price")[1];
let proPrice = document.getElementsByClassName("plan__option--price")[2];
let trialContainer = document.getElementsByClassName("plan__option--trial");

const toggleCont = document.getElementsByClassName(
  "plan__toggle-box--toggle"
)[0];
const payToggle = document.getElementsByClassName(
  "plan__toggle-box--checkbox"
)[0];

const addOns = document.getElementsByClassName("add-ons__control");
const addOnsName = document.getElementsByClassName("add-ons__control--type");
const addOnsCheck = document.getElementsByClassName(
  "add-ons__control--checkbox"
);
const addOnsPrice = document.getElementsByClassName("add-ons__control--price");

let onlinePrice = document.getElementsByClassName("add-ons__control--price")[0];
let storagePrice = document.getElementsByClassName(
  "add-ons__control--price"
)[1];
let profilePrice = document.getElementsByClassName(
  "add-ons__control--price"
)[2];

const planName = document.getElementsByClassName("plan__option--name");
const chosenPlanPrice = document.getElementsByClassName("plan__option--price");

let selectedPlanName = document.getElementsByClassName("plan-name")[0];
let selectedPlanPrice = document.getElementsByClassName("plan-price")[0];

let selectedAddOnName = document.getElementsByClassName("add-on-name");
let selectedAddOnPrice = document.getElementsByClassName("add-on-price");

let orderedAddOns = document.getElementsByClassName(
  "confirmation__orders--add-ons"
)[0];

let totalPerSpan = document.getElementsByClassName(
  "confirmation__total--heading"
)[0];

let grandTotal = document.getElementsByClassName(
  "confirmation__total--price"
)[0];

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

function setBorderColor(no) {
  plans[no].style.borderStyle = "solid";
  plans[no].style.borderColor = "black";
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

function setPrices(period) {
  let zero;
  let trialOffer;
  if (period === "yr") {
    timeSpan = "yr"
    zero = "0";
    trialOffer = "2 months free";
    for (let x = 0; x < selectedAddOnPrice.length; x++) {
      selectedAddOnPrice[x].innerHTML =
        selectedAddOnPrice[x].innerHTML.slice(0, 3) +
        zero +
        selectedAddOnPrice[x].innerHTML.slice(3, 4) +
        period;
    }
  } else {
    timeSpan = "mo"
    zero = "";
    trialOffer = "&nbsp";
    for (let x = 0; x < selectedAddOnPrice.length; x++) {
      selectedAddOnPrice[x].innerHTML =
        selectedAddOnPrice[x].innerHTML.slice(0, 3) +
        selectedAddOnPrice[x].innerHTML.slice(4, 5) +
        period;
    }
  }
  arcadePrice.innerHTML = `$9${zero}/${period}`;
  advancedPrice.innerHTML = `$12${zero}/${period}`;
  proPrice.innerHTML = `$15${zero}/${period}`;
  onlinePrice.innerHTML = `+$1${zero}/${period}`;
  storagePrice.innerHTML = `+$2${zero}/${period}`;
  profilePrice.innerHTML = `+$2${zero}/${period}`;

  Object.keys(trialContainer).forEach((trial) => {
    trialContainer[trial].innerHTML = trialOffer;
  });
}

function addOnInfo(className) {
  const addOnName = document.createElement("h4");
  addOnName.className = className;
  return addOnName;
}

function setCustomerOrder(period) {
  totalPerSpan.innerHTML = `Total (per ${period})`;
  selectedPlanPrice.innerHTML = chosenPlanPrice[planNo].innerHTML;
  selectedAddOnPrice.innerHTML = addOnsPrice[addOnNo].innerHTML;
}

function setInteger(int) {
  if (int.innerHTML.includes("+")) {
    if (int.innerHTML.length < 7) {
      int = int.innerHTML.slice(2, 3);
    } else if (int.innerHTML.length >= 7) {
      int = int.innerHTML.slice(2, 4);
    }
  } else if (!int.innerHTML.includes("+")) {
    if (int.innerHTML.length < 7 && int.innerHTML.length > 5) {
      int = int.innerHTML.slice(1, 3);
    } else if (int.innerHTML.length >= 7) {
      int = int.innerHTML.slice(1, 4);
    } else if (int.innerHTML.length <= 5) {
      int = int.innerHTML.slice(1, 2);
    }
  }
  parseInt(int);
  return int;
}

function calcTotal() {
  const intPlanPrice = setInteger(selectedPlanPrice);
  let addOnPrices = [];
  let totalPrice;
  let totalAddonPrices = 0
  for (let x = 0; x < selectedAddOnPrice.length; x++) {
    addOnPrices = [...addOnPrices, setInteger(selectedAddOnPrice[x])];
    totalAddonPrices += parseInt(addOnPrices[x]);
  }
  if (totalAddonPrices !== 0){
    console.log(addOnPrices.length)
    totalPrice = parseInt(intPlanPrice) + totalAddonPrices 
  } else {
    totalPrice = parseInt(intPlanPrice)
  } 

  return totalPrice
}

nextStep.onclick = () => {
  stepIncrement(1);
  if (stepNo === 3) {
    grandTotal.innerHTML = `+$${calcTotal()}/${timeSpan}`;
  }
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

Object.keys(plans).forEach((plan) => {
  plans[plan].onclick = () => {
    removeBorder();
    setBorderColor(plan);
    planNo = plan;
    selectedPlanName.innerHTML = planName[plan].innerHTML;
    selectedPlanPrice.innerHTML = chosenPlanPrice[plan].innerHTML;
  };
});

payToggle.onclick = () => {
  if (!payToggle.checked) {
    setPrices("mo");
    setCustomerOrder("month");
  } else {
    setPrices("yr");
    setCustomerOrder("year");
  }
};

Object.keys(addOnsCheck).forEach((check) => {
  const addOnContainer = document.createElement("div");
  addOnContainer.className = "confirmation__orders--add-on";
  let newAddOnName = addOnInfo("add-on-name");
  let newAddOnPrice = addOnInfo("add-on-price");
  addOnsCheck[check].onclick = () => {
    if (addOnsCheck[check].checked) {
      newAddOnName.innerHTML = addOnsName[check].innerHTML;
      newAddOnPrice.innerHTML = addOnsPrice[check].innerHTML;
      orderedAddOns.appendChild(addOnContainer);
      addOnContainer.appendChild(newAddOnName);
      addOnContainer.appendChild(newAddOnPrice);
      addOnNo = check;
      addOns[check].style.borderColor = "white";
    } else {
      addOns[check].style.borderColor = "black";
      addOnContainer.remove();
    }
  };
});
