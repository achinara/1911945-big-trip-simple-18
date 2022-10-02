import uniqid from 'uniqid';
import {render, remove, RenderPosition} from '../framework/render';
import PointEditView from '../view/point-edit-view';
import {UserAction, UpdateType} from '../const';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;

  #pointEditComponent = null;
  #destroyCallback = null;

  #offers = null;
  #destinations = null;

  constructor(container, offers, destinations, changeData) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointListContainer = container;
    this.#changeData = changeData;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #addEventEscDown = () => {
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #removeEventEscDown = () => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...point, id: uniqid()},
    );
    this.destroy();
  };

  #handleDeleteForm = () => {
    this.destroy();
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    this.#removeEventEscDown();
  };

  init = (callback) => {
    this.#destroyCallback = callback;
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView(null, this.#destinations, this.#offers);

    this.#pointEditComponent.setSubmitFormHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteHandler(this.#handleDeleteForm);
    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    this.#addEventEscDown();
  };
}
