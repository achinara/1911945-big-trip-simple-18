import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import {render} from './render.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const tripPresenter = new TripPresenter(tripContainer, pointModel);

render(new FilterView(), filterContainer);

tripPresenter.init();
