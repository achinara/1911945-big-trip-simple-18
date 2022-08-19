const createDestinationSelectTemplate = (current, destinations) => {
  const options = destinations.reduce((acc, dest) => `${acc}
    <option value="${dest.name}"></option>
  `, '');

  return `
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${current}" list="destination-list-1">
    <datalist id="destination-list-1">${options}</datalist>
  `;
};

export {createDestinationSelectTemplate};
