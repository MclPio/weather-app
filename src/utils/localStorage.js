function initLocalStorage() {
  if (!localStorage.getItem("temperature")) {
    localStorage.setItem("temperature", "celsius");
  }
}

function setLocalStorageFahrenheit() {
  localStorage.setItem("temperature", "fahrenheit");
}

function setLocalStorageCelcius() {
  localStorage.setItem("temperature", "celsius");
}

export { initLocalStorage };
