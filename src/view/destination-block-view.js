const createDestinationBlockTemplate = (destination) => {
  const {pictures, description} = destination;
  if (!destination) {
    return '';
  }
  const pics = pictures.reduce((acc, pic)=>`${acc}
    <img class="event__photo" src="${pic.src}" alt="${pic.description}">
  `, '');

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">${pics}</div>
      </div>
    </section>`;
};

export {createDestinationBlockTemplate};
