import React, { lazy } from 'react';
import classNames from 'classnames';
import { DocumentNode, useQuery } from '@apollo/client';
import { Container, CircularProgress } from '@material-ui/core';

interface WithQueryOptions {
  errorText?: string;
  useContainer?: boolean;
}

interface CompProps<T> {
  data: T;
}

interface QueryData<U> {
  query: DocumentNode;
  variables?: U;
}

interface ReturnCompProps<U> {
  queryVariables?: U;
}

function withQuery<T, U>(
  Comp: React.FC<CompProps<T>>,
  queryData: QueryData<U>,
  { errorText, useContainer = true }: WithQueryOptions = {}
) {
  return function <C extends ReturnCompProps<U>>({ queryVariables, ...props }: C): JSX.Element {
    const { query, variables } = queryData;
    const { loading, error, data } = useQuery<T, U>(query, { variables: variables || queryVariables });

    let content = <CircularProgress role="status" />;
    const classes = classNames('main', { loading });

    if (error) {
      const Error = lazy(() => import(/* webpackChunkName: "Error" */ 'components/Error'));

      content = <Error text={errorText} />;
    } else if (data) {
      content = <Comp data={data} {...props} />;
    }

    return (
      <>
        {useContainer ? (
          <Container maxWidth="md" className={classes}>
            {content}
          </Container>
        ) : (
          content
        )}
      </>
    );
  };
}

export default withQuery;
