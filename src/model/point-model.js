import {generatePoints} from '../mock/point.js';
import {generateDestinations} from '../mock/destination.js';
import {generateOffers} from '../mock/offers.js';

export default class PointModel {
  #destinations = generateDestinations();
  #offers = generateOffers();
  #points = generatePoints();
  #normalizedPoints = this.#points.map((point) => {
    const offers = this.#offers.find((o) => o.type === point.type).offers;
    return {
      ...point,
      destination: this.#destinations.find((d) => d.id === point.destination),
      offers: offers.filter(({id}) => point.offers.includes(id)),
    };
  });

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#normalizedPoints;
  }
}
