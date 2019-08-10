import { Component } from "../Component";
import { get } from "../api";
import { Interval } from "../Interval";
import { SECOND, DAY } from "../time";
import "./history.css";

interface Fact {
  year: string;
  text: string;
}

export class History implements Component {
  private facts: Fact[] = [];
  private currentIndex = 0;

  @Interval(DAY)
  async render() {
    this.facts = await get<Fact[]>('history');

    const historyElement = document.getElementById('history');

    historyElement.innerHTML = `
      <h3>Today in History</h3>
      <div class="wrapper"></div>
    `;

    this.renderNextFact();
  }

  @Interval(SECOND * 10)
  private async renderNextFact() {
    const nextFact = this.facts[this.currentIndex];

    this.currentIndex = (this.currentIndex + 1) % this.facts.length;
    
    const nextFactElement = document.createElement('div');
    nextFactElement.classList.add('fact');
    nextFactElement.innerHTML = `
      <div class="year">${nextFact.year}</div>
      <div class="text">${nextFact.text}</div>
    `;

    const wrapperElement = document.getElementById('history').querySelector('.wrapper');

    const currentFactElement = wrapperElement.querySelector('.fact');
    
    if (currentFactElement) {
      nextFactElement.classList.add('animate');
      currentFactElement.classList.add('animate');
      setTimeout(() => {
        wrapperElement.removeChild(currentFactElement);
        nextFactElement.classList.remove('animate');
      }, SECOND);
    }

    wrapperElement.appendChild(nextFactElement);
  }
}