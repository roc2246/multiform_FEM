let stepNo = 0;

const steps = document.getElementsByClassName("step");

const nextStep = document.getElementsByClassName("btn--next-step")[0];
const prevStep = document.getElementsByClassName("btn--go-back")[0];

function stepIncrement(inc) {
  Object.keys(steps).forEach((step) => {
    steps[step].style.display = "none";
  });
  stepNo += inc;
  if (stepNo === steps.length) stepNo = 0;
  if (stepNo < 0) stepNo = steps.length - 1;
  steps[stepNo].style.display = "block";
}

nextStep.onclick = () => {
  stepIncrement(1);
};

prevStep.onclick = () => {
  stepIncrement(-1);
};
