import { get } from '../api';
import { HOUR, MINUTE, SECOND } from '../time';
import { Component } from '../Component';
import { Interval } from '../Interval';
import './background.css';

interface Photo {
  url: string;
}

export class Background implements Component {
  private photos: Photo[] = [];
  private currentIndex = 0;

  private preloadPhotos(photos: Photo[]) {
    photos.forEach(photo => {
      const image = new Image();
      image.src = photo.url
    });
  }

  @Interval(HOUR)
  private async getPhotos() {
    return await get<Photo[]>('photos');
  }

  @Interval(MINUTE)
  async render() {
    if (this.photos.length === 0) {
      this.photos = await this.getPhotos();
      this.preloadPhotos(this.photos);
    };

    const photo = this.photos[this.currentIndex];

    this.currentIndex = (this.currentIndex  + 1) % this.photos.length;

    const backgroundElement = document.getElementById('background');

    backgroundElement.style.backgroundImage = `url(${photo.url}`;
  }
}
