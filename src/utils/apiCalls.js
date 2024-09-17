import weatherData from "../../sample.json";
import { updateSearchLoading } from "../ui/domManipulation";
import {
  displayNowForecast,
  displayHourlyForecast,
  displayDailyForecast,
} from "../ui/domManipulation";

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

export { getWeatherData };
