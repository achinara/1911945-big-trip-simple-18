import {generatePoint} from '../mock/point.js';
import {generateDestinations} from '../mock/destination.js';
import {POINT_TYPES} from '../mock/const';

export default class PointEditModel {
  point = {
    destinations: generateDestinations(),
    point: generatePoint(),
    types: POINT_TYPES,
  };

  get = () => this.point;
}
