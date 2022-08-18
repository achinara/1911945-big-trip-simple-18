import {getRandomInteger} from '../utils';
import {generateOffer} from './offer';
import {POINT_TYPES} from './const';

const setPoints = new Set(POINT_TYPES);
setPoints.delete('bus');
setPoints.delete('drive');

const OFFERS_BY_TYPE = Array.from(setPoints).reduce((acc, type) => {
  const OFFERS_NUM = getRandomInteger(1, 3);
  acc[type] = Array.from({length: OFFERS_NUM}, () => generateOffer(type));
  return acc;
}, {});

export const generateOffersByType = (type) => ({
  type,
  offers: OFFERS_BY_TYPE[type] || [],
});

