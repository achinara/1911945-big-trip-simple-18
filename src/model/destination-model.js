import {generateDestinations} from '../mock/destination';

export default class DestinationModel {
  #destinations = generateDestinations();

  get destinations() {
    return this.#destinations;
  }
}
