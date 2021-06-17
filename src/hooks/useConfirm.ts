import { useContext } from 'react';
import { ConfirmContext } from 'contexts/confirmContext';

const useConfirm = () => useContext(ConfirmContext);

export default useConfirm;
