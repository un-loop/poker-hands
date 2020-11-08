
const getCombinations = (choose) => (from) => {
  const permutations = [];
  const permutation = [];
  
  const helper = (remaining, i) => {
    if (!remaining || remaining > from.length - i) {
      return;
    }

    helper(remaining, i + 1);

    permutation.push(from[i]);
    helper(remaining - 1, i + 1);

    if (permutation.length === choose) {
      permutations.push([...permutation]);
    }

    permutation.pop();
  }

  helper(choose, 0);
  return permutations;
}

export default getCombinations;