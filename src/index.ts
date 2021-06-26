import "./index.css";
import { photos$, renderPhotos } from "./photos/photos";
import { dateTime$, renderDateTime } from "./datetime/datetime";
import { weather$, renderWeather } from "./weather/weather";

photos$.subscribe(renderPhotos);
dateTime$.subscribe(renderDateTime);
weather$.subscribe(renderWeather);
