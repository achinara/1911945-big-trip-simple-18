import {render, replace, remove} from '../framework/render';
import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';
import {UserAction, UpdateType} from '../const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor(container, offers, destinations, changeData, changeMode) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointListContainer = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#addEventEscDown();
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#removeEventEscDown();
    this.#mode = Mode.DEFAULT;
  };

  #resetPointEdit = () => {
    this.#pointEditComponent.reset(this.#point);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#resetPointEdit();
      this.#replaceFormToPoint();
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
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      point,
    );
  };

  #handleDelete = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCloseForm = () => {
    this.#resetPointEdit();
    this.#replaceFormToPoint();
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#resetPointEdit();
      this.#replaceFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  init = (point) => {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point, this.#destinations, this.#offers);
    this.#pointEditComponent = new PointEditView(point, this.#destinations, this.#offers);

    this.#pointComponent.setClickHandler(this.#replacePointToForm);
    this.#pointEditComponent.setSubmitFormHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setCloseFormHandler(this.#handleCloseForm);
    this.#pointEditComponent.setDeleteHandler(this.#handleDelete);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };
}
