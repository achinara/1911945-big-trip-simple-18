import dayjs from 'dayjs';

const capitalize = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const isFuturePoint = (date) => date && (dayjs().isAfter(date, 'D') || dayjs().isSame(date, 'D'));
const isActivePoint = (dateTo) => dateTo && dayjs().isAfter(dateTo, 'D');

export {capitalize, isFuturePoint, isActivePoint};

