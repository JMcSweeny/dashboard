import { MINUTE } from '../time';
import { Interval } from '../Interval';
import { Component } from '../Component';
import './clock.css';

export class Clock implements Component {
  private formatDate(date: Date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  @Interval(MINUTE)
  render() {
    const formattedDate = this.formatDate(new Date());
  
    const [weekday, monthday, year, time] = formattedDate.split(', ');
  
    const clockElement = document.getElementById('clock');
  
    clockElement.innerHTML = `
      <div class="day">${weekday}, ${monthday}</div>
      <div class="time">${time.split(' ')[0]}</div>
    `;
  }
}
