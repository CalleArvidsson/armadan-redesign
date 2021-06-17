import { getNewHcp, getStrokes, getHcpGroup, getPricePool, getNrOfWinners } from '../scoreUtils';

const mockCourse = {
  cr: 70.5,
  slope: 129,
  par: 72,
};

describe('scoreUtils', () => {
  describe('getNewHcp', () => {
    it('returns old hcp if score is within buffer zone', () => {
      expect(getNewHcp(10.0, 72, 72)).toEqual(10.0);
    });

    it('returns hcp + 0.1 if score is higher than buffer zone', () => {
      expect(getNewHcp(-0.3, 72, 80)).toEqual(-0.2);
      expect(getNewHcp(0.2, 72, 78)).toEqual(0.3);
      expect(getNewHcp(5.1, 72, 78)).toEqual(5.2);
    });

    it('returns new hcp if score is lower than buffer zone', () => {
      expect(getNewHcp(0, 72, 70)).toEqual(-0.2);
      expect(getNewHcp(10.0, 72, 70)).toEqual(9.6);
      expect(getNewHcp(12.6, 72, 68)).toEqual(11.4);
    });
  });

  describe('getStrokes', () => {
    it('returns correct nr of strokes based on hcp', () => {
      expect(getStrokes(-1.9, mockCourse.cr, mockCourse.slope, mockCourse.par)).toEqual(-4);
      expect(getStrokes(6.5, mockCourse.cr, mockCourse.slope, mockCourse.par)).toEqual(6);
      expect(getStrokes(16.4, mockCourse.cr, mockCourse.slope, mockCourse.par)).toEqual(17);
    });

    it('returns max 18 strokes if hcp is too high', () => {
      expect(getStrokes(20.5, mockCourse.cr, mockCourse.slope, mockCourse.par)).toEqual(18);
      expect(getStrokes(27.2, mockCourse.cr, mockCourse.slope, mockCourse.par)).toEqual(18);
    });
  });

  describe('getHcpGroup', () => {
    it('should return correct hcp group based on HCP', () => {
      expect(getHcpGroup(3.4)).toEqual(0.1);
      expect(getHcpGroup(9.9)).toEqual(0.2);
      expect(getHcpGroup(14.3)).toEqual(0.3);
      expect(getHcpGroup(22.1)).toEqual(0.4);
      expect(getHcpGroup(34.5)).toEqual(0.5);
    });
  });

  describe('getPricePool', () => {
    it('should return price pool based on nr of players', () => {
      expect(getPricePool(37)).toEqual(1850);
    });
  });

  describe('getNrOfWinners', () => {
    it('should return nr of winners based on players', () => {
      expect(getNrOfWinners(4)).toEqual(1);
      expect(getNrOfWinners(13)).toEqual(2);
      expect(getNrOfWinners(27)).toEqual(3);
      expect(getNrOfWinners(43)).toEqual(4);
    });
  });
});
