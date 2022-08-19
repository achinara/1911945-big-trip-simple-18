const createTypesSelectTemplate = (types) =>
  types.reduce((acc, type) => `${acc}
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
    </div>
  `, '');

export {createTypesSelectTemplate};
