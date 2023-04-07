let stepNo = 0;
let planNo = 0;
let addOnNo = 0;
let timeSpan = "mo";
let payPeriod = "Monthly";

const steps = document.getElementsByClassName("step");

const nextStep = document.getElementsByClassName("btn--next-step")[0];
const prevStep = document.getElementsByClassName("btn--go-back")[0];
const confirmBtn = document.getElementsByClassName("btn--confirm")[0];

const sidebarStepNo = document.getElementsByClassName("sidebar__step--no");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const errorMssg = document.getElementsByClassName(
  "personal-info__controls--error-mssg"
);

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
const toggleOption = document.getElementsByClassName(
  "plan__toggle-box--option"
);

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

const changeOrder = document.getElementsByClassName("change-plan")[0];

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

function resetStepNoStyle() {
  Object.keys(sidebarStepNo).forEach((no) => {
    sidebarStepNo[no].style.display = "flex";
    sidebarStepNo[no].style.border = "solid";
    sidebarStepNo[no].style.borderRadius = "50%";
    sidebarStepNo[no].style.borderWidth = ".05rem";
    sidebarStepNo[no].style.color = "white";
    sidebarStepNo[no].style.backgroundColor = null;
  });
}

function setStepNoStyle() {
  sidebarStepNo[stepNo].style.backgroundColor = "hsl(206, 94%, 87%)";
  sidebarStepNo[stepNo].style.border = "none";
  sidebarStepNo[stepNo].style.color = "black";
}

function removeBorder() {
  Object.keys(plans).forEach((plan) => {
    plans[plan].style.borderColor = "hsl(206, 94%, 87%)";
    plans[plan].style.backgroundColor = "white";
    plans[plan].onmouseover =() => {
      plans[plan].style.borderColor = "hsl(243, 100%, 62%)";
    }
    plans[plan].onmouseleave =() => {
    plans[plan].style.borderColor = "hsl(206, 94%, 87%)";
    }
  });
}

function setBorderColor(no) {
  plans[no].style.borderStyle = "solid";
  plans[no].style.borderColor = "hsl(243, 100%, 62%)";
  plans[no].style.backgroundColor = "hsl(206, 94%, 87%)";
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

function verify(regex, input, mssgNo) {
  if (!regex.test(input.value)) {
    input.style.borderColor = "hsl(354, 84%, 57%)";
    errorMssg[mssgNo].style.display = "inline";
    input.focus();
  } else {
    errorMssg[mssgNo].style.display = "none";
    input.style.borderColor = "hsl(228, 100%, 84%)";
    input.onmouseover = () => {
      input.style.borderColor = "hsl(243, 100%, 62%)";
    };
    input.onmouseleave = () => {
      input.style.borderColor = "hsl(228, 100%, 84%)";
    };
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
    resetStepNoStyle();
    setStepNoStyle();
    if (stepNo === 1) {
      steps[stepNo].style.display = "grid";
    } else if (stepNo === 0 || stepNo === 3) {
      steps[stepNo].style.display = "block";
    } else if (stepNo === 2) {
      steps[stepNo].style.display = "flex";
    }
    btnMgmt();
  }

  verify(checkName, nameInput, 0);
  verify(checkEmail, emailInput, 1);
  verify(checkPhone, phoneInput, 2);
}

function setPrices(period) {
  let zero;
  if (period === "yr") {
    timeSpan = "yr";
    payPeriod = "Yearly";
    zero = "0";
    Object.keys(trialContainer).forEach((container) => {
      trialContainer[container].style.display = "inline";
    });
    for (let x = 0; x < selectedAddOnPrice.length; x++) {
      selectedAddOnPrice[x].innerHTML =
        selectedAddOnPrice[x].innerHTML.slice(0, 3) +
        zero +
        selectedAddOnPrice[x].innerHTML.slice(3, 4) +
        period;
    }
  } else {
    timeSpan = "mo";
    payPeriod = "Monthly";
    zero = "";
    Object.keys(trialContainer).forEach((container) => {
      trialContainer[container].style.display = "none";
    });
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
  let totalAddonPrices = 0;
  for (let x = 0; x < selectedAddOnPrice.length; x++) {
    addOnPrices = [...addOnPrices, setInteger(selectedAddOnPrice[x])];
    totalAddonPrices += parseInt(addOnPrices[x]);
  }
  if (totalAddonPrices !== 0) {
    totalPrice = parseInt(intPlanPrice) + totalAddonPrices;
  } else {
    totalPrice = parseInt(intPlanPrice);
  }

  return totalPrice;
}

window.onload = () => {
  sidebarStepNo[0].style.backgroundColor = "hsl(206, 94%, 87%)";
  sidebarStepNo[0].style.border = "none";
  sidebarStepNo[0].style.color = "black";
};

nextStep.onclick = () => {
  stepIncrement(1);
  if (stepNo === 3) {
    grandTotal.innerHTML = `+$${calcTotal()}/${timeSpan}`;
    selectedPlanName.innerHTML = `${planName[planNo].innerHTML} (${payPeriod})`;
  }
};

prevStep.onclick = () => {
  stepIncrement(-1);
};

changeOrder.onclick = () => {
  hideSteps();
  stepNo = 1;
  steps[stepNo].style.display = "grid";
  confirmBtn.style.display = "none";
  nextStep.style.display = "inline-block";
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
    plans[planNo].onmouseleave =() => {
      plans[planNo].style.borderColor = "hsl(243, 100%, 62%)";
      }
    selectedPlanName.innerHTML = `${planName[plan].innerHTML} (${payPeriod})`;
    selectedPlanPrice.innerHTML = chosenPlanPrice[plan].innerHTML;
  };
});

payToggle.onclick = () => {
  if (!payToggle.checked) {
    setPrices("mo");
    setCustomerOrder("month");
    toggleOption[0].style.color = "hsl(213, 96%, 18%)";
    toggleOption[1].style.color = "grey";
  } else {
    setPrices("yr");
    setCustomerOrder("year");
    toggleOption[1].style.color = "hsl(213, 96%, 18%)";
    toggleOption[0].style.color = "grey";
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
      addOns[check].style.borderColor = "hsl(243, 100%, 62%)";
    } else {
      addOns[check].style.borderColor = "hsl(206, 94%, 87%)";
      addOnContainer.remove();
    }
  };
});
