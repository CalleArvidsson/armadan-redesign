import { FC } from 'react';
import { gql } from '@apollo/client';
import { Paper, Grid } from '@material-ui/core';
import { Player } from 'types';

interface Props {
  player: Player;
}

const PlayerRow: FC<Props> = ({ player }) => {
  console.log(player);

  return <Paper square>{player.name}</Paper>;
};

export const fragments = {
  playerRow: gql`
    fragment PlayerRowFragment on Player {
      name
      hcp
    }
  `,
};

export default PlayerRow;
