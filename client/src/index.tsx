import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme, { muiTheme } from './resources/theme';
import { MuiThemeProvider } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import { CookiesProvider } from 'react-cookie';

const history = createBrowserHistory();
const initialState = window.INITIAL_REDUX_STATE;
export const store = configureStore(
  history, initialState,
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={muiTheme}>
      <CookiesProvider>
        <App store={store} history={history}/>
      </CookiesProvider>
    </MuiThemeProvider>
  </ThemeProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
