import {render} from './framework/render';
import NewPointButtonView from './view/new-point-button-view';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import DestinationModel from './model/destination-model';
import OffersModel from './model/offers-model';
import PointModel from './model/point-model';
import AppApiService from './api-services/app-api-service';

const AUTHORIZATION = 'Basic ajkY3dkjPlkl6Ld';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const appApiService = new AppApiService(END_POINT, AUTHORIZATION);

const filterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');

const destinationModel = new DestinationModel(appApiService);
const offersModel = new OffersModel(appApiService);
const pointModel = new PointModel(appApiService);
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

boardPresenter.init();

offersModel.init()
  .finally(destinationModel.init)
  .finally(pointModel.init)
  .then(() => {
    filterPresenter.init();
    render(newPointButtonComponent, tripMain);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
