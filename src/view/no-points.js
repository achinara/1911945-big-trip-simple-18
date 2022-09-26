import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const noPointsTextType = {
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
};

const createTemplate = (filterType) => `<p class="trip-events__msg">${noPointsTextType[filterType]}</p>`;

export default class NoPoints extends AbstractView {
  #filterType = FilterType.EVERYTHING;

  constructor(type) {
    super();
    this.#filterType = type;
  }

  get template() {
    return createTemplate(this.#filterType);
  }
}
