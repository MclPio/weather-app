import "./css/style.css";
import weatherData from "../sample.json";
import "material-symbols/outlined.css";

const key = "WH4FQVH3ELQFFL6WF958XB45T";

async function getWeatherData(location) {
  // const response = await fetch(
  //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}`,
  //   {
  //     mode: "cors",
  //   }
  // );
  // const weatherData = await response.json();
  // need to handle erros or else loading bar stays on
  console.log(weatherData);
  displayNowForecast(weatherData);
  displayHourlyForecast(weatherData);
  displayDailyForecast(weatherData);
  updateSearchLoading();
}

function updateSearchLoading() {
  const input = document.getElementById("location");
  if (input.parentElement.classList.contains("is-loading")) {
    input.parentElement.classList = "control has-icons-left";
  } else {
    input.parentElement.classList = "control has-icons-left is-loading";
  }
}
//function to extract now data
// => (temp, high, low, description, feels like)
// chance to use a background image to describe condition...
function weatherNow(data) {
  return {
    temp: data.days[0].temp,
    address: data.resolvedAddress,
    tempmax: data.days[0].tempmax,
    tempmin: data.days[0].tempmin,
    description: data.days[0].description,
    feelslike: data.days[0].feelslike,
    conditions: data.days[0].conditions,
  };
}

// function to extract daily data
// => 10 day forecast (date, condition(where you use img), tempmax, tempmin)
function weatherDaily(data) {
  // Date, condition Image, tempmax, tempmin
  const days = data.days;
  let dailyData = [];
  for (let i in days) {
    dailyData[i] = {
      datetime: days[i].datetime,
      conditions: days[i].conditions,
      tempmax: days[i].tempmax,
      tempmin: days[i].tempmin,
    };
  }
  return dailyData;
}

// function to extract hourly data
// => 24 hour data (timeHour, temp, condition(where you use img))
function weatherHourly(data) {
  const hours = data.days[0].hours;
  let hourlyData = {};
  for (let i in hours) {
    hourlyData[i] = {
      datetime: hours[i].datetime,
      temp: hours[i].temp,
      conditions: hours[i].conditions,
      icon: hours[i].icon,
    };
  }
  return hourlyData;
}

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

function displayNowForecast(data) {
  const tempNow = document.getElementById("temp-now");
  const tempMaxNow = document.getElementById("tempmax-now");
  const tempMinNow = document.getElementById("tempmin-now");
  const conditionsNow = document.getElementById("conditions-now");
  const feelsLikeNow = document.getElementById("feelslike-now");
  const locationField = document.getElementById("location");

  const weatherObj = weatherNow(data);

  tempNow.innerText = Math.round(weatherObj.temp);
  tempMaxNow.innerText = Math.round(weatherObj.tempmax);
  tempMinNow.innerText = Math.round(weatherObj.tempmin);
  conditionsNow.innerText = weatherObj.conditions;
  feelsLikeNow.innerText = Math.round(weatherObj.feelslike);
  locationField.value = weatherObj.address;
  removeHidden();
}

function removeHidden() {
  const hiddenDivs = document.querySelectorAll(".hidden");
  for (let i = 0; i < hiddenDivs.length; i++) {
    hiddenDivs[i].classList.remove("hidden");
  }
}

function displayHourlyForecast(data) {
  const weatherObj = weatherHourly(data);
  const hourlyForecast = document.getElementById("hourly-forecast"); // find bulma css for the hourly forecast scroll

  for (let i in weatherObj) {
    const icon = weatherObj[i].icon;
    const iconContainer = document.createElement("span");
    iconContainer.classList = "icon is-small";

    const node = document.createElement("div");
    node.classList =
      "hour-node is-flex is-flex-direction-column is-justify-content-center"; // find bulma css for the hour nodes
    const temp = document.createElement("div");
    temp.classList = "temp mb-1";
    const time = document.createElement("div");
    const img = document.createElement("img");

    temp.innerText = Math.round(weatherObj[i].temp);
    time.innerText = getFormattedHour(weatherObj[i].datetime);
    img.src = iconURL(icon);
    img.alt = icon;
    iconContainer.append(img);
    node.append(temp, iconContainer, time);
    hourlyForecast.append(node);
  }
}

function displayDailyForecast(data) {
  const days = weatherDaily(data);
  let dailyForecast = document.getElementById("daily-forecast");

  for (let i in days) {
    const node = document.createElement("div");
    const datetime = document.createElement("div");
    const conditions = document.createElement("div");
    const tempmax = document.createElement("div");
    const tempmin = document.createElement("div");

    datetime.innerText = days[i].datetime;
    conditions.innerText = days[i].conditions;
    tempmax.innerText = Math.round(days[i].tempmax);
    tempmin.innerText = Math.round(days[i].tempmin);
    node.append(datetime, conditions, tempmax, tempmin);
    dailyForecast.append(node);
  }
}

function getFormattedHour(datetime) {
  const res = Number(datetime.slice(0, 2)) + 1 + new Date().getHours();
  let hour;
  if (res > 24) {
    hour = res - 24;
  } else {
    hour = res;
  }
  hour = String(hour);

  if (hour.length < 2) {
    hour = "0".concat(hour);
  }

  const formattedTime = new Date(`2000-01-01T${hour}:00:00`)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    })
    .toLowerCase();
  return formattedTime;
}

function iconURL(icon) {
  const url = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Color/${icon}.svg`;
  return url;
}
