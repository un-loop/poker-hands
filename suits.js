export const Clubs = 'c';
export const Diamonds = 'd';
export const Hearts = 'h';
export const Spades = 's';

export const list = [Clubs, Diamonds, Hearts, Spades];

export const getLongName = (suit) => {
  switch(suit) {
    case 'd':
      return 'diamonds';
    case 'c':
      return 'clubs';
    case 'h':
      return 'hearts';
    case 's':
      return 'spades';
    default:
      throw new Error('suit not recognized');
  }
}

export default list;