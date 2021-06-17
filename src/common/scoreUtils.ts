const getHcpGroup = (hcp: number) => {
  if (hcp <= 4.4) {
    return 0.1;
  }

  if (hcp <= 11.4) {
    return 0.2;
  }

  if (hcp <= 18.4) {
    return 0.3;
  }

  if (hcp <= 26.4) {
    return 0.4;
  }

  return 0.5;
};

const getPricePool = (players: number) => 50 * players;

const getNrOfWinners = (players: number) => {
  if (players <= 10) {
    return 1;
  }

  if (players <= 20) {
    return 2;
  }

  if (players <= 30) {
    return 3;
  }

  return 4;
};

const getStrokes = (hcp: number, cr: number, slope: number, par: number) =>
  Math.min(Math.round(hcp * (slope / 113) + (cr - par)), 18);

const getNewHcp = (hcp: number, par: number, total: number) => {
  if (total < par) {
    return Math.round((hcp - (par - total) * getHcpGroup(hcp)) * 10) / 10;
  }

  if (total > par + getHcpGroup(hcp) * 10) {
    return Math.round((hcp + 0.1) * 10) / 10;
  }

  return hcp;
};

export { getStrokes, getNewHcp, getPricePool, getNrOfWinners, getHcpGroup };
