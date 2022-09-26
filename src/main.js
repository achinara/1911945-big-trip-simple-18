import NewPointButtonView from './view/new-point-button-view';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
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
const boardPresenter = new BoardPresenter(tripContainer, pointModel, offersModel, destinationModel, filterModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, tripMain);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

filterPresenter.init();
boardPresenter.init();
