import NoPoints from '../view/no-points';
import PointListView from '../view/point-list-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import {render} from '../framework/render';
import {sortByDate, sortByPrice} from '../utils/sort';
import {SortType, UpdateType, UserAction} from '../const';

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #noPoints = new NoPoints();
  #tripContainer = null;

  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;

  #pointPresenter = new Map();

  #currentSortType = SortType.DEFAULT;

  constructor(container, pointModel, offersModel, destinationModel) {
    this.#tripContainer = container;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    if (this.#currentSortType === SortType.PRICE) {
      return [...this.#pointModel.points].sort(sortByPrice);
    }
    return [...this.#pointModel.points].sort(sortByDate);
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
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderPoint = (point) => {
    const destinations = this.#destinationModel.destinations;
    const offers = this.#offersModel.offers;
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, offers, destinations, this.#handleViewAction, this.#handleModeChange);
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

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
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
