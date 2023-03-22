let stepNo = 0;

const steps = document.getElementsByClassName("step");

const nextStep = document.getElementsByClassName("btn--next-step")[0];
const prevStep = document.getElementsByClassName("btn--go-back")[0];
const confirmBtn = document.getElementsByClassName("btn--confirmBtn")[0]

function hideSteps () {
    Object.keys(steps).forEach((step) => {
        steps[step].style.display = "none";
      });
}

function btnMgmt () {
    if (stepNo === steps.length - 2) {
        nextStep.style.display = "none"
        confirmBtn.style.display = "inline-block"
    } else {
        nextStep.style.display = "inline-block"
        confirmBtn.style.display = "none"
    }

    if(stepNo === 0) prevStep.style.display = "none"
}

function stepIncrement(inc) {
  hideSteps()
  stepNo += inc;
  prevStep.style.display = "inline-block"
  if (stepNo === steps.length) stepNo = 0;
  if (stepNo < 0) prevStep.style.display = "none";
  steps[stepNo].style.display = "block";
  btnMgmt()
}

nextStep.onclick = () => {
  stepIncrement(1);
};

prevStep.onclick = () => {
  stepIncrement(-1);
};

confirmBtn.onclick= () =>{
    hideSteps()
    steps[steps.length - 1].style.display = "flex"
    nextStep.style.display = "none"
    prevStep.style.display = "none"
    confirmBtn.style.display = "none"
}
