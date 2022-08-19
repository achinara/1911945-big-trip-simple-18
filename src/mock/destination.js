import {getRandomInteger, getRandomValueFromArray} from '../utils';
import {CITIES, DESCRIPTIONS} from './const';

const generateDestinationByName = (name) => {
  const NUM_PIC = getRandomInteger(5, 10);
  return {
    name,
    description: `<b>${name}</b> is beauty city. ${getRandomValueFromArray(DESCRIPTIONS)}`,
    pictures: Array.from({length: NUM_PIC }, (_value, index) => ({
      src: `http://picsum.photos/248/152?r=${index}`,
      description: 'Chamonix parliament bui',
    }))
  };
};

const generateDestinations = () => CITIES.map((value) => generateDestinationByName(value));

export {generateDestinationByName, generateDestinations};
