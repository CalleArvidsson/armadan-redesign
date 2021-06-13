import { FC } from 'react';
import { gql } from '@apollo/client';
import { Paper, Grid, Input, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import has from 'lodash/has';
import { useFormContext } from 'react-hook-form';
import { Player, PartialBy } from 'types';

interface Props {
  player: Omit<PartialBy<Player, 'id' | 'userId'>, 'points' | 'name'>;
  index: number;
  onDelete(): void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  iconButton: {
    padding: 0,
    height: 35,
    width: 35,
  },
  flex: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  hidden: {
    display: 'none',
  },
}));

const PlayerForm: FC<Props> = ({ player, index, onDelete }) => {
  const classes = useStyles();
  const { register, errors } = useFormContext();

  return (
    <Paper square className={classes.paper}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <Input
            className={classes.hidden}
            defaultValue={player?.id}
            name={`players[${index}].id`}
            autoComplete="off"
            inputRef={register()}
          />
          <Input
            className={classes.hidden}
            defaultValue={player?.userId}
            name={`players[${index}].userId`}
            autoComplete="off"
            inputRef={register()}
          />
          <Input
            fullWidth
            error={has(errors?.players?.[index], 'firstname')}
            id="firstname"
            placeholder="Förnamn"
            name={`players[${index}].firstname`}
            defaultValue={player.firstname}
            autoComplete="off"
            inputRef={register()}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            fullWidth
            error={has(errors?.players?.[index], 'lastname')}
            id="lastname"
            placeholder="Efternamn"
            name={`players[${index}].lastname`}
            defaultValue={player.lastname}
            autoComplete="off"
            inputRef={register()}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            fullWidth
            error={has(errors?.players?.[index], 'email')}
            id="email"
            placeholder="Email"
            name={`players[${index}].email`}
            defaultValue={player.email}
            autoComplete="off"
            inputRef={register()}
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            fullWidth
            error={has(errors?.players?.[index], 'hcp')}
            id="hcp"
            type="number"
            inputProps={{
              step: 0.1,
            }}
            placeholder="HCP"
            name={`players[${index}].hcp`}
            defaultValue={player.hcp?.toFixed?.(1) || 0.0}
            autoComplete="off"
            inputRef={register()}
          />
        </Grid>
        <Grid item xs={1} className={classes.flex}>
          <IconButton aria-label="delete" className={classes.iconButton} onClick={onDelete}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const fragments = {
  player: gql`
    fragment PlayerFragment on Player {
      id
      userId
      lastname
      firstname
      email
      hcp
    }
  `,
};

export default PlayerForm;
