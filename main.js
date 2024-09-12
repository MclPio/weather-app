const key = "WH4FQVH3ELQFFL6WF958XB45T";

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}`,
    {
      mode: "cors",
    }
  );
  const weatherData = await response.json();
  console.log(weatherNow(weatherData));
  console.log(weatherDaily(weatherData));
  console.log(weatherHourly(weatherData));
}
getWeatherData("toronto");

//function to extract now data
// => (temp, high, low, description, feels like)
// chance to use a background image to describe condition...
function weatherNow(data) {
  return {
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
    };
  }
  return hourlyData;
}
