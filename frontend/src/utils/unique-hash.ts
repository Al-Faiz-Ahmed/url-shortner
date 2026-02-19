export function createUniqueHash(
  length: number,
): { error: string; uniqueHash: null } | { error: null; uniqueHash: string } {
  if (length === 0) {
    return {
      error: "length should be greater than 0",
      uniqueHash: null,
    };
  }

  let shuffledString =
    "ewEkY3FuaM0HZlC1Os7S42thpmyAPiI9Rf6bnDXqLcBdTGJoUr5gKNQ8VvzWjx";
  let newString = "";
  for (let i = 0; i < length; i++) {
    let randomPickNumber = Math.floor(Math.random() * shuffledString.length);

    newString += shuffledString[randomPickNumber];
  }

  return {
    error: null,
    uniqueHash: newString,
  };
}
