import {getRandomValueFromArray} from '../utils.js';
import {generateOffersByType} from './offersByType';
import {generateDestinationByName} from './destination';
import {POINT_TYPES, PRICES, CITIES} from './const';

export const generatePoint = () => {
  const type = getRandomValueFromArray(POINT_TYPES);
  const destination = generateDestinationByName(getRandomValueFromArray(CITIES));
  return {
    basePrice: getRandomValueFromArray(PRICES),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination,
    offers: generateOffersByType(type).offers,
    type,
  };
};
