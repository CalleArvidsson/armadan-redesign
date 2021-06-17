import { memo, FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@material-ui/core';
import { Player } from 'types';

interface Props {
  index: number;
  player: Player;
}

const RoundForm: FC<Props> = ({ index, player }) => {
  const { getValues, setValue } = useFormContext();
  const score = getValues(`rounds[${index}].playerId`) ?? player.id;

  return (
    <div>
      {player.name}
      <Input defaultValue={score} onChange={(e) => setValue(`rounds[${index}].playerId`, e.target.value)} />
    </div>
  );
};

export default memo(RoundForm);
