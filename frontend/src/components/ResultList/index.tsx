import { gql } from '@apollo/client';

const ResultList = () => {};

export const fragments = {
  list: gql`
    fragment ResultListFragment on Result {
      
    }
  `,
};

export default ResultList;
