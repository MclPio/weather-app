function initLocalStorage() {
  if (!localStorage.getItem("temperature")) {
    localStorage.setItem("temperature", "celsius");
  }
}

export { initLocalStorage };
