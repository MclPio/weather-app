// import weatherData from "../../sample.json";
import { setInitTemps, updateSearchLoading } from "../ui/domManipulation";
import {
  displayNowForecast,
  displayHourlyForecast,
  displayDailyForecast,
} from "../ui/domManipulation";

const key = "WH4FQVH3ELQFFL6WF958XB45T";

async function getWeatherData(location) {
  try {
    if (!location.trim()) {
      throw new Error("location cannot be empty");
    }

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}`,
      {
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weatherData = await response.json();
    if (weatherData.error) {
      throw new Error(weatherData.error.message || "Unknown API error");
    }
    displayNowForecast(weatherData);
    displayHourlyForecast(weatherData);
    displayDailyForecast(weatherData);
    localStorage.setItem("location", weatherData.resolvedAddress);
    setInitTemps();
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    alert(error.message);
  } finally {
    updateSearchLoading();
  }
}

export { getWeatherData };
