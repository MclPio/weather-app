import { updateSearchLoading } from "./domManipulation";
import { getWeatherData } from "../utils/apiCalls";
// function to submit location and get data back
const submitLocation = (function () {
  let input = document.getElementById("location");
  let submitButton = document.getElementById("submit-location");
  submitButton.addEventListener("click", () => {
    updateSearchLoading();
    getWeatherData(input.value);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateSearchLoading();
      getWeatherData(input.value);
    }
  });
})();

export { submitLocation };
