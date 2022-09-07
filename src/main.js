import FilterView from './view/filter-view';
import NewPointButtonView from './view/new-point-button-view';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import {render} from './framework/render';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const tripPresenter = new TripPresenter(tripContainer, pointModel);

render(new NewPointButtonView(), tripMain);
render(new FilterView(), filterContainer);

tripPresenter.init();
