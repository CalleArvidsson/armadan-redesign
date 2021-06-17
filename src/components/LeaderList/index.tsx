import { FC } from 'react';
import { gql } from '@apollo/client';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Leader } from 'types';

interface Props {
  leaderboard: Leader[];
}

const LeaderList: FC<Props> = ({ leaderboard }) => (
  <TableContainer>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell padding="none">Spelare</TableCell>
          <TableCell align="right">Rundor</TableCell>
          <TableCell align="right">Poäng</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leaderboard.map((leader, index) => (
          <TableRow key={leader.name} hover>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell padding="none">{leader.name}</TableCell>
            <TableCell align="right">{leader.rounds}</TableCell>
            <TableCell align="right">{leader.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export const fragments = {
  leaders: gql`
    fragment LeaderList on Leader {
      name
      rounds
      points
    }
  `,
};

export default LeaderList;
