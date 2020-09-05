import { interval } from "rxjs";
import { MINUTE } from "../time-unit";
import { startWith, map } from "rxjs/operators";
import './datetime.css';

interface DateTime {
  date: string;
  time: string;
  ampm: string;
}

const formatDateTime = (date: Date): DateTime => {
  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const [weekday, monthday, year, timecombinded] = dateString.split(', ');
  
  const [time, ampm] = timecombinded.split(' ');

  return {
    date: `${weekday}, ${monthday}`,
    time,
    ampm
  };
};

export const dateTime$ = interval(MINUTE).pipe(
  startWith(0),
  map(() => formatDateTime(new Date()))
);

export const renderDateTime = (datetime: DateTime): void => {
  const datetimeElement = document.getElementById('datetime');

  const { date, time, ampm } = datetime;

  datetimeElement.innerHTML = `
    <div class="date">${date}</div>
    <div>
      <span class="time">${time}</span>
      <span class="ampm">${ampm}</span>
    </div>
  `;
};