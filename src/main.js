import FilterView from './view/filter-view';
import NewPointButtonView from './view/new-point-button-view';
import BoardPresenter from './presenter/board-presenter';
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
const tripPresenter = new BoardPresenter(tripContainer, pointModel, offersModel, destinationModel);

render(new NewPointButtonView(), tripMain);
render(new FilterView(), filterContainer);

tripPresenter.init();
