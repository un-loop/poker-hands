import { Card } from './Card.js';
import Deck from './Deck.js';
import { handComparer, getHandString } from './pokerHand.js';

const numHands = 10;

const getShortHandName = (hand) =>
  hand.sort((first,second) => second.rank - first.rank)
    .map((card) => card.toString()).join();

const deck = new Deck();
deck.shuffle();

const hands = [];

for(let hand = 0; hand < numHands; hand++) {
  hands[hand] = [];
}

for(let card = 0; card < 5; card++) {
  for(let hand = 0; hand < numHands; hand++) {
    hands[hand].push(deck.deal());
  }
}

hands.sort(handComparer(false));
for(let hand = 0; hand < hands.length; hand++) {
  console.log(`${hand+1}: ${getShortHandName(hands[hand])} (${getHandString(hands[hand])})`)
}

