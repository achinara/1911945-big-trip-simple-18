import {createElement} from '../render.js';
import {createOffersBLockTemplate} from './offers-block-view.js';
import {createDestinationBlockTemplate} from './destination-block-view.js';
import {createTypesSelectTemplate} from './types-select-view.js';
import {createDestinationSelectTemplate} from './destination-select-view.js';
import {formatFullTime} from '../utils.js';

const createPointEditTemplate = (pointEdit, destinations, offers, types) => {
  const {basePrice, dateFrom, dateTo, destination, offers: pointOffers, type} = pointEdit;
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypesSelectTemplate(type, types)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            ${createDestinationSelectTemplate(destination.name, destinations)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatFullTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatFullTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${createOffersBLockTemplate(offers, pointOffers)}
          ${createDestinationBlockTemplate(destination)}
        </section>
      </form>
    </li>`;
};

export default class PointEditView {
  #element = null;
  #pointEdit = null;
  #destinations = null;
  #offers = null;
  #types = null;

  constructor(pointEdit, destinations, offers) {
    this.#pointEdit = pointEdit;
    this.#destinations = destinations;
    this.#offers = offers.find((o) => o.type === pointEdit.type).offers;
    this.#types = offers.map((offer) => offer.type);
  }

  get template() {
    return createPointEditTemplate(this.#pointEdit, this.#destinations, this.#offers, this.#types);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
