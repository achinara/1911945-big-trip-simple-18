import PointView from '../view/point-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  pointListComponent = new PointListView();

  constructor(container, pointModel) {
    this.tripContainer = container;
    this.pointModel = pointModel;
  }

  init = () => {
    const points = this.pointModel.getPoints();
    const destinations = this.pointModel.getDestinations();
    const offers = this.pointModel.getOffers();

    render(new SortView(), this.tripContainer);
    render(this.pointListComponent, this.tripContainer);
    render(new PointEditView(points[0], destinations, offers), this.pointListComponent.getElement());

    for (let i = 1; i < points.length; i++) {
      render(new PointView(points[i]), this.pointListComponent.getElement());
    }
  };
}
