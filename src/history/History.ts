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
  private readonly factsToShow = 3;
  
  private getNextFacts(): Fact[] {
    const nextFacts = [];

    while (nextFacts.length < this.factsToShow) {
      nextFacts.push(this.facts[this.currentIndex]);
      this.currentIndex = (this.currentIndex + 1) % this.facts.length;
    }

    return nextFacts;
  }

  @Interval(DAY)
  async render() {
    this.facts = await get<Fact[]>('history');
    this.renderFacts();
  }

  @Interval(SECOND * 20)
  private async renderFacts() {
    const nextFacts = this.getNextFacts();

    const historyElement = document.getElementById('history');

    historyElement.innerHTML = '';

    nextFacts.forEach(fact => {
      const factElement = document.createElement('p');
      factElement.classList.add('fact');
      factElement.classList.add('fade-in');
      factElement.innerHTML = `
        <div class="year">${fact.year}</div>
        <div class="text">${fact.text}</div>
      `;
      historyElement.appendChild(factElement);
    });
  }
}