import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-unresolved
import { Overrides as CoreOverrides } from '@material-ui/core/styles/overrides';
import { SnackbarProvider } from 'notistack';
import { CSSProperties } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { AuthProvider } from 'contexts/authContext';
import { ConfirmProvider } from 'contexts/confirmContext';
import App from 'components/App';
import client from './client';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    sizes: {
      drawerBtnWidth: string;
      navbarHeight: string;
    };
  }
  interface ThemeOptions {
    sizes?: {
      drawerBtnWidth?: string;
      navbarHeight?: string;
    };
  }
}

type TextEditorClassKey = 'root' | 'container' | 'editor' | 'placeHolder';

interface Overrides extends CoreOverrides {
  MUIRichTextEditor?: Partial<Record<TextEditorClassKey, CSSProperties | (() => CSSProperties)>> | undefined;
}

const overrides: Overrides = {
  MuiContainer: {
    root: {
      paddingTop: '16px',
      position: 'relative',

      '&.main': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'scroll',

        '&.loading': {
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
  },
  MUIRichTextEditor: {
    root: {
      border: '1px solid rgba(0, 0, 0, 0.87)',
      borderRadius: 4,
    },
    container: {
      margin: 0,
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
    },
    editor: {
      height: 250,
      maxHeight: 250,
      overflow: 'auto',
    },
    placeHolder: {
      height: 100,
      margin: 0,
      padding: 0,
      width: 800,
      top: 56,
    },
  },
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#37474f' },
    secondary: { main: '#f50057' },
  },
  overrides,
  sizes: {
    drawerBtnWidth: '4.5rem',
    navbarHeight: '3.5rem',
  },
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <AuthProvider>
            <ConfirmProvider>
              <CssBaseline />
              <App />
            </ConfirmProvider>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
