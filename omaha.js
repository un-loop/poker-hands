import getCombinations, { crossProduct } from './getCombinations.js';
import { handComparer } from './pokerHand.js';
import { Ace, King } from './ranks.js';

const holeCards = 2;
const boardCards = 3;

const getHoleCombinations = getCombinations(holeCards);
const getBoardCombinations = getCombinations(boardCards);

const lowFilter = (card) => (card.rank % Ace) <= 8;

const lowCardSort = (first, second) => (second.rank % Ace) - (first.rank % Ace);
const noPairs = (hand) => {
  for(let i = 0; i < hand.length - 1; i++) {
    if (hand[i].rank === hand[i+1].rank) {
      return false;
    }
  }

  return true;
}

export const lowHandSort = (first, second) => {
  if (!first && !second) {
    return 0;
  }

  if (!first || !second) {
    return !first ? 1 : -1;
  }

  for(let i = 0; i < first.length; i++) {
    if (first[i].rank !== second[i].rank) {
      return (first[i].rank % Ace) - (second[i].rank % Ace)
    }
  }

  return 0;
}

const getLowest = (hole, board) => {
  const lowHole = hole.filter(lowFilter);
  const lowBoard = board.filter(lowFilter);

  if (lowHole.length < 2 || lowBoard.length < 3) {
    return undefined;
  }

  const boardCombinations = getBoardCombinations(lowBoard);
  const holeCombinations = getHoleCombinations(lowHole);
  const hands = crossProduct(holeCombinations, boardCombinations)
    .map((item) => [...item[0], ...item[1]]);

  hands.forEach((hand) => hand.sort(lowCardSort));

  const sortedNoPairHands = hands.filter(noPairs);
  sortedNoPairHands.sort(lowHandSort);

  return sortedNoPairHands[0];
}


export const getBestHand = (hole, board) => {
  const boardCombinations = getBoardCombinations(board);
  const holeCombinations = getHoleCombinations(hole);
  const hands = crossProduct(holeCombinations, boardCombinations).map((item) => [...item[0], ...item[1]]);
  hands.sort(handComparer(false));

  return [hands[0], getLowest(hole, board)];
}

export const getBestHandPerPlayer = (board) => (hole) => getBestHand(hole, board);
export const getBestHandPerStreet = (hole) => (board) => getBestHand(hole, board);
