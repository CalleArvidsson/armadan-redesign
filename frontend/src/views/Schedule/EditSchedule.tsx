import { FC } from 'react';
import { gql } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ScheduleForm, { fragments } from 'components/ScheduleForm';
import withQuery from 'common/withQuery';
import { Week as WeekType, Course as CourseType } from 'types';

const EDIT_SCHEDULE_QUERY = gql`
  query EditScheduleQuery {
    ...ScheduleFragment
  }
  ${fragments.schedule}
`;

interface Props {
  data: {
    schedule: WeekType[];
    courses: CourseType[];
  };
}

const ScheduleSchema = yup.object().shape({
  weeks: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().notRequired(),
        nr: yup.number().required().positive().min(1).max(52),
        course: yup.object().shape({
          id: yup.string().required(),
        }),
        tee: yup.object().shape({
          id: yup.string().required(),
        }),
      })
    )
    .ensure(),
});

const EditSchedule: FC<Props> = ({ data }) => {
  const form = useForm({
    defaultValues: { weeks: data.schedule },
    resolver: yupResolver(ScheduleSchema),
  });

  return (
    <FormProvider {...form}>
      <ScheduleForm courses={data.courses} query={EDIT_SCHEDULE_QUERY} weeks={data.schedule} />
    </FormProvider>
  );
};

export default withQuery(EditSchedule, { query: EDIT_SCHEDULE_QUERY });
