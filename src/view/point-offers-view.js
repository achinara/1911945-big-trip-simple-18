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

export {createOffersTemplate};
