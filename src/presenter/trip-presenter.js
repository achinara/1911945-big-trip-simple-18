import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointListView from '../view/point-list-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  #pointListComponent = new PointListView();
  #tripContainer = null;
  #pointModel = null;

  constructor(container, pointModel) {
    this.#tripContainer = container;
    this.#pointModel = pointModel;
  }

  init = () => {
    const points = [...this.#pointModel.points];

    render(new SortView(), this.#tripContainer);
    render(this.#pointListComponent, this.#tripContainer);

    for (let i = 1; i < points.length; i++) {
      this.#renderPoint(points[i]);
    }
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

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#pointListComponent.element);
  };
}
