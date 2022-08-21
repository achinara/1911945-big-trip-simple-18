const createTypesSelectTemplate = (active, types) =>
  types.reduce((acc, type) => {
    const input = (active === type)
      ? `<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" checked>`
      : `<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">`;

    return `${acc}
      <div class="event__type-item">
        ${input}
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
      </div>
    `;
  }, '');

export {createTypesSelectTemplate};
