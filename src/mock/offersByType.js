import {getRandomInteger} from '../utils';
import {generateOffer} from './offer';
import {POINT_TYPES} from './const';

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

