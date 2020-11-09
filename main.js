import Deck from './Deck.js';
import { getBestHandPerPlayer as getBestHoldemHandPerPlayer } from './holdem.js';
import { getBestHandPerPlayer as getBestOmahaHandPerPlayer, lowHandSort } from './omaha.js';
import { handComparer, getHandString } from './pokerHand.js';
import { Ace } from './ranks.js';

const getShortHandName = (hand) => hand ?
    hand.sort((first,second) => second.rank - first.rank)
      .map((card) => card.toString()).join()
    : 'None';

const getShortLowHandName = (hand) => hand ?
    hand.sort((first,second) => (second.rank % Ace) - (first.rank % Ace))
      .map((card) => card.toString()).join()
    : 'None';



const deal = (cards) => (deck) => (players) => {
  const hands = [];

  for(let hand = 0; hand < players; hand++) {
    hands[hand] = [];
  }

  for(let card = 0; card < cards; card++) {
    for(let hand = 0; hand < players; hand++) {
      hands[hand].push(deck.deal());
    }
  }

  return hands;
}

const holdemDeal = deal(2);
const studDeal = deal(5);
const omahaDeal = deal(4);

const deck = new Deck();

const playFiveCardStud = () => {
  const numHands = 10;

  deck.shuffle();
  const hands = studDeal(deck)(numHands);

  hands.sort(handComparer(false));
  for(let hand = 0; hand < hands.length; hand++) {
    console.log(`${hand+1}: ${getShortHandName(hands[hand])} (${getHandString(hands[hand])})`)
  }
}

const boardDeal = (number) => (deck) => {
  const result = [];
  deck.deal(); //burn

  for(let i = 0; i < number; i++) {
    result.push(deck.deal());
  }

  return result;
}

const flop = boardDeal(3);
const turn = boardDeal(1);
const river = boardDeal(1);

const playHoldem = () =>{
  const numPlayers = 9;
  deck.shuffle();

  const holes = holdemDeal(deck)(numPlayers);

  const board = [...flop(deck), ...turn(deck), ...river(deck)];
  const getBestHand = getBestHoldemHandPerPlayer(board);

  const hands = holes.map(
    (hole) => ({
      hole,
      hand: getBestHand(hole)
    })
  );

  const descendingComparer = handComparer(false);
  hands.sort((first, second) => descendingComparer(first.hand, second.hand));
  console.log(`Board: ${getShortHandName(board)}`);
  for(let hand = 0; hand < hands.length; hand++) {
    console.log(`${hand+1}: ${getShortHandName(hands[hand].hand)} (${getHandString(hands[hand].hand)}), with hole:  ${hands[hand].hole[0].toString()}${hands[hand].hole[1].toString()}`)
  }
}

const playOmaha = () => {
  const numPlayers = 6;
  deck.shuffle();
  const holes = omahaDeal(deck)(numPlayers);

  const board = [...flop(deck), ...turn(deck), ...river(deck)];
  const getBestHand = getBestOmahaHandPerPlayer(board);

  const hands = holes.map(
    (hole) => ({
      hole,
      hand: getBestHand(hole)
    })
  );

  const descendingComparer = handComparer(false);
  hands.sort((first, second) => descendingComparer(first.hand[0], second.hand[0]));
  console.log(`Board: ${getShortHandName(board)}`);
  for(let hand = 0; hand < hands.length; hand++) {
    console.log(`${hand+1}: ${getShortHandName(hands[hand].hand[0])} (${getHandString(hands[hand].hand[0])}), with hole:  ${hands[hand].hole[0].toString()}${hands[hand].hole[1].toString()}${hands[hand].hole[2].toString()}${hands[hand].hole[3].toString()}`)
  }

  hands.sort((first, second) => lowHandSort(first.hand[1], second.hand[1]));
  console.log(`Best low:`);
   for(let hand = 0; hand < hands.length; hand++) {
    console.log(`${hand+1}: ${getShortLowHandName(hands[hand].hand[1])} with hole: ${hands[hand].hole[0].toString()}${hands[hand].hole[1].toString()}${hands[hand].hole[2].toString()}${hands[hand].hole[3].toString()}`)
  }
}

//playFiveCardStud();
//playHoldem();
playOmaha();