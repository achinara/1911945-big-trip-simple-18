import AbstractStatefulView from '../framework/view/abstract-stateful-view';

import {formatFullTime} from '../utils/format-date';

const createTypesSelectTemplate = (pointId, active, types) => types.reduce((acc, type) =>
  `${acc}
      <div class="event__type-item">
        <input id="event-type-${type}-${pointId}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${(active === type) ? 'checked' : ''}>
        <label class="event__type-label event__type-label--${type}" for="event-type-${type}-${pointId}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
      </div>
    `, '');

const createDestinationSelectTemplate = (pointId, current, destinations) => {
  const options = destinations.reduce((acc, dest) => `${acc}
    <option value="${dest.name}" data-destination-id="${dest.id}"></option>
  `, '');

  return `
    <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${current}" list="destination-list-${pointId}">
    <datalist id="destination-list-${pointId}">${options}</datalist>
  `;
};

const createOffersBLockTemplate = (offers, offersIds) => {
  if (!offers.length) {
    return '';
  }
  const items = offers.reduce((acc, offer) =>
    `${acc}
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${offersIds.includes(offer.id) ? 'checked' : ''} >
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

const createPointEditTemplate = (point) => {
  const {id: pointId, basePrice, dateFrom, dateTo, offers, pointDestination, type, destinations, types, offersByType} = point;
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
            ${createDestinationSelectTemplate(pointId, pointDestination?.name, destinations)}
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
          ${createOffersBLockTemplate(offersByType, offers)}
          ${createDestinationBlockTemplate(pointDestination)}
        </section>
      </form>
    </li>`;
};

export default class PointEditView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;

  constructor(point = {}, destinations, offers) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this._state = PointEditView.parsePointToState(point, this.#offers, this.#destinations);
    this.#setInnerHandlers();
  }

  setSubmitFormHandler(callback) {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  }

  setCloseFormHandler(callback) {
    this._callback.close = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-input').forEach((input) => {
      input.addEventListener('change', this.#changeTypeHandler);
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitFormHandler(this._callback.submit);
    this.setCloseFormHandler(this._callback.close);
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(PointEditView.parseStateToPoint(this._state));
  };

  #closeHandler = () => {
    this._callback.close();
  };

  #changeTypeHandler = ({target}) => {
    this.updateElement({
      type: target.value,
      offers: [],
      offersByType: this.#offers.find((o) => o.type === target.value).offers,
    });
  };

  get template() {
    return createPointEditTemplate(this._state);
  }

  reset = (point) => {
    this.updateElement(
      PointEditView.parsePointToState(point, this.#offers, this.#destinations),
    );
  };

  static parsePointToState = (point, offers, destinations) => {
    const offersByType = offers.find((o) => o.type === point.type).offers;
    const pointDestination = destinations.find((d) => d.id === point.destination);
    return {
      ...point,
      destinations,
      pointDestination,
      offersByType,
      types: offers.map((offer) => offer.type),
    };
  };

  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.pointDestination;
    delete point.offersByType;
    delete point.types;
    delete point.destinations;
    return point;
  };
}
