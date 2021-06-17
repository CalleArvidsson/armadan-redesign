import { gql, Reference } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, RemoveInput, DeletedId } from 'types';

export const REMOVE_TEE = gql`
  mutation RemoveTee($id: ID!) {
    removeTee(id: $id) {
      deletedId
    }
  }
`;

interface Options extends MutationOptions {
  courseId: string;
}

const useRemoveTee = ({ courseId, ...rest }: Options = { courseId: '' }) =>
  useMutationWithNotify<{ removeTee: DeletedId }, RemoveInput>({
    query: REMOVE_TEE,
    successText: 'Tee borttagen',
    update: (
      cache,
      {
        data: {
          removeTee: { deletedId },
        },
      }
    ) => {
      cache.modify({
        id: cache.identify({
          id: courseId,
          __typename: 'Course',
        }),
        fields: {
          tees: (existingTees: Reference[] = [], { readField }) =>
            existingTees.filter((teeRef: Reference) => deletedId !== readField('id', teeRef)),
        },
      });

      cache.modify({
        id: cache.identify({
          id: deletedId,
          __typename: 'Tee',
        }),
        fields(val, { DELETE }) {
          return DELETE;
        },
      });

      // cache.gc();
    },
    ...rest,
  });

export default useRemoveTee;
