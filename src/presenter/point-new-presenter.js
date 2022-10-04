import {render, remove, RenderPosition} from '../framework/render';
import PointEditView from '../view/point-edit-view';
import {UserAction, UpdateType} from '../const';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;

  #pointEditComponent = null;
  #destroyCallback = null;

  #offersModel = null;
  #destinationModel = null;

  constructor(container, offersModel, destinationsModel, changeData) {
    this.#offersModel = offersModel;
    this.#destinationModel = destinationsModel;
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

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView(null, this.destinations, this.offers);

    this.#pointEditComponent.setSubmitFormHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteHandler(this.#handleDeleteForm);
    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    this.#addEventEscDown();
  };
}
