import { MINUTE } from '../time';
import { Interval } from '../Interval';
import { get } from '../api';
import { Component } from '../Component';
import './weather-icons.css';
import './weather.css';

interface Currently {
  icon: string;
  temperature: number;
}

interface Daily {
  icon: string;
  temperatureHigh: number;
  temperatureLow: number;
}

interface Forecast {
  currently: Currently;
  daily: Daily[];
}

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export class Weather implements Component {
  private formatTemperature(temperature: number) {
    return `${Math.round(temperature)}°`;
  }

  private renderDailyForecast(forecast: Daily, index: number) {
    const dayOfWeek = weekdays[(new Date().getDay() + index)  % 7];
    return `
      <div class="daily-forecast">
        <div class="day-of-week">${dayOfWeek}</div>
        <i class="wi wi-forecast-io-${forecast.icon}"></i>
        <div class="high-low">
          <span class="temperature">${this.formatTemperature(forecast.temperatureHigh)}</span>
          <span>/</span>
          <span class="temperature">${this.formatTemperature(forecast.temperatureLow)}</span>
        </div>
      </div>
    `;
  }

  @Interval(MINUTE * 15)
  async render() {
    const weather = await get<Forecast>('weather');
    const weatherElement = document.getElementById('weather');
    weatherElement.innerHTML = `
      <h1>Warminster, PA</h1>
      <div class="currently">
        <span class="temperature">${this.formatTemperature(weather.currently.temperature)}</span>
        <i class="wi wi-forecast-io-${weather.currently.icon}"></i>
      </div>
      <div class="daily">
        ${weather.daily.map(this.renderDailyForecast.bind(this)).join('')}
      </div>
    `;
  }
}