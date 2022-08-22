import dayjs from 'dayjs';
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValueFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

const getFullTime = (date) => dayjs(date).isValid() ? dayjs(date).format('DD/MM/YY HH:mm') : '';

const getMonth = (date) => dayjs(date).isValid() ? dayjs(date).format('MMM DD') : '';

const getTimeHourAndMinute = (date) => dayjs(date).isValid() ? dayjs(date).format('HH:mm') : '';

export {getRandomInteger, getRandomValueFromArray, getFullTime, getMonth, getTimeHourAndMinute};