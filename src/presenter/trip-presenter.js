import PointView from '../view/point-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  pointListComponent = new PointListView();

  init = (container, pointModel, pointEditModel) => {
    this.tripContainer = container;
    this.pointModel = pointModel;
    this.pointEditModel = pointEditModel;
    this.points = [...this.pointModel.get()];

    render(new SortView(), this.tripContainer);
    render(this.pointListComponent, this.tripContainer);
    render(new PointEditView(this.pointEditModel.get()), this.pointListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView(this.points[i]), this.pointListComponent.getElement());
    }
  };
}
