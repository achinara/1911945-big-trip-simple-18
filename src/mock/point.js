import {getRandomInteger, getRandomValueFromArray} from './utils.js';
import {generateOffersByType} from './offers.js';
import {POINT_TYPES, PRICES, CITIES} from './const.js';

export const generatePoint = () => {
  const type = getRandomValueFromArray(POINT_TYPES);
  return {
    basePrice: getRandomValueFromArray(PRICES),
    dateFrom: `2019-0${getRandomInteger(1, 6)}-10T22:55:56.845Z`,
    dateTo: '2019-07-11T09:22:13.375Z',
    destination: getRandomValueFromArray(CITIES),
    id: getRandomInteger(10, 30),
    offers: generateOffersByType(type).offers.map((o) => o.id),
    type,
  };
};
