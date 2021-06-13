import { DocumentNode, gql } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, Player, AddPlayersInput } from 'types';

const ADD_PLAYERS = gql`
  mutation AddPlayers($input: AddPlayerInput!) {
    addPlayers(input: $input) {
      id
      userId
      firstname
      lastname
      name
      email
      hcp
    }
  }
`;

type Opts = MutationOptions & { writeQuery?: DocumentNode };

const useAddPlayers = ({ writeQuery, ...options }: Opts = {}) =>
  useMutationWithNotify<{ addPlayers: Player[] }, { input: AddPlayersInput }>({
    query: ADD_PLAYERS,
    successText: 'Spelare sparade',
    update: (cache, { data }) => {
      if (!data || !writeQuery) {
        return;
      }

      cache.writeQuery({
        query: writeQuery,
        data: { players: data.addPlayers },
      });
    },
    ...options,
  });

export default useAddPlayers;
