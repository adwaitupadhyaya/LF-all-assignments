let lightModeEnabled = true;
let removedDivs = [];

const lightModeButton = document.getElementById("lightModeButton");

lightModeButton.addEventListener("click", () => {
  lightModeEnabled = !lightModeEnabled;

  if (lightModeEnabled) {
    enableLightMode();
  } else {
    disableLightMode();
  }
});

const enableLightMode = () => {
  document.body.classList.add("light-mode");

  const divsWithTextColor = document.querySelectorAll(".change-text-color");
  divsWithTextColor.forEach((div) => div.classList.add("dark-text-color"));
  const divsWithBgColor = document.querySelectorAll(".change-bg-color");
  divsWithBgColor.forEach((div) => div.classList.add("dark-bg-color"));
};

const disableLightMode = () => {
  document.body.classList.remove("light-mode");

  const divsWithTextColor = document.querySelectorAll(".change-text-color");
  divsWithTextColor.forEach((div) => div.classList.remove("dark-text-color"));

  const divsWithBgColor = document.querySelectorAll(".change-bg-color");
  divsWithBgColor.forEach((div) => div.classList.remove("dark-bg-color"));
};
