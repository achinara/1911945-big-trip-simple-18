import NoPoints from '../view/no-points';
import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';
import PointListView from '../view/point-list-view';
import SortView from '../view/sort-view';
import {render} from '../render';

export default class TripPresenter {
  #pointListComponent = new PointListView();
  #tripContainer = null;
  #pointModel = null;

  #points = [];

  constructor(container, pointModel) {
    this.#tripContainer = container;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#renderContent();
  };

  #renderPoint = (point) => {
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point, destinations, offers);

    const replacePointToForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setSubmitFormHandler(replaceFormToPoint);
    pointEditComponent.setCloseFormHandler(replaceFormToPoint);

    render(pointComponent, this.#pointListComponent.element);
  };

  #renderContent = () => {
    if (!this.#points.length) {
      render(new NoPoints(), this.#tripContainer);
      return;
    }

    render(new SortView(), this.#tripContainer);
    render(this.#pointListComponent, this.#tripContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };
}
