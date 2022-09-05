import {createElement} from '../render';

const createTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPoints {
  #element = null;

  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
