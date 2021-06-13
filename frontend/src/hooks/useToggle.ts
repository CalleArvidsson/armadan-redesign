import { useReducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: boolean) => (typeof nextValue === 'boolean' ? nextValue : !state);

const useToggle = (initValue = false): [boolean, (nextValue?: boolean) => void] => useReducer(toggleReducer, initValue);

export default useToggle;
