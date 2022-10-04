import {render, remove, RenderPosition} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import NoPoints from '../view/no-points';
import PointListView from '../view/point-list-view';
import SortView from '../view/sort-view';
import LoadingView from '../view/loading-view';
import PointPresenter from './point-presenter';
import PointNewPresenter from './point-new-presenter';
import {sortByDate, sortByPrice} from '../utils/sort';
import {filter} from '../utils/filter.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #noPoints = null;
  #tripContainer = null;
  #sortComponent = null;
  #loadingComponent = null;

  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;
  #filterModel = null;

  #pointPresenter = new Map();
  #pointNewPresenter = null;

  #currentSortType = SortType.DEFAULT;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(container, pointModel, offersModel, destinationModel, filterModel) {
    this.#tripContainer = container;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#loadingComponent = new LoadingView();
    this.#pointNewPresenter = new PointNewPresenter(
      this.#pointListComponent.element,
      this.#offersModel,
      this.#destinationModel,
      this.#handleViewAction
    );

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

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  init = () => {
    this.#renderContent();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    const points = this.points || [];

    if (!points.length) {
      this.#clearNoPoints();
      this.#renderPointList();
    }
    this.#pointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderContent();
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
    const pointPresenter = new PointPresenter(
      this.#pointListComponent.element,
      this.offers,
      this.destinations,
      this.#handleViewAction,
      this.#handleModeChange
    );
    pointPresenter.init(point);

    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortChangeHandler(this.#handleSortChange);
    render(this.#sortComponent, this.#tripContainer);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    this.#noPoints = new NoPoints(this.#filterModel.filter);
    render(this.#noPoints, this.#tripContainer);
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#tripContainer);
    const list = this.points;

    for (let i = 0; i < list.length; i++) {
      this.#renderPoint(list[i]);
    }
  };

  #clearNoPoints = () => {
    if (this.#noPoints) {
      remove(this.#noPoints);
    }
  };

  #clearContent = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    this.#clearNoPoints();

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderContent = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  };
}
