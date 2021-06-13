import { gql } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, Course, AddCourseInput } from 'types';
import { COURSES_QUERY } from 'views/Courses';

const ADD_COURSE = gql`
  mutation AddCourse($input: AddCourseInput!) {
    addCourse(input: $input) {
      id
      name
      par
      holes {
        id
      }
      tees {
        id
      }
    }
  }
`;

const useAddCourse = (options: MutationOptions = {}) =>
  useMutationWithNotify<{ addCourse: Course }, { input: AddCourseInput }>({
    query: ADD_COURSE,
    successText: 'Bana tillagd',
    update: (cache, { data: { addCourse: newData } }) => {
      cache.modify({
        fields: {
          courses: (existingCourses = []) => {
            const newCourseRef = cache.writeFragment({
              data: newData,
              fragment: gql`
                fragment NewCourse on Course {
                  id
                  name
                  par
                  holes {
                    id
                  }
                  tees {
                    id
                  }
                }
              `,
            });

            return [...existingCourses, newCourseRef];
          },
        },
      });
    },
    ...options,
  });

export default useAddCourse;
