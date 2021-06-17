import { FC } from 'react';
import { gql } from '@apollo/client';
import { Input, Typography, Paper, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext } from 'react-hook-form';
import range from 'lodash/range';
import has from 'lodash/has';
import { Hole } from 'types';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tableBox: {
    display: 'flex',
  },
  table: {
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
  hidden: {
    display: 'none',
  },
  nr: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface Props {
  holes?: Hole[];
}

const HoleForm: FC<Props> = ({ holes = [] }) => {
  const classes = useStyles();
  const { register, errors } = useFormContext();

  const renderHoleTable = (start: number, end: number) => (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Nr</TableCell>
          <TableCell>Par</TableCell>
          <TableCell>Index</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {range(start, end).map((nr, i) => {
          const hole = holes.find((h) => h.nr === nr);
          const index = start - 1 + i;

          return (
            <TableRow key={`holes-${nr}`}>
              <TableCell align="center">
                <Input
                  className={classes.hidden}
                  defaultValue={nr}
                  name={`holes[${index}].nr`}
                  autoComplete="off"
                  inputRef={register()}
                />
                <Input
                  className={classes.hidden}
                  defaultValue={hole?.id}
                  name={`holes[${index}].id`}
                  autoComplete="off"
                  inputRef={register()}
                />
                <span className={classes.nr}>{nr}</span>
              </TableCell>
              <TableCell>
                <Input
                  error={has(errors?.holes?.[index], 'par')}
                  defaultValue={hole ? hole.par : ''}
                  placeholder="Par"
                  name={`holes[${index}].par`}
                  autoComplete="off"
                  inputRef={register()}
                />
              </TableCell>
              <TableCell>
                <Input
                  error={has(errors?.holes?.[index], 'index')}
                  defaultValue={hole ? hole.index : ''}
                  placeholder="Index"
                  name={`holes[${index}].index`}
                  autoComplete="off"
                  inputRef={register()}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  return (
    <Paper square className={classes.container}>
      <Typography variant="h6">Hål</Typography>
      <div className={classes.tableBox}>
        {renderHoleTable(1, 10)}
        {renderHoleTable(10, 19)}
      </div>
    </Paper>
  );
};

export const fragments = {
  hole: gql`
    fragment HoleFormFragment on Hole {
      id
      nr
      par
      index
    }
  `,
};

export default HoleForm;
