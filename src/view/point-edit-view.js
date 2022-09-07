import AbstractView from '../framework/view/abstract-view';

import {formatFullTime} from '../utils';

const createTypesSelectTemplate = (pointId, active, types) => types.reduce((acc, type) =>
  `${acc}
      <div class="event__type-item">
        <input id="event-type-${type}-${pointId}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${(active === type) ? 'checked' : ''}>
        <label class="event__type-label event__type-label--${type}" for="event-type-${type}-${pointId}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
      </div>
    `, '');

const createDestinationSelectTemplate = (current, destinations) => {
  const options = destinations.reduce((acc, dest) => `${acc}
    <option value="${dest.name}"></option>
  `, '');

  return `
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${current}" list="destination-list-1">
    <datalist id="destination-list-1">${options}</datalist>
  `;
};

const createOffersBLockTemplate = (offers, checkedOffers) => {
  if (!offers.length) {
    return '';
  }
  const items = offers.reduce((acc, offer) =>
    `${acc}
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${checkedOffers.includes(offer) ? 'checked' : ''} >
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
  `, '');
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">${items}</div>
    </section>
  `;
};

const createDestinationBlockTemplate = (destination) => {
  if (!destination) {
    return '';
  }
  const {pictures, description} = destination;
  const pics = pictures.reduce((acc, pic)=>`${acc}
    <img class="event__photo" src="${pic.src}" alt="${pic.description}">
  `, '');

  return `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">${pics}</div>
      </div>
    </section>`;
};

const createPointEditTemplate = (pointEdit, destinations, offers, types) => {
  const {basePrice, dateFrom, dateTo, destination, offers: pointOffers, type, id: pointId} = pointEdit;
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-${pointId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypesSelectTemplate(pointId, type, types)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            ${createDestinationSelectTemplate(destination?.name, destinations)}
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatFullTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatFullTime(dateTo)}">
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
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

export default class PointEditView extends AbstractView {
  #pointEdit = null;
  #destinations = null;
  #offers = null;
  #types = null;

  constructor(pointEdit = {}, destinations, offers) {
    super();
    this.#pointEdit = pointEdit;
    this.#destinations = destinations;
    this.#offers = offers.find((o) => o.type === pointEdit.type).offers;
    this.#types = offers.map((offer) => offer.type);
  }

  setSubmitFormHandler(callback) {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submit);
  }

  setCloseFormHandler(callback) {
    this._callback.close = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#close);
  }

  #submit = (evt) => {
    evt.preventDefault();
    this._callback.submit();
  };

  #close = () => {
    this._callback.close();
  };

  get template() {
    return createPointEditTemplate(this.#pointEdit, this.#destinations, this.#offers, this.#types);
  }
}
