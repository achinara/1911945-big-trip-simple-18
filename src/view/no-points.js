import AbstractView from '../framework/view/abstract-view';

const createTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPoints extends AbstractView {
  get template() {
    return createTemplate();
  }
}
