import { FC } from 'react';
import { Container, CircularProgress } from '@material-ui/core';

const FallbackLoader: FC = () => (
  <Container maxWidth="md" className="main loading">
    <CircularProgress role="status" />
  </Container>
);

export default FallbackLoader;
