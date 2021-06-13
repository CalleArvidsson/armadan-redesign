import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import find from 'lodash/find';
import withQuery from 'common/withQuery';
import ResultForm from 'components/ResultForm';
import { Week as WeekType, Result, Player, Round } from 'types';

const RESULT_PAGE_QUERY = gql`
  query ResultPageQuery($id: ID!, $hcpWeek: ID) {
    week(id: $id) {
      id
      nr
      course {
        name
        holes {
          id
          nr
          par
        }
      }
      tee {
        name
        cr
        slope
      }
    }
    result(weekId: $id) {
      id
      rounds {
        id
        player {
          id
        }
        scores {
          id
          strokes
          hole {
            id
            nr
          }
        }
      }
    }
    players {
      id
      name
      hcp(weekId: $hcpWeek)
    }
  }
`;

interface ResultQuery {
  week: WeekType;
  result?: Result;
  players: Player[];
}

interface Props {
  data: ResultQuery;
}

interface QueryVars {
  id: string;
  hcpWeek?: string;
}

const ResultSchema = yup.object().shape({
  rounds: yup.array().of(
    yup.object().shape({
      id: yup.string().notRequired(),
      playerId: yup.string().required(),
      scores: yup.array().of(
        yup.object().shape({
          id: yup.string().notRequired(),
          holeId: yup.string().required(),
          score: yup.number().required(),
        })
      ),
    })
  ),
});

const generateDefaultValues = (players: Player[], rounds: Round[] = []) =>
  players.reduce<any[]>((acc, player) => {
    const round = find(rounds, (r) => r.player.id === player.id);

    if (!round) {
      acc.push({
        playerId: player.id,
        scores: [],
      });
    } else {
      acc.push({
        id: round.id,
        playerId: player.id,
        scores: round.scores,
      });
    }

    return acc;
  }, []);

const EditResultsPage: FC<Props> = ({ data }) => {
  const form = useForm({
    defaultValues: { rounds: generateDefaultValues(data.players, data.result?.rounds) },
    resolver: yupResolver(ResultSchema),
  });

  useEffect(() => {
    data.players.forEach((_, idx) => {
      form.register(`rounds[${idx}].playerId`);
    });
  }, [form]);

  return (
    <FormProvider {...form}>
      <ResultForm week={data.week} players={data.players} />
    </FormProvider>
  );
};

const PageWithQuery = withQuery<ResultQuery, QueryVars>(
  EditResultsPage,
  { query: RESULT_PAGE_QUERY },
  { useContainer: false }
);

const Page = () => {
  const params = useParams<{ weekId: string; mode: string }>();
  const extraVars = params.mode === 'edit' ? { hcpWeek: params.weekId } : {};

  return <PageWithQuery queryVariables={{ id: params.weekId, ...extraVars }} />;
};

export default Page;
