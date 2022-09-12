import NoPoints from '../view/no-points';
import PointListView from '../view/point-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import {render} from '../framework/render';
import {sortByDate, sortByPrice} from '../utils/sort';
import {updateItem} from '../utils/common';
import {SortType} from '../const';

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #noPoints = new NoPoints();
  #tripContainer = null;
  #pointModel = null;

  #points = [];
  #pointPresenter = new Map();
  #pointsSortedByDate = [];

  #currentSortType = SortType.DEFAULT;

  constructor(container, pointModel) {
    this.#tripContainer = container;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointsSortedByDate = [...this.#pointModel.points].sort(sortByDate);
    this.#points = [...this.#pointsSortedByDate];
    this.#renderContent();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointsSortedByDate = updateItem(this.#pointsSortedByDate, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    if (sortType === SortType.PRICE) {
      this.#points.sort(sortByPrice);
    } else {
      this.#points = [...this.#pointsSortedByDate];
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderPoint = (point) => {
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, offers, destinations, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);

    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer);
    this.#sortComponent.setSortChangeHandler(this.#handleSortChange);
  };

  #renderNoPoints = () => {
    render(this.#noPoints, this.#tripContainer);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
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
