import {Ace, Five, getLongName as getLongRankName} from './ranks.js';
import { getLongName as getLongSuitName } from './suits.js';
import pluralize from 'pluralize';

export const RoyalFlush = 10;
export const StraighFlush = 9;
export const FourOfAKind = 8;
export const FullHouse = 7;
export const Flush = 6;
export const Straight = 5;
export const Set = 4;
export const TwoPair = 3;
export const Pair = 2;
export const HighCard = 1;

const getHandInfo = (hand)  => {
  const freq = {};

  let flush = hand[0].suit;

  for(let card of hand) {
    if (freq[card.rank]) {
      freq[card.rank]++;
    } else {
      freq[card.rank] = 1;
    }

    flush = flush === card.suit && flush;
  }

  const frequencies = Object.entries(freq).map(
    (entry) => ({
      rank: Number(entry[0]),
      freq: entry[1],
    })
  );
  
  frequencies.sort(
    (first, second) => {
      if (first.freq !== second.freq) {
        return second.freq - first.freq; //high to low
      }

      return second.rank - first.rank;
    }
  );

  const result = {
    flush,
    frequencies,
    hand
  };

  if (result.frequencies.length === 5 && frequencies[0].rank === Ace && frequencies[1].rank === Five) {
    const element = frequencies.shift();
    frequencies.push(element);
  }
  
  return result;
};

const isRoyalFlush = (handInfo) => {
  return isStraightFlush(handInfo)
    && handInfo.frequencies[0].rank === Ace;
};

const isStraightFlush = (handInfo) => {
  return isFlush(handInfo) && isStraight(handInfo);
};

const isFlush = (handInfo) => {
  return handInfo.flush;
};

const isStraight = (handInfo) => {
  return handInfo.frequencies.length === 5
    && 
      (handInfo.frequencies[0].rank - handInfo.frequencies[4].rank === 4
        || handInfo.frequencies[0].rank === Five
      );
};

const isFourOfAKind = (handInfo) => {
  return handInfo.frequencies[0].freq === 4;
};

const isFullHouse = (handInfo) => {
  return handInfo.frequencies.length === 2 &&
    handInfo.frequencies[0].freq === 3 &&
    handInfo.frequencies[1].freq === 2;
};

const isSet = (handInfo) => {
  return handInfo.frequencies.length === 3 &&
    handInfo.frequencies[0].freq === 3;
}

const isTwoPair = (handInfo) => {
  return handInfo.frequencies.length === 3 &&
    handInfo.frequencies[0] === handInfo.frequencies[1]
};

const isPair = (handInfo) => {
  return handInfo.frequencies.length === 4;
}

const getHandRank = (handInfo) => {
  if (isRoyalFlush(handInfo)) {
    return RoyalFlush;
  }

  if (isStraightFlush(handInfo)) {
    return StraighFlush;
  }

  if (isFourOfAKind(handInfo)) {
    return FourOfAKind;
  }

  if (isFullHouse(handInfo)) {
    return FullHouse;
  }

  if(isStraight(handInfo)) {
    return Straight;
  }

  if (isFlush(handInfo)) {
    return Flush;
  }

  if (isSet(handInfo)) {
    return Set;
  }

  if(isTwoPair(handInfo)) {
    return TwoPair;
  }

  if(isPair(handInfo)) {
    return Pair;
  }

  return HighCard;
}

export const handComparer = (isAscending) => (first, second) => {
  const firstInfo = getHandInfo(first);
  const secondInfo = getHandInfo(second);

  const firstRank = getHandRank(firstInfo);
  const secondRank = getHandRank(secondInfo);
  const multiplier = isAscending ? 1 : -1;

  if (firstRank != secondRank) {
    return (firstRank - secondRank) * multiplier;
  }

  // note that firstInfo, secondInfo are same hand rank and as 
  // such must have even frequency counts
  for(let i = 0; i < firstInfo.frequencies.length; i++) {
    if (firstInfo.frequencies[i].rank !== secondInfo.frequencies[i].rank) {
      return (firstInfo.frequencies[i].rank - secondInfo.frequencies[i].rank) * multiplier;
    }
  }

  return 0; // all ranks were equal
}

const capitalize = (str) =>str && `${str[0].toUpperCase()}${str.slice(1)}`;

export const getHandString = (hand) => {
  const handInfo = getHandInfo(hand);
  const handRank = getHandRank(handInfo);

  const suit = getLongSuitName(hand[0].suit);
  const getCardName = (index) =>
    getLongRankName(handInfo.frequencies[index].rank);

  switch(handRank) {
    case RoyalFlush:
      return `Royal Flush (${capitalize(suit)})`
    case StraighFlush:
        return handInfo.frequencies[0].rank ===  Five ?
        `Steel Wheel (${capitalize(suit)})` :
        `${getCardName(0)}-High Straight Flush (${capitalize(suit)})`;
    case FourOfAKind:
      return `Quad (${pluralize(getCardName(0))})`;
    case FullHouse: //TODO: make plural
      return `Full House (${pluralize(getCardName(0))} over ${pluralize(getCardName(1))})`;
    case Straight:
      return handInfo.frequencies[0].rank === Five ?
        `Wheel` :
        handInfo.frequencies[0].rank === Ace ?
          'Broadway' :
          `${getCardName(0)}-High Straight`;
    case Flush:
      return `${getCardName(0)}-High Flush (${capitalize(suit)})`
    case Set:
      return `Set of ${pluralize(getCardName(0))}`
    case TwoPair:
      return `Two pair: ${pluralize(getCardName(0))} and ${pluralize(getCardName(0))}`
    case Pair:
      return `Pair of ${pluralize(getCardName(0))}, ${getCardName(1)} kicker`;
    case HighCard:
      return `High card ${getCardName(0)}`;
    default:
      throw new Error('Hand not recognized');
  }
}
