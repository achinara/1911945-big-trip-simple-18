import {render} from './framework/render';
import NewPointButtonView from './view/new-point-button-view';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import DestinationModel from './model/destination-model';
import OffersModel from './model/offers-model';
import PointModel from './model/point-model';
import PointsApiService from './api-services/points-api-service';
import OffersApiService from './api-services/offers-api-service';
import DestinationsApiService from './api-services/destinations-api-service';

const AUTHORIZATION = 'Basic ajkY3dkjPlkl6Ld';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');

const destinationModel = new DestinationModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
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

filterPresenter.init();
boardPresenter.init();

Promise.all([
  pointModel.init(),
  offersModel.init(),
  destinationModel.init(),
]).then(() => {
  render(newPointButtonComponent, tripMain);
  newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
});
