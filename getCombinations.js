export const countPermutations = (choose, from) => {
  let count = from;

  for(let i = from - 1; i > from - choose; i--) {
    count *= i;
  }

  return count;
}

export const countCombinations = (choose, from) => {
  countPermutations(choose, from) / countPermutations(choose, choose);
}

export const getCombinations = (choose) => (from) => {
  const permutations = new Array(countCombinations(choose, from.length));
  let current = 0;
  const permutation = [];
  
  const helper = (remaining, i) => {
    if (!remaining || remaining > from.length - i) {
      return;
    }

    helper(remaining, i + 1);

    permutation.push(from[i]);
    helper(remaining - 1, i + 1);

    if (permutation.length === choose) {
      permutations[current++] = [...permutation];
    }

    permutation.pop();
  }

  helper(choose, 0);
  return permutations;
}

export const crossProduct = (first, second) => {
  const product = new Array(first.length * second.length);
  
  for(let i = 0; i < first.length; i++) {
    for(let j = 0; j < second.length; j++) {
      product[i*second.length + j] = [first[i], second[j]];
    }
  }

  return product;
};

export default getCombinations;