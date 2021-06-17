import { FC } from 'react';
import { gql } from '@apollo/client';
import { TextField, Button, Typography, Paper, IconButton, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import { useFormContext, useFieldArray } from 'react-hook-form';
import has from 'lodash/has';
import { useRemoveTee } from 'mutations/index';
import useConfirm from 'hooks/useConfirm';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  hidden: {
    display: 'none',
  },
  input: {
    flex: '0 1 50%',

    '& + &': {
      flex: '1',
      marginLeft: theme.spacing(1),
    },
  },
}));

interface Props {
  courseId: string | undefined;
}

const TeeForm: FC<Props> = ({ courseId }) => {
  const classes = useStyles();
  const { register, errors } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: 'tees', keyName: 'keyId' });
  const confirm = useConfirm();
  const [removeTee] = useRemoveTee({
    courseId: courseId as string,
  });

  return (
    <Paper square className={classes.container}>
      <div className={classes.titleBox}>
        <Typography variant="h6">Tees</Typography>
        <Button color="secondary" startIcon={<Add />} variant="outlined" size="small" onClick={() => append({})}>
          Ny tee
        </Button>
      </div>
      {fields.length ? (
        fields.map((tee, index) => (
          <div className={classes.inputBox} key={tee.keyId}>
            <Input
              className={classes.hidden}
              defaultValue={tee?.id}
              name={`tees[${index}].id`}
              autoComplete="off"
              inputRef={register()}
            />
            <TextField
              className={classes.input}
              error={has(errors?.tees?.[index], 'name')}
              margin="normal"
              id="name"
              label="Tee"
              name={`tees[${index}].name`}
              autoComplete="off"
              inputRef={register()}
              defaultValue={tee.name}
            />
            <TextField
              className={classes.input}
              error={has(errors?.tees?.[index], 'cr')}
              margin="normal"
              id="cr"
              label="CR"
              name={`tees[${index}].cr`}
              autoComplete="off"
              inputRef={register()}
              defaultValue={tee.cr}
            />
            <TextField
              className={classes.input}
              error={has(errors?.tees?.[index], 'slope')}
              margin="normal"
              id="slope"
              label="Slope"
              name={`tees[${index}].slope`}
              autoComplete="off"
              inputRef={register()}
              defaultValue={tee.slope}
            />
            <IconButton
              aria-label="delete"
              onClick={() => {
                if (tee.id) {
                  confirm({
                    title: 'Ta bort tee',
                    description: 'Är du säker på att du vill ta bort tee?',
                    onConfirm() {
                      removeTee({ variables: { id: tee.id } });
                    },
                  });
                } else {
                  remove(index);
                }
              }}
            >
              <Delete />
            </IconButton>
          </div>
        ))
      ) : (
        <span>Inga tees tillagda</span>
      )}
    </Paper>
  );
};

export const fragments = {
  tee: gql`
    fragment TeeFormFragment on Tee {
      id
      name
      slope
      cr
    }
  `,
};

export default TeeForm;
