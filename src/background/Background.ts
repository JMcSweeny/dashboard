import { MINUTE } from '../time';
import { Component } from '../Component';
import { Interval } from '../Interval';
import './background.css';

interface Photo {
  caption: string;
  image: string;
}

export class Background implements Component {
  private photos: Photo[] = require('./photos.json');
  private currentIndex = 0;

  private getImagePath(image: string): string {
    return require(`./photos/${image}`);
  }

  @Interval(MINUTE)
  async render() {
    const photo = this.photos[this.currentIndex];

    this.currentIndex = (this.currentIndex  + 1) % this.photos.length;

    const backgroundElement = document.getElementById('dashboard');

    backgroundElement.style.backgroundImage = `url(${this.getImagePath(photo.image)}`;

    const caption = document.getElementById('caption');

    caption.innerHTML = photo.caption;
  }
}
