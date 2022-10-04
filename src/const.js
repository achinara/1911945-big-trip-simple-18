const SortType = {
  DEFAULT: 'default',
  PRICE: 'price',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

export {FilterType, SortType, UserAction, UpdateType};
