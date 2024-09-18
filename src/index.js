import "./css/style.css";
import "material-symbols/outlined.css";
import { submitLocation } from "./ui/eventHandlers";
import { initLocalStorage } from "./utils/localStorage";
initLocalStorage();

let button = document.getElementById("toggle-temp");
button.addEventListener("click", () => {
  if (localStorage.getItem("temperature") === "celsius") {
    localStorage.setItem("temperature", "fahrenheit");
  } else {
    localStorage.setItem("temperature", "celsius");
  }
});
