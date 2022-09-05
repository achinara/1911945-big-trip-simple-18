import {getRandomInteger, getRandomValueFromArray, shuffleArray} from './utils';
import {generateOffersByType} from './offers';
import {POINT_TYPES, PRICES, CITIES} from './const';

const COUNT_POINTS = 4;

const generatePoint = () => {
  const type = getRandomValueFromArray(POINT_TYPES);
  const offerIds = generateOffersByType(type).offers.map((o) => o.id);
  const offers = shuffleArray(offerIds).slice(1, 3);

  return {
    basePrice: getRandomValueFromArray(PRICES),
    dateFrom: `2019-0${getRandomInteger(1, 6)}-10T22:55:56.845Z`,
    dateTo: '2019-07-11T09:22:13.375Z',
    destination: getRandomValueFromArray(CITIES),
    id: getRandomInteger(10, 30),
    offers,
    type,
  };
};

export const generatePoints = () => getRandomInteger() ? Array.from({length: COUNT_POINTS}, () => generatePoint()) : [];
