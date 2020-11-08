import * as ranks from './ranks.js';
import * as suits from './suits.js';

export class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  toString() {
    return `${ranks.getShortName(this.rank)}${this.suit}`
  }
}

export const cardComparer = (first, second) => first.rank - second.rank;

export default Card;
