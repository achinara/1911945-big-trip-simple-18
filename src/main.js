import NewPointButtonView from './view/new-point-button-view';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import DestinationModel from './model/destination-model';
import OffersModel from './model/offers-model';
import PointModel from './model/point-model';
import {render} from './framework/render';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');

const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const pointModel = new PointModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(filterContainer, filterModel);
const tripPresenter = new BoardPresenter(tripContainer, pointModel, offersModel, destinationModel, filterModel);

render(new NewPointButtonView(), tripMain);

filterPresenter.init();
tripPresenter.init();
