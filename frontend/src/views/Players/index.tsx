import { FC } from 'react';
import { gql } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PlayerList, { fragments } from 'components/PlayerList';
import withQuery from 'common/withQuery';
import { Player } from 'types';

const PLAYERS_QUERY = gql`
  query PlayersQuery {
    ...ListFragment
  }
  ${fragments.list}
`;

interface Props {
  data: {
    players: Player[];
  };
}

const PlayerSchema = yup.object().shape({
  players: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().notRequired(),
        userId: yup.string().notRequired(),
        firstname: yup.string().required().trim(),
        lastname: yup.string().required().trim(),
        email: yup.string().email().required().trim(),
        hcp: yup.number().required(),
      })
    )
    .ensure(),
});

const PlayerPage: FC<Props> = ({ data }) => {
  const form = useForm({
    defaultValues: { players: data.players },
    resolver: yupResolver(PlayerSchema),
  });

  return (
    <FormProvider {...form}>
      <PlayerList query={PLAYERS_QUERY} origPlayers={data.players} />
    </FormProvider>
  );
};

export default withQuery(PlayerPage, { query: PLAYERS_QUERY });
