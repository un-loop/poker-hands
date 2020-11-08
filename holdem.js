import getCombinations from './getCombinations.js';
import { handComparer } from './pokerHand.js';

const handSize = 5;
const pokerCombinations = getCombinations(handSize);

export const getBestHand = (hole, board) => {
  const combinations = pokerCombinations([...hole, ...board]);
  combinations.sort(handComparer(false));
  return combinations[0];
}

export const getBestHandPerPlayer = (board) => (hole) => getBestHand(hole, board);
export const getBestHandPerStreet = (hole) => (board) => getBestHand(hole, board);
