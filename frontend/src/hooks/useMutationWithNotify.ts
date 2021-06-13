import { DocumentNode, MutationHookOptions, useMutation } from '@apollo/client';
import useNotify from './useNotify';

interface Options extends MutationHookOptions {
  query: DocumentNode;
  successText: string;
  errorText?: string;
}

function useMutationWithNotify<T, U>({ query, update, successText, errorText, onCompleted, onError }: Options) {
  const { success, error } = useNotify();

  return useMutation<T, U>(query, {
    update,
    onCompleted(data) {
      success(successText);
      onCompleted?.(data);
    },
    onError(e) {
      error(errorText);
      onError?.(e);
    },
  });
}

export default useMutationWithNotify;
