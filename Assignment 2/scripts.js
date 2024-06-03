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

  // Select and remove specific div elements
  const divToRemove1 = document.getElementById("purple");
  if (divToRemove1) {
    removedDivs.push(divToRemove1); // Store the removed div
    divToRemove1.remove();
  }
  const divToRemove2 = document.getElementById("blue");
  if (divToRemove2) {
    removedDivs.push(divToRemove2); // Store the removed div
    divToRemove2.remove();
  }
};

const disableLightMode = () => {
  document.body.classList.remove("light-mode");

  // Re-add the stored divs back to the DOM
  removedDivs.forEach((div) => document.body.appendChild(div));
  removedDivs = []; // Clear the array after re-adding the divs
};
