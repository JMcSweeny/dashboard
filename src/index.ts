import { Background } from './background/Background';
import { Clock } from './clock/Clock';
import { Component } from './Component';
import { Weather } from './weather/Weather';
import './index.css';
import { History } from './history/History';

const components: Component[] = [
  new Background(),
  new Clock(),
  new Weather(),
  new History()
];

function bootstrap() {
  components.forEach(component => component.render());
}

bootstrap();
