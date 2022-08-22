import {generatePoint} from '../mock/point.js';

export default class PointModel {
  points = Array.from({length: 3}, () => generatePoint());

  get = () => this.points;
}
