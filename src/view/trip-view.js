import {createElement} from '../render.js';

const createTripTemplate = () => '<section class="trip-events"></section>';

export default class TripView {
  getTemplate() {
    return createTripTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
