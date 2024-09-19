import {
  changeTempsToCelsius,
  updateSearchLoading,
  changeTempsToFahrenheit,
  highlightTempSelection,
  setInitTemps,
} from "./domManipulation";
import { getWeatherData } from "../utils/apiCalls";
import { tempCelsius } from "../utils/localStorage";
// function to submit location and get data back
const submitLocation = function () {
  let input = document.getElementById("location");
  let submitButton = document.getElementById("submit-location");
  submitButton.addEventListener("click", () => {
    updateSearchLoading();
    getWeatherData(input.value);
    setInitTemps();
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateSearchLoading();
      getWeatherData(input.value);
      setInitTemps();
    }
  });
};

function celsiusButton() {
  const celsiusButton = document.getElementById("celsius-unit");
  celsiusButton.addEventListener("click", () => {
    if (!tempCelsius()) {
      localStorage.setItem("temperature", "celsius");
      changeTempsToCelsius();
      highlightTempSelection();
    }
  });
}

function fahrenheitButton() {
  const fahrenheitButton = document.getElementById("fahrenheit-unit");
  fahrenheitButton.addEventListener("click", () => {
    if (tempCelsius()) {
      localStorage.setItem("temperature", "fahrenheit");
      changeTempsToFahrenheit();
      highlightTempSelection();
    }
  });
}

function recallLocation() {
  if (localStorage.getItem("location")) {
    updateSearchLoading();
    getWeatherData(localStorage.getItem("location"));
    setInitTemps();
  }
}
export { submitLocation, celsiusButton, fahrenheitButton, recallLocation };
