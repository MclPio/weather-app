async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=WH4FQVH3ELQFFL6WF958XB45T`,
    {
      mode: "cors",
    }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  console.log(weatherData.resolvedAddress);
  console.log(weatherData.days[0].temp);
  console.log(weatherData.days[0].tempmax);
  console.log(weatherData.days[0].tempmin);
  console.log(weatherData.days[0].conditions);
  console.log(weatherData.days[0].feelslike);
}
getWeatherData("toronto");

//function to extract now data
// => (temp, high, low, description, feels like)
// chance to use a background image to describe condition...

// function to extract daily data
// => 10 day forecast (date, condition(where you use img), tempmax, tempmin)

// function to extract hourly data
// => 24 hour data (timeHour, temp, condition(where you use img))
