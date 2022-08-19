const createOffersEditTemplate = ({offers}) => {
  if (!offers.length) {
    return '';
  }
  const items = offers.reduce((acc, offer, index)=> {
    const input = (index === 1 || index === 3)
      ? '<input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>'
      : '<input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">';
    const item = `
      <div class="event__offer-selector">
       ${input}
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
  `;
    return acc + item;
  }, '');
  return `
   <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">${items}</div>
  </section>
  `;
};

export {createOffersEditTemplate};
