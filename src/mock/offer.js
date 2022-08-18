import {getRandomInteger, getRandomValueFromArray} from '../utils';
import {OFFERS_TITLES} from './const';

export const generateOffer = (type) => ({
  type,
  title: getRandomValueFromArray(OFFERS_TITLES),
  price: getRandomInteger(5, 55),
});
