import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model';
import PointEditModel from './model/point-edit-model';
import {render} from './render.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter();

const pointModel = new PointModel();
const pointEditModel = new PointEditModel();
render(new FilterView(), filterContainer);

tripPresenter.init(tripContainer, pointModel, pointEditModel);
