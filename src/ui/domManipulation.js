import {
  weatherNow,
  weatherHourly,
  weatherDaily,
} from "../logic/dataProcessing";

import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  getFormattedHour,
  iconURL,
} from "../helpers";

import { tempCelsius } from "../utils/localStorage";

function removeHidden() {
  const hiddenDivs = document.querySelectorAll(".hidden");
  for (let i = 0; i < hiddenDivs.length; i++) {
    hiddenDivs[i].classList.remove("hidden");
  }
}

function displayNowForecast(data) {
  const tempNow = document.getElementById("temp-now");
  const tempMaxNow = document.getElementById("tempmax-now");
  const tempMinNow = document.getElementById("tempmin-now");
  const conditionsNow = document.getElementById("conditions-now");
  const feelsLikeNow = document.getElementById("feelslike-now");
  const locationField = document.getElementById("location");
  const tempNowIcon = document.getElementById("temp-now-icon");
  const background = document.getElementById("background-image");
  const weatherObj = weatherNow(data);

  tempNow.innerText = Math.round(weatherObj.temp);
  tempMaxNow.innerText = Math.round(weatherObj.tempmax);
  tempMinNow.innerText = Math.round(weatherObj.tempmin);
  conditionsNow.innerText = weatherObj.conditions;
  feelsLikeNow.innerText = Math.round(weatherObj.feelslike);
  locationField.value = weatherObj.address;
  tempNowIcon.src = iconURL(weatherObj.icon);
  tempNowIcon.alt = weatherObj.icon;
  background.classList.add(weatherObj.icon);
  removeHidden();
}

function displayHourlyForecast(data) {
  const weatherObj = weatherHourly(data);
  const hourlyForecast = document.getElementById("hourly-forecast"); // find bulma css for the hourly forecast scroll
  const columns = document.getElementById("hourly-forecast-columns");
  columns.innerHTML = "";
  for (let i in weatherObj) {
    const icon = weatherObj[i].icon;
    const iconContainer = document.createElement("span");
    iconContainer.classList = "icon";

    const node = document.createElement("div");
    node.classList =
      "hour-node column is-one-fifth is-flex is-flex-direction-column is-align-items-center"; // column classes
    const temp = document.createElement("div");
    temp.classList = "temp mb-4";
    const time = document.createElement("div");
    const img = document.createElement("img");
    img.classList = "mb-2";

    temp.innerText = Math.round(weatherObj[i].temp);
    time.innerText = getFormattedHour(weatherObj[i].datetime);
    img.src = iconURL(icon);
    img.alt = icon;
    iconContainer.append(img);
    node.append(temp, iconContainer, time);
    columns.append(node);
    hourlyForecast.append(columns);
  }
}

function displayDailyForecast(data) {
  const days = weatherDaily(data);
  let dailyForecast = document.getElementById("daily-forecast");
  dailyForecast.innerHTML = "";
  for (let i in days) {
    const node = document.createElement("div");
    node.classList = "daily-forecast-item level is-mobile box";
    const datetime = document.createElement("div");
    datetime.classList = "level-item";
    const conditions = document.createElement("div");
    const tempmax = document.createElement("div");
    const tempmin = document.createElement("div");
    const icon = days[i].icon;
    const iconContainer = document.createElement("span");
    const tempContainer = document.createElement("div");
    tempContainer.classList =
      "is-flex is-flex-direction-row is-align-items-center level-item";
    iconContainer.classList = "level-item";
    const img = document.createElement("img");
    img.src = iconURL(icon);
    img.alt = icon;
    img.classList = "icon";
    iconContainer.append(img);

    tempmax.classList = "temp";
    tempmin.classList = "temp temp-min";
    tempContainer.append(tempmax, tempmin);
    datetime.innerText = days[i].datetime;
    conditions.innerText = days[i].conditions;
    tempmax.innerText = Math.round(days[i].tempmax);
    tempmin.innerText = Math.round(days[i].tempmin);
    node.append(datetime, iconContainer, tempContainer);
    dailyForecast.append(node);
  }
}

function updateSearchLoading() {
  const input = document.getElementById("location");
  if (input.parentElement.classList.contains("is-loading")) {
    input.parentElement.classList = "control has-icons-left";
  } else {
    input.parentElement.classList = "control has-icons-left is-loading";
  }
}

function highlightTempSelection() {
  const celsiusButton = document.getElementById("celsius-unit");
  const fahrenheitButton = document.getElementById("fahrenheit-unit");
  celsiusButton.classList.remove("is-primary");
  fahrenheitButton.classList.remove("is-primary");
  if (tempCelsius()) {
    celsiusButton.classList.add("is-primary");
  } else {
    fahrenheitButton.classList.add("is-primary");
  }
}

function changeTempsToCelsius() {
  let temperatures = document.querySelectorAll(".temp");
  for (let i = 0; i < temperatures.length; i++) {
    temperatures[i].innerText = fahrenheitToCelsius(temperatures[i].innerText);
  }
}

function changeTempsToFahrenheit() {
  let temperatures = document.querySelectorAll(".temp");
  for (let i = 0; i < temperatures.length; i++) {
    temperatures[i].innerText = celsiusToFahrenheit(temperatures[i].innerText);
  }
}

function setInitTemps() {
  if (!tempCelsius()) {
    console.log("HELLO?");
    changeTempsToFahrenheit();
  }
}

export {
  removeHidden,
  displayNowForecast,
  displayHourlyForecast,
  displayDailyForecast,
  updateSearchLoading,
  highlightTempSelection,
  changeTempsToCelsius,
  changeTempsToFahrenheit,
  setInitTemps,
};
