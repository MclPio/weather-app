const key = "WH4FQVH3ELQFFL6WF958XB45T";

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}`,
    {
      mode: "cors",
    }
  );
  const weatherData = await response.json();
  // console.log(weatherNow(weatherData));
  // console.log(weatherDaily(weatherData));
  // console.log(weatherHourly(weatherData));
  console.log(weatherData);
  displayNowForecast(weatherData);
  displayHourlyForecast(weatherData);
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
      datetimeEpoch: hours[i].datetimeEpoch,
      temp: hours[i].temp,
      conditions: hours[i].conditions,
    };
  }
  return hourlyData;
}

// function to submit location and get data back
const submitLocation = (function () {
  let input = document.getElementById("location");
  let submitButton = document.getElementById("submit-location");
  submitButton.addEventListener("click", () => {
    getWeatherData(input.value);
  });
})();

function displayNowForecast(data) {
  const tempNow = document.getElementById("temp-now");
  const tempMaxNow = document.getElementById("tempmax-now");
  const tempMinNow = document.getElementById("tempmin-now");
  const descriptionNow = document.getElementById("description-now");
  const feelsLikeNow = document.getElementById("feelslike-now");
  const locationField = document.getElementById("location");

  const weatherObj = weatherNow(data);

  tempNow.innerText = weatherObj.temp;
  tempMaxNow.innerText = weatherObj.tempmax;
  tempMinNow.innerText = weatherObj.tempmin;
  descriptionNow.innerText = weatherObj.description;
  feelsLikeNow.innerText = weatherObj.feelslike;
  locationField.value = weatherObj.address;
}

function displayHourlyForecast(data) {
  const weatherObj = weatherHourly(data);
  const hourlyForecast = document.getElementById("hourly-forecast");

  for (i in weatherObj) {
    const node = document.createElement("div");
    const temp = document.createElement("div");
    const condition = document.createElement("div");
    const time = document.createElement("div");

    temp.innerText = weatherObj[i].temp;
    condition.innerText = weatherObj[i].conditions;
    // time.innerText = new Date(weatherObj[i].datetimeEpoch);
    node.append(temp, condition, time);
    hourlyForecast.append(node);
  }
}
