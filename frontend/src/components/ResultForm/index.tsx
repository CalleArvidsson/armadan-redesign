import { FC, useState, useMemo } from 'react';
import { Button, Input, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormHeader from 'components/FormHeader';
import { Week, Player } from 'types';
import PlayerRow, { fragments as prFragments } from './PlayerRow';

const useStyles = makeStyles(() => {});

interface Props {
  week: Week;
  players: Player[];
}

type FilteredPlayer = Player & { origIndex: number };

const ResultForm: FC<Props> = ({ week, players }) => {
  const [searchTerm, setSearch] = useState('');
  const regex = new RegExp(`${searchTerm}`, 'i');
  const filteredPlayers = useMemo(
    () =>
      players.reduce<FilteredPlayer[]>((acc, p, idx) => {
        if (regex.test(p.name)) {
          acc.push({
            ...p,
            origIndex: idx,
          });
        }

        return acc;
      }, []),
    [searchTerm]
  );

  return (
    <>
      <FormHeader title={`${week.nr}`}>
        <div>
          <Input onChange={(e) => setSearch(e.target.value)} value={searchTerm} placeholder="Sök" />
          <Button color="secondary" variant="outlined" size="small" onClick={() => {}}>
            Spara
          </Button>
        </div>
      </FormHeader>
      <Grid container spacing={1} direction="column">
        {filteredPlayers.map((player) => (
          <Grid item>
            <PlayerRow key={player.name} player={player} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const fragments = {
  resultForm: `
    fragment PlayerFragment on Query {
      players {
        id
        ...PlayerRowFragment
      }
    }
    ${prFragments.playerRow}
  `,
};

export default ResultForm;
