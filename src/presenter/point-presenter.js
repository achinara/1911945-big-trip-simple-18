import {render, replace} from '../framework/render';
import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;
  #destinations = null;

  constructor(container, offers, destinations) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointListContainer = container;
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  init = (point) => {
    this.#point = point;
    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point, this.#destinations, this.#offers);

    this.#pointComponent.setClickHandler(this.#replacePointToForm);
    this.#pointEditComponent.setSubmitFormHandler(this.#replaceFormToPoint);
    this.#pointEditComponent.setCloseFormHandler(this.#replaceFormToPoint);

    render(this.#pointComponent, this.#pointListContainer);
  };
}
