import suits from './suits.js';
import ranks from './ranks.js';
import { Card } from './Card.js';

function Deck() {
  const deck = new Array(52);

  const fill = () => {
    if (deck.length === 52 && deck[51] !== undefined) {
      return;
    }

    for(let rank = 0; rank < ranks.length; rank++) {
      for(let suit = 0; suit < suits.length; suit++) {
        deck[rank * suits.length + suit] = new Card(ranks[rank], suits[suit]);
      }
    }
  }

  this.shuffle = () => {
    fill();

    for(let i = 0; i < deck.length; i++) {
      const rand = Math.floor(Math.random() * (deck.length - i)) + i;
      const temp = deck[i];
      deck[i] = deck[rand];
      deck[rand] = temp;
    }
  }

  this.deal = () => deck.pop();

  fill();
}

export default Deck;