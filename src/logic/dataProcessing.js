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
    icon: data.days[0].icon,
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
      icon: days[i].icon,
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

export { weatherNow, weatherDaily, weatherHourly };
