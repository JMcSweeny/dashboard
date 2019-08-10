import { Component } from "../Component";
import { Interval } from "../Interval";
import { MINUTE } from "../time";
import { get } from "../api";
import './headlines.css';

interface Headline {
  abstract: string;
  thumbnail: string;
  title: string;
}

export class Headlines implements Component {

  private renderHeadline(headline: Headline) {
    return `
      <div class="headline">
        <div>
          <h4 class="title">${headline.title}</h4>
          <p class="abstract">${headline.abstract}</p>
        </div>
        <img src="${headline.thumbnail}" />
      </div>
    `;
  }

  @Interval(MINUTE * 30)
  async render() {
    const headlines = await get<Headline[]>('headlines');
    
    const headlinesElement = document.getElementById('headlines');

    headlinesElement.innerHTML = headlines.map(this.renderHeadline).join("");
  }
}