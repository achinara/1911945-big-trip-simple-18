import AbstractView from '../framework/view/abstract-view.js';

const createErrorTemplate = (errorMsg) => `<p class="trip-events__msg">${errorMsg}</p>`;

export default class ErrorView extends AbstractView {
  #errorMsg = '';
  constructor(message) {
    super();
    this.#errorMsg = `Error: ${message}` || 'Something went wrong';
  }

  get template() {
    return createErrorTemplate(this.#errorMsg);
  }
}
