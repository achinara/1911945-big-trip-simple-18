import dayjs from 'dayjs';

const capitalize = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const isFuturePoint = (date) => date && (dayjs().isBefore(date, 'day') || dayjs().isSame(date, 'day'));

const isActivePoint = (dateTo) => dateTo && dayjs().isBefore(dateTo, 'day');

export {capitalize, isFuturePoint, isActivePoint};

