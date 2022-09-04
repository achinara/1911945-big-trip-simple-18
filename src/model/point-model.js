import {generatePoint} from '../mock/point.js';
import {generateDestinations} from '../mock/destination.js';
import {generateOffers, generateOffersByType} from '../mock/offers.js';

export default class PointModel {
  #destinations = generateDestinations();
  #offers = generateOffers();
  #points = Array.from({length: 4}, () => {
    const point = generatePoint();
    const offers = generateOffersByType(point.type).offers;
    return {
      ...point,
      destination: this.destinations.find((d) => d.id === point.destination),
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
    return this.#points;
  }
}
