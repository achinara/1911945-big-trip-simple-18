import {getRandomInteger} from '../utils';
import {OFFERS_TITLES} from './const';

export const generateOffer = (index) => ({
  id: getRandomInteger(1, 100),
  title: OFFERS_TITLES[index],
  price: getRandomInteger(5, 55),
});
