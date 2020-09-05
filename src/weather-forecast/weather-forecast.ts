import { get } from "../api";
import { interval } from "rxjs";
import { HOUR } from "../time-unit";
import { startWith, switchMap, map } from "rxjs/operators";
import './weather-forecast.css';

interface WeatherForecastResponse {
  properties: {
    periods: {
      name: string;
      isDaytime: boolean;
      temperature: number;
      icon: string;
    }[]
  }
}

interface WeatherForecast {
  name: string;
  temperature: number;
  icon: string;
}

const parseResponse = (response: WeatherForecastResponse): WeatherForecast[] => {
  return response.properties.periods
    .filter(period => period.isDaytime)
    .map(period => ({
      name: period.name,
      temperature: period.temperature,
      icon: period.icon
    }));
};

const WEATHER_FORECAST_URL = 'https://api.weather.gov/gridpoints/PHI/49,86/forecast';

export const weatherForecast$ = 
  interval(HOUR).pipe(
    startWith(0),
    switchMap(() => {
      return get<WeatherForecastResponse>(WEATHER_FORECAST_URL).pipe(
        map(parseResponse)
      );
    })
  );

export const renderWeatherForecast = (weatherForecast: WeatherForecast[]): void => {
  const weatherForecastElement = document.getElementById('weather-forecast');
  
  weatherForecastElement.innerHTML = weatherForecast.map(forecast => {
    const { name, temperature, icon } = forecast;

    return `
      <div class="forecast">
        <div class="name">${name}</div>
        <img src="${icon}" />
        <div class="temperature">${temperature}</div>
      </div>
    `
  }).join('');
}

