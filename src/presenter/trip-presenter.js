import NoPoints from '../view/no-points';
import PointListView from '../view/point-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import {render} from '../framework/render';

export default class TripPresenter {
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #noPoints = new NoPoints();
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
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, offers, destinations);
    pointPresenter.init(point);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer);
  };

  #renderNoPoints = () => {
    render(this.#noPoints, this.#tripContainer);
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#tripContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };

  #renderContent = () => {
    if (!this.#points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  };
}
