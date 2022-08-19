const createOffersTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }
  const lis = offers.reduce((acc, offer)=>`${acc}
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `, '');
  return `<ul class="event__selected-offers">${lis}</ul>`;
};

export {createOffersTemplate};
