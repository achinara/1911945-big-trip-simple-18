import {getRandomValueFromArray} from '../utils.js';
import {generateOffersByType} from './offersByType';
import {POINT_TYPES, PRICES} from './const';

export const generatePoint = () => {
  const type = getRandomValueFromArray(POINT_TYPES);
  return {
    basePrice: getRandomValueFromArray(PRICES),
    dateFrom: null,
    dateTo: null,
    destination: 'Amsterdam',
    offers: generateOffersByType(type),
    type,
  };
};
