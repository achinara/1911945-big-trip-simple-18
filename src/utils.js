import dayjs from 'dayjs';

const formatFullTime = (date) => dayjs(date).isValid() ? dayjs(date).format('DD/MM/YY HH:mm') : '';

const formatMonthAndDate = (date) => dayjs(date).isValid() ? dayjs(date).format('MMM DD') : '';

const formatHourAndMinute = (date) => dayjs(date).isValid() ? dayjs(date).format('HH:mm') : '';

export {formatFullTime, formatMonthAndDate, formatHourAndMinute};
