import {FilterType} from '../const';
import {isFuturePoint, isActivePoint} from './common';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom) || isActivePoint(point.dateTo)),
};

export {filter};
