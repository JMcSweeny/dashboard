import { get } from "../api";
import { interval, EMPTY } from "rxjs";
import { MINUTE } from "../time-unit";
import { startWith, catchError, mergeMap } from "rxjs/operators";
import "./weather.css";

interface WeatherResponse {
  currentTemperature: number;
  currentDescription: string;
  dailyForecast: Forecast[];
}

interface Forecast {
  temperatureMax: number;
  temperatureMin: number;
  icon: string;
  dayOfWeek: string;
  description: string;
}

const WEATHER_URL = `${process.env.API_ROOT}/weather`;

export const weather$ = interval(MINUTE * 30).pipe(
  startWith(0),
  mergeMap(() => {
    return get<WeatherResponse>(WEATHER_URL).pipe(catchError(() => EMPTY));
  })
);

export const renderWeather = (weatherResponse: WeatherResponse): void => {
  const weatherForecastElement = document.getElementById("weather-forecast");

  weatherForecastElement.innerHTML = weatherResponse.dailyForecast
    .map((forecast) => {
      const {
        dayOfWeek,
        temperatureMin,
        temperatureMax,
        icon,
        description,
      } = forecast;

      return `
        <div class="forecast">
          <div class="name">${dayOfWeek}</div>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
          <p class="description">${description}</p>
          <div class="temperature">${temperatureMax} / ${temperatureMin}</div>
        </div>
      `;
    })
    .join("");

  const currentWeatherElement = document.getElementById("current-weather");

  const { currentTemperature, currentDescription } = weatherResponse;

  currentWeatherElement.innerHTML = `
    <div>
      <div class="temperature">${currentTemperature}°</div>
      <div class="description">${currentDescription}</div>
    </div>
  `;
};
