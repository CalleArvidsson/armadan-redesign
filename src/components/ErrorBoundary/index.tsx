import { lazy, Component } from 'react';

interface State {
  hasError: boolean;
}

interface Props {
  errorText?: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children, errorText } = this.props;

    if (hasError) {
      const Error = lazy(() => import(/* webpackChunkName: "Error" */ 'components/Error'));

      return <Error text={errorText} />;
    }

    return children;
  }
}

export default ErrorBoundary;
