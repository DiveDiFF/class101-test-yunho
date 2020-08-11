import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#303f9f',
    },
    secondary: {
      main: '#c51162',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#fff',
    },
  },
});

const Root = () => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </BrowserRouter>
);

export default Root;