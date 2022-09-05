import uniqid from 'uniqid';
import {getRandomInteger} from './utils';
import {OFFERS_TITLES, POINT_TYPES} from './const';

export const generateOffer = (index) => ({
  id: uniqid(),
  title: OFFERS_TITLES[index],
  price: getRandomInteger(5, 55),
});

const setPoints = new Set(POINT_TYPES);
setPoints.delete('bus');
setPoints.delete('drive');

const offersById = Array.from(setPoints).reduce((acc, type) => {
  const offersNum = getRandomInteger(0, 5);
  acc[type] = Array.from({length: offersNum}, (_value, index) => generateOffer(index));
  return acc;
}, {});

export const generateOffersByType = (type) => ({
  type,
  offers: offersById[type] || [],
});

export const generateOffers = () => POINT_TYPES.map((type) => generateOffersByType(type));
