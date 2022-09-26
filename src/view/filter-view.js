import AbstractView from '../framework/view/abstract-view';

const createFilterItem = (filter, current) => `
  <div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === current ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>
`;

const createFilterTemplate = (filters, current) => {
  const filterItems = filters.reduce((acc, item) => `${acc} ${createFilterItem(item, current)}`, '');
  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
