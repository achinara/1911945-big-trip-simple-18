import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {capitalize} from '../utils/common';

import {formatFullTime} from '../utils/format-date';

const createTypesSelectTemplate = (pointId, active, types) => types.reduce((acc, type) =>
  `${acc}
      <div class="event__type-item">
        <input id="event-type-${type}-${pointId}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${(active === type) ? 'checked' : ''}>
        <label class="event__type-label event__type-label--${type}" for="event-type-${type}-${pointId}">${capitalize(type)}</label>
      </div>
    `, '');

const createDestinationSelectTemplate = (pointId, pointType, current, destinations) => {
  const options = destinations.reduce((acc, dest) => `${acc}
    <option value="${dest.name}"></option>
  `, '');

  return `
    <div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-${pointId}">${pointType}</label>
     <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${current}" list="destination-list-${pointId}">
      <datalist id="destination-list-${pointId}">${options}</datalist>
    </div>
  `;
};

const createOffersBLockTemplate = (offers, offersIds) => {
  if (!offers.length) {
    return '';
  }
  const items = offers.reduce((acc, offer) =>
    `${acc}
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${offersIds.includes(offer.id) ? 'checked' : ''} >
        <label class="event__offer-label" for="${offer.id}">
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

          ${createDestinationSelectTemplate(pointId, type, pointDestination?.name, destinations)}

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${formatFullTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
            <input class="event__input event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${formatFullTime(dateTo)}">
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-${pointId}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${basePrice}">
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

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-input').forEach((input) => {
      input.addEventListener('change', this.#changeTypeHandler);
    });
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => {
      input.addEventListener('change', this.#changeOfferHandler);
    });
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(PointEditView.parseStateToPoint(this._state));
  };

  #closeHandler = () => {
    this._callback.close();
  };

  #changePriceHandler = ({target: {value}}) => {
    this.updateElement({
      basePrice: value,
    });
  };

  #changeOfferHandler = ({target: {id, checked}}) => {
    const offers = [...this._state.offers];
    const index = offers.findIndex((o) => o === id);
    if (checked) {
      offers.push(id);
    } else {
      offers.splice(index, 1);
    }
    this.updateElement({
      offers,
    });
  };

  #changeTypeHandler = ({target: {value}}) => {
    this.updateElement({
      type: value,
      offers: [],
      offersByType: this.#offers.find((o) => o.type === value).offers,
    });
  };

  #changeDestinationHandler = ({target: {value}}) => {
    const selected = this.#destinations.find((d) => d.name === value);
    this.updateElement({
      destination: selected?.id || '',
      pointDestination: selected,
    });
  };

  setSubmitFormHandler(callback) {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  }

  setCloseFormHandler(callback) {
    this._callback.close = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);
  }

  reset = (point) => {
    this.updateElement(
      PointEditView.parsePointToState(point, this.#offers, this.#destinations),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitFormHandler(this._callback.submit);
    this.setCloseFormHandler(this._callback.close);
  };

  get template() {
    return createPointEditTemplate(this._state);
  }

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
