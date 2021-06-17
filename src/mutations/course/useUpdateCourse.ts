import { gql } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, Course, UpdateCourseInput } from 'types';

const UPDATE_COURSE = gql`
  mutation UpdateCourse($input: UpdateCourseInput!) {
    updateCourse(input: $input) {
      id
      name
      par
      holes {
        id
        nr
        par
        index
      }
      tees {
        id
        name
        cr
        slope
      }
    }
  }
`;

const useUpdateCourse = (options: MutationOptions = {}) =>
  useMutationWithNotify<{ updateCourse: Course }, { input: UpdateCourseInput }>({
    query: UPDATE_COURSE,
    successText: 'Bana sparad',
    ...options,
  });

export default useUpdateCourse;
