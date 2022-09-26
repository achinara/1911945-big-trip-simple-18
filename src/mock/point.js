import uniqid from 'uniqid';
import {getRandomInteger, getRandomValueFromArray, shuffleArray} from './utils';
import {generateOffersByType} from './offers';
import {generateDestinations} from './destination';
import {POINT_TYPES, PRICES} from './const';

const COUNT_POINTS = 4;

const generatePoint = () => {
  const type = getRandomValueFromArray(POINT_TYPES);
  const offerIds = generateOffersByType(type).offers.map((o) => o.id);
  const offers = shuffleArray(offerIds).slice(1, 3);
  const destinations = generateDestinations();

  return {
    basePrice: getRandomValueFromArray(PRICES),
    dateFrom: `2022-0${getRandomInteger(8, 9)}-20T22:55:56.845Z`,
    dateTo: `2022-0${getRandomInteger(8, 9)}-11T09:22:13.375Z`,
    destination: getRandomValueFromArray(destinations).id,
    id: uniqid(),
    offers,
    type,
  };
};

export const generatePoints = () => Array.from({length: COUNT_POINTS}, () => generatePoint());
