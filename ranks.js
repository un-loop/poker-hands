export const Two = 2;
export const Three = 3;
export const Four = 4;
export const Five = 5;
export const Six = 6;
export const Seven = 7;
export const Eight = 8;
export const Nine = 9;
export const Ten = 10;
export const Jack = 11;
export const Queen = 12;
export const King = 13;
export const Ace = 14;

export const getName = (isShort) => (rank) => {
  switch(rank) {
    case Two:
      return isShort ? '2': 'Two';
    case Three:
      return isShort ? '3': 'Three';
    case Four:
      return isShort ? '4': 'Four';
    case Five:
      return isShort ? '5': 'Five';
    case Six:
      return isShort ? '6': 'Six';
    case Seven:
      return isShort ? '7': 'Seven';
    case Eight:
      return isShort ? '8': 'Eight';
    case Nine:
      return isShort ? '9': 'Nine';
    case Ten:
      return isShort ? '10': 'Ten';
    case Jack:
      return isShort ? 'J': 'Jack';
    case Queen:
      return isShort ? 'Q': 'Queen';
    case King:
      return isShort ? 'K': 'King';
    case Ace:
      return isShort ? 'A': 'Ace';
    default:
      throw new Error('rank not supported');
  }
}

export const getLongName = getName(false);
export const getShortName = getName(true);

export const list = [
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace
];

export default list;