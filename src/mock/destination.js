import uniqid from 'uniqid';
import {getRandomInteger, getRandomValueFromArray} from './utils';
import {CITIES, DESCRIPTIONS} from './const';

const destinationsById = CITIES.reduce((acc, city) => {
  const numPics = getRandomInteger(5, 10);
  const description = `<b>${city}</b> is beauty city. ${getRandomValueFromArray(DESCRIPTIONS)}`;

  acc[city] = {
    id: uniqid(),
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
