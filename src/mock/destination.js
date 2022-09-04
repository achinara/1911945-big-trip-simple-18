import {getRandomInteger, getRandomValueFromArray} from './utils.js';
import {CITIES, DESCRIPTIONS} from './const.js';

const destinationsById = CITIES.reduce((acc, city) => {
  const numPics = getRandomInteger(5, 10);
  const description = `<b>${city}</b> is beauty city. ${getRandomValueFromArray(DESCRIPTIONS)}`;

  acc[city] = {
    id: city,
    name: city,
    description,
    pictures: Array.from({length: numPics }, (_value, index) => ({
      src: `http://picsum.photos/248/152?r=${index}`,
      description,
    }))
  };
  return acc;
}, {});

const generateDestinations = () => Object.values(destinationsById);

export {generateDestinations};
