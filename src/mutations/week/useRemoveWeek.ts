import { gql, Reference } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, RemoveInput, DeletedId } from 'types';

export const REMOVE_WEEK = gql`
  mutation RemoveWeek($id: ID!) {
    removeWeek(id: $id) {
      deletedId
    }
  }
`;

const useRemoveWeek = (options: MutationOptions = {}) =>
  useMutationWithNotify<{ removeWeek: DeletedId }, RemoveInput>({
    query: REMOVE_WEEK,
    successText: 'Vecka borttagen',
    update: (
      cache,
      {
        data: {
          removeWeek: { deletedId },
        },
      }
    ) => {
      cache.modify({
        fields: {
          schedule: (existingWeeks: Reference[] = [], { readField }) =>
            existingWeeks.filter((weekRef: Reference) => deletedId !== readField('id', weekRef)),
        },
      });

      cache.modify({
        id: cache.identify({ id: deletedId, __typename: 'Week' }),
        fields(val, { DELETE }) {
          return DELETE;
        },
      });
    },
    ...options,
  });

export default useRemoveWeek;
