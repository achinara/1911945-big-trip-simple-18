import FilterView from './view/filter-view';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import {render} from './render';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const tripPresenter = new TripPresenter(tripContainer, pointModel);

render(new FilterView(), filterContainer);

tripPresenter.init();
