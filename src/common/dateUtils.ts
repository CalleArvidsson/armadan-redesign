import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const getWeekDates = (nr: number) => {
  if (!nr) {
    return '*/* - */*';
  }

  const firstWeekDay = dayjs().isoWeek(nr).isoWeekday(2);
  const lastWeekDay = dayjs().isoWeek(nr).isoWeekday(7);

  if (!firstWeekDay.isValid() || !lastWeekDay.isValid()) {
    return '*/* - */*';
  }

  return `${firstWeekDay.format('D/M')} - ${lastWeekDay.format('D/M')}`;
};

const getCurrentWeek = () => dayjs().isoWeek();

const isMonday = () => dayjs().isoWeekday() === 1;

export { getWeekDates, getCurrentWeek, isMonday };
