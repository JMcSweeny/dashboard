import "./index.css";
import { photos$, renderPhotos } from "./photos/photos";
import { dateTime$, renderDateTime } from "./datetime/datetime";
import { renderCurrentWeather, currentWeather$ } from "./current-weather/current-weather";
import { weatherForecast$, renderWeatherForecast } from "./weather-forecast/weather-forecast";

photos$.subscribe(renderPhotos);
dateTime$.subscribe(renderDateTime);
currentWeather$.subscribe(renderCurrentWeather);
weatherForecast$.subscribe(renderWeatherForecast);

