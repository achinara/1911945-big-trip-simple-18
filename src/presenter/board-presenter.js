import NoPoints from '../view/no-points';
import PointListView from '../view/point-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import {render, remove} from '../framework/render';
import {sortByDate, sortByPrice} from '../utils/sort';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction} from '../const';

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #noPoints = null;
  #tripContainer = null;
  #sortComponent = null;

  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;
  #filterModel = null;

  #pointPresenter = new Map();

  #currentSortType = SortType.DEFAULT;

  constructor(container, pointModel, offersModel, destinationModel, filterModel) {
    this.#tripContainer = container;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[filterType](points);
    if (this.#currentSortType === SortType.PRICE) {
      return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints.sort(sortByDate);
  }

  init = () => {
    this.#renderContent();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#clearContent();
        this.#renderContent({resetSortType: true});
        break;
    }
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearContent();
    this.#renderContent();
  };

  #renderPoint = (point) => {
    const destinations = this.#destinationModel.destinations;
    const offers = this.#offersModel.offers;
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, offers, destinations, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);

    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortChangeHandler(this.#handleSortChange);
    render(this.#sortComponent, this.#tripContainer);
  };

  #renderNoPoints = () => {
    this.#noPoints = new NoPoints(this.#filterModel.filter);
    render(this.#noPoints, this.#tripContainer);
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#tripContainer);

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  };

  #clearContent = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPoints) {
      remove(this.#noPoints);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderContent = () => {
    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  };
}
