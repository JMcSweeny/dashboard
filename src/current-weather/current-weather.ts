import { interval, empty } from "rxjs";
import { MINUTE } from "../time-unit";
import { startWith, map, switchMap, catchError, shareReplay } from "rxjs/operators";
import { get } from "../api";
import './current-weather.css';

interface CurrentWeatherResponse {
  properties: {
    textDescription: string;
    temperature: {
      value: number;
    }
  }
}

interface CurrentWeather {
  temperature: number;
  description: string;
}

const parseResponse = (response: CurrentWeatherResponse): CurrentWeather => {
  console.log('In Here');
  const { temperature, textDescription } = response.properties;

  return {
    temperature: Math.round(temperature.value * (9/5)) + 32,
    description: textDescription
  };
}

const CURRENT_CONDITIONS_URL = 'https://api.weather.gov/stations/KDYL/observations/latest';

export const currentWeather$ = 
  interval(MINUTE * 30).pipe(
    startWith(0),
    switchMap(() => {
      return get<CurrentWeatherResponse>(CURRENT_CONDITIONS_URL)
        .pipe(map(parseResponse));
    }),
    catchError(err => {
      console.error(err);
      return empty();
    })
  );

export const renderCurrentWeather = (currentWeather: CurrentWeather): void => {
  const currentWeatherElement = document.getElementById('current-weather');

  const { temperature, description } = currentWeather;

  currentWeatherElement.innerHTML = `
    <div>
      <div class="temperature">${temperature}°</div>
      <div class="description">${description}</div>
    </div>
  `;
};