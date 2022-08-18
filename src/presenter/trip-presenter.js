import PointView from '../view/point.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  pointListComponent = new PointListView();

  init = (container, pointModel) => {
    this.tripContainer = container;
    this.pointModel = pointModel;
    this.points = [...this.pointModel.getPoints()];

    render(new SortView(), this.tripContainer);
    render(this.pointListComponent, this.tripContainer);
    render(new PointEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView(this.points[i]), this.pointListComponent.getElement());
    }
  };
}
