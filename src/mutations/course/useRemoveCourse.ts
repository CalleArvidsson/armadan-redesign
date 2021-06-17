import { gql, Reference } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, DeletedId, RemoveInput } from 'types';

const REMOVE_COURSE = gql`
  mutation RemoveCourse($id: ID!) {
    removeCourse(id: $id) {
      deletedId
    }
  }
`;

const useRemoveCourse = (options: MutationOptions = {}) =>
  useMutationWithNotify<{ removeCourse: DeletedId }, RemoveInput>({
    query: REMOVE_COURSE,
    successText: 'Bana borttagen',
    update: (
      cache,
      {
        data: {
          removeCourse: { deletedId },
        },
      }
    ) => {
      cache.modify({
        fields: {
          course: (courseRef: Reference, { readField, DELETE }) => {
            if (readField('id', courseRef) === deletedId) {
              return DELETE;
            }

            return courseRef;
          },
          courses: (existingCourses: Reference[] = [], { readField }) =>
            existingCourses.filter((courseRef) => deletedId !== readField('id', courseRef)),
        },
      });

      cache.modify({
        id: cache.identify({
          id: deletedId,
          __typename: 'Course',
        }),
        fields(val, { DELETE }) {
          return DELETE;
        },
      });

      cache.gc();
    },
    ...options,
  });

export default useRemoveCourse;
