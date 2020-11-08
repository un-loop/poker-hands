import Card from './Card.js';
import { getHandString } from './pokerHand.js';
import { Ace, Three, Four, Five, Six, Two, King, Queen, Jack, Ten } from './ranks.js';
import { Clubs, Diamonds, Hearts, Spades } from './suits.js';

const straight = [
  new Card(Ace, Clubs),
  new Card(Two, Diamonds),
  new Card(Three, Hearts),
  new Card(Four, Clubs),
  new Card(Five, Spades)
];

const broadway = [
  new Card(Ace, Clubs),
  new Card(King, Diamonds),
  new Card(Queen, Hearts),
  new Card(Jack, Clubs),
  new Card(Ten, Spades)
];

const flush = [
  new Card(Ace, Clubs),
  new Card(Six, Clubs),
  new Card(Queen, Clubs),
  new Card(Jack, Clubs),
  new Card(Ten, Clubs)
];

const royal = [
  new Card(Ace, Diamonds),
  new Card(King, Diamonds),
  new Card(Queen, Diamonds),
  new Card(Jack, Diamonds),
  new Card(Ten, Diamonds)
];

const straightFlush  = [
  new Card(Six, Hearts),
  new Card(Two, Hearts),
  new Card(Three, Hearts),
  new Card(Four, Hearts),
  new Card(Five, Hearts)
];

const steelWheel  = [
  new Card(Ace, Hearts),
  new Card(Two, Hearts),
  new Card(Three, Hearts),
  new Card(Four, Hearts),
  new Card(Five, Hearts)
];

const fullHouse  = [
  new Card(Jack, Hearts),
  new Card(Six, Hearts),
  new Card(Jack, Diamonds),
  new Card(Jack, Clubs),
  new Card(Six, Clubs)
];

const getShortHandName = (hand) =>
  hand.sort((first,second) => second.rank - first.rank)
    .map((card) => card.toString()).join();

const output = (hand) => `${getShortHandName(hand)} ${getHandString(hand)}`;

console.log(output(straight));
console.log(output(broadway));
console.log(output(flush));
console.log(output(royal));
console.log(output(straightFlush));
console.log(output(steelWheel));
console.log(output(fullHouse));