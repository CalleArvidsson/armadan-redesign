import MockDate from 'mockdate';
import { getWeekDates, isMonday, getCurrentWeek } from '../dateUtils';

describe('dateUtils', () => {
  afterEach(() => {
    MockDate.reset();
  });

  describe('getWeekDates', () => {
    it('should return a formatted string with correct dates', () => {
      MockDate.set('2020-01-01');

      const weekDates = getWeekDates(20);

      expect(weekDates).toEqual(expect.stringMatching('12/5 - 17/5'));
    });
  });

  describe('isMonday', () => {
    it('should return false if current day is not Monday', () => {
      MockDate.set('2020-04-05');
      expect(isMonday()).toBe(false);
    });

    it('should return true if current day is Monday', () => {
      MockDate.set('2020-04-13');
      expect(isMonday()).toBe(true);
    });
  });

  describe('getCurrentWeek', () => {
    it('should return current week', () => {
      MockDate.set('2020-08-12');
      expect(getCurrentWeek()).toBe(33);

      MockDate.set('2020-02-29');
      expect(getCurrentWeek()).toBe(9);
    });
  });
});
