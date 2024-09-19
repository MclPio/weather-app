function initLocalStorage() {
  if (!localStorage.getItem("temperature")) {
    localStorage.setItem("temperature", "celsius");
  }
}

function tempCelsius() {
  if (localStorage.getItem("temperature") === "celsius") {
    return true;
  } else if (localStorage.getItem("temperature") === "fahrenheit") {
    return false;
  }
}

export { initLocalStorage, tempCelsius };
