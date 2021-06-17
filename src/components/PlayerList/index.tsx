import { FC } from 'react';
import { gql, DocumentNode } from '@apollo/client';
import { Grid, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Player, AddPlayerInput } from 'types';
import { useAddPlayers } from 'mutations/index';
import FormHeader from 'components/FormHeader';
import PlayerForm, { fragments as formFragments } from './PlayerForm';

interface Props {
  query: DocumentNode;
  origPlayers: Player[];
}

const useStyles = makeStyles((theme) => ({
  btn: {
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const PlayerList: FC<Props> = ({ query, origPlayers }) => {
  const classes = useStyles();
  const { handleSubmit } = useFormContext();
  const { fields, prepend, remove } = useFieldArray<Player, 'keyId'>({
    name: 'players',
    keyName: 'keyId',
  });
  const [addPlayers] = useAddPlayers({ writeQuery: query });

  const onSubmit = ({ players }: { players: AddPlayerInput[] }) => {
    const playersWithDiffs = players.reduce<AddPlayerInput[]>((acc, p) => {
      if (!p.id) {
        acc.push(p);
      } else {
        const player = origPlayers.find((op) => op.id === p.id);
        const diff = p.hcp - (player as Player).hcp;

        acc.push({
          ...p,
          hcpDiff: diff !== 0 ? diff : undefined,
        });
      }

      return acc;
    }, []);

    addPlayers({
      variables: {
        input: {
          players: playersWithDiffs,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader title="Spelare">
        <div>
          <Button
            className={classes.btn}
            color="secondary"
            startIcon={<Add />}
            variant="outlined"
            size="small"
            onClick={() => prepend({})}
          >
            Ny spelare
          </Button>
          <Button className={classes.btn} color="secondary" variant="outlined" size="small" type="submit">
            Spara
          </Button>
        </div>
      </FormHeader>
      <Grid container direction="column" spacing={1}>
        {fields.map(({ keyId, ...player }, index) => (
          <Grid item xs key={keyId}>
            <PlayerForm player={player as Player} index={index} onDelete={() => remove(index)} />
          </Grid>
        ))}
      </Grid>
    </form>
  );
};

export const fragments = {
  list: gql`
    fragment ListFragment on Query {
      players {
        id
        ...PlayerFragment
      }
    }
    ${formFragments.player}
  `,
};

export default PlayerList;
