import { interval } from "rxjs";
import { MINUTE } from "../time-unit";
import { startWith, map, switchMap } from "rxjs/operators";
import { get } from "../api";
import './current-weather.css';

interface CurrentWeatherResponse {
  properties: {
    textDescription: string;
    icon: string;
    temperature: {
      value: number;
    }
  }
}

interface CurrentWeather {
  temperature: number;
  description: string;
  icon: string;
}

const parseResponse = (response: CurrentWeatherResponse): CurrentWeather => {
  const { temperature, textDescription, icon } = response.properties;

  return {
    temperature: Math.round(temperature.value * (9/5)) + 32,
    description: textDescription,
    icon
  };
}

const CURRENT_CONDITIONS_URL = 'https://api.weather.gov/stations/KDYL/observations/latest';

export const currentWeather$ = 
  interval(MINUTE * 15).pipe(
    startWith(0),
    switchMap(() => {
      return get<CurrentWeatherResponse>(CURRENT_CONDITIONS_URL)
        .pipe(map(parseResponse));
    })
  );

export const renderCurrentWeather = (currentWeather: CurrentWeather): void => {
  const currentWeatherElement = document.getElementById('current-weather');

  const { temperature, description, icon } = currentWeather;

  currentWeatherElement.innerHTML = `
    <div>
      <div class="temperature">${temperature}°</div>
      <div class="description">${description}</div>
    </div>
    <img src="${icon}" />
  `;
};