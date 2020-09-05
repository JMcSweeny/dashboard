import { zip, from,  Observable, interval } from "rxjs";
import { map, switchMap, startWith, repeatWhen, delay } from "rxjs/operators";
import { get } from "../api";
import { HOUR } from "../time-unit";
import './photos.css';

interface PhotosResponse {
  data: {
    children: {
      data: {
        title: string;
        url: string;
      };
    }[];
  };
}

interface Photo {
  title: string;
  url: string;
}

const formatTitle = (title: string): string => {
  return title
    .replace(/{.*?}/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/<.*?>/g, "")
    .replace(/\(.*?\)/g, "")
    .trim();
};

const parseResponse = (response: PhotosResponse): Photo[] => {
  return response.data.children.map(child => ({
    title: formatTitle(child.data.title),
    url: child.data.url
  }));
};

const PHOTO_DURATION = HOUR;
const PHOTOS_URL = "https://www.reddit.com/r/earthporn+cityporn/hot.json?s&sort=hot";

const interval$ = interval(PHOTO_DURATION).pipe(startWith(0));

export const photos$ = 
  get<PhotosResponse>(PHOTOS_URL).pipe(
    map(parseResponse),
    switchMap(photos => {
      return zip(interval$, from(photos))
        .pipe(
          map(([_, photo]) => photo)
        );
    }),
    repeatWhen(x => x.pipe(delay(PHOTO_DURATION)))
  );

export const renderPhotos = (photo: Photo): void => {
  const photoElement = document.querySelector('#photo');

  const { url, title } = photo;

  photoElement.innerHTML = `
    <img src="${url}" />
    <p>${title}</p>
  `;

  const photoImg = photoElement.querySelector('img');
  const photoTitle = photoElement.querySelector('p');

  photoTitle.style.display = 'none';

  photoImg.addEventListener('load', () => {
    const { top } = photoImg.getBoundingClientRect();
    photoTitle.style.bottom = `${top.toString()}px`;
    photoTitle.style.width = `${photoImg.width.toString()}px`;
    photoTitle.style.display = 'block';
  });
};
