const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValueFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

function shuffleArray(array) {
  return array.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export {getRandomInteger, getRandomValueFromArray, shuffleArray};
