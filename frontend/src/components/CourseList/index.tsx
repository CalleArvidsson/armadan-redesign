import { FC } from 'react';
import { gql } from '@apollo/client';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Edit, Delete } from '@material-ui/icons';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@material-ui/core';
import useConfirm from 'hooks/useConfirm';
import { useRemoveCourse } from 'mutations/index';
import { Course as CourseType } from 'types';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.background.default,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 0,

    '& + &': {
      marginLeft: theme.spacing(0.5),
    },
  },
  noResults: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
}));

export interface CourseListData {
  courses: CourseType[];
}

interface Props {
  data: CourseListData;
}

const CourseList: FC<Props> = ({ data }) => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const classes = useStyles();
  const confirm = useConfirm();
  const [removeCourse] = useRemoveCourse();

  return (
    <TableContainer square component={Paper}>
      <Table style={{ tableLayout: 'auto' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell width={90} />
            <StyledTableCell>Bana</StyledTableCell>
            <StyledTableCell width={150} align="right">
              Par
            </StyledTableCell>
            <StyledTableCell width={150} align="right">
              Hål
            </StyledTableCell>
            <StyledTableCell width={150} align="right">
              Tees
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.courses?.length ? (
            data.courses.map((node) => (
              <TableRow key={node.id}>
                <TableCell>
                  <IconButton className={classes.iconButton} onClick={() => history.push(`${path}/${node.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    className={classes.iconButton}
                    onClick={() => {
                      confirm({
                        title: 'Ta bort bana',
                        description: `Är du säker på att du vill ta bort ${node.name}?`,
                        onConfirm() {
                          removeCourse({ variables: { id: node.id } });
                        },
                      });
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>{node.name}</TableCell>
                <TableCell align="right">{node.par}</TableCell>
                <TableCell align="right">{node.holes.length}</TableCell>
                <TableCell align="right">{node.tees.length}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className={classes.noResults}>
                <Typography variant="h5">Inga banor inlagda!</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const fragments = {
  courses: gql`
    fragment CourseListFragment on Query {
      courses {
        id
        name
        par
        holes {
          nr
        }
        tees {
          name
        }
      }
    }
  `,
};

export default CourseList;
