import {getRandomInteger, getRandomValueFromArray} from '../utils.js';
import {generateOffersByType} from './offersByType';
import {generateDestinationById} from './destination';
import {POINT_TYPES, PRICES, CITIES} from './const';

export const generatePoint = () => {
  const type = getRandomValueFromArray(POINT_TYPES);
  const destination = generateDestinationById(getRandomValueFromArray(CITIES));
  return {
    basePrice: getRandomValueFromArray(PRICES),
    dateFrom: `2019-0${getRandomInteger(1, 6)}-10T22:55:56.845Z`,
    dateTo: '2019-07-11T09:22:13.375Z',
    destination,
    id: getRandomInteger(10, 30),
    offers: generateOffersByType(type).offers,
    type,
  };
};
