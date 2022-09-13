import AbstractView from '../framework/view/abstract-view';
import {formatMonthAndDate, formatHourAndMinute} from '../utils/format-date';

const createOffersTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }
  return offers.reduce((acc, offer)=>`${acc}
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `, '');
};

const createPointTemplate = (point) => {
  const {type, basePrice, dateFrom, dateTo, destination, offers} = point;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${formatMonthAndDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${formatHourAndMinute(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${formatHourAndMinute(dateTo)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">${createOffersTemplate(offers)}</ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {
  #point = null;

  constructor(point, destinations, offers) {
    super();
    const offersByType = offers.find((o) => o.type === point.type).offers;
    this.#point = {
      ...point,
      destination: destinations.find((d) => d.id === point.destination),
      offers: offersByType.filter(({id}) => point.offers.includes(id)),
    };
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = () => {
    this._callback.editClick();
  };
}
