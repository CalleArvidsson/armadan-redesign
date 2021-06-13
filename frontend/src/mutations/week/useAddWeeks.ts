import { DocumentNode, gql } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, Week, AddWeekInput } from 'types';

const ADD_WEEKS = gql`
  mutation AddWeeks($input: AddWeekInput!) {
    addWeeks(input: $input) {
      id
      nr
      course {
        id
        name
      }
      tee {
        id
        name
      }
    }
  }
`;

type Opts = MutationOptions & { writeQuery?: DocumentNode };

const useAddWeeks = ({ writeQuery, ...options }: Opts = {}) =>
  useMutationWithNotify<{ addWeeks: Week[] }, { input: AddWeekInput }>({
    query: ADD_WEEKS,
    successText: 'Veckor sparade',
    update: (cache, { data }) => {
      if (!data || !writeQuery) {
        return;
      }

      cache.writeQuery({
        query: writeQuery,
        data: { schedule: data.addWeeks },
      });
    },
    ...options,
  });

export default useAddWeeks;
