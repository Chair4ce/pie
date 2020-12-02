import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { History } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApplicationState } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { StyledDashboardContainer } from './dashboard/DashboardContainer';
import { Store } from 'redux';
import theme from './resources/theme';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { useCookies } from 'react-cookie';
import { StyledMetricsDashboard } from './dashboard/metric/MetricsDashboard';
import { Cookie } from './utils';
import { StyledFeedbackDashboard } from './dashboard/feedback/FeedbackDashboard';

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
  className?: string;
}

const snackbarStyle = makeStyles((localTheme) => createStyles(
  {
    snackbar: {
      backgroundColor: theme.color.backgroundSnackbar,
      color: theme.color.fontPrimary,
      fontSize: theme.font.sizeRow,
      fontWeight: theme.font.weightNormal,
    },
    snackbarError: {
      backgroundColor: theme.color.backgroundSnackbarError,
      color: theme.color.fontPrimary,
      fontSize: theme.font.sizeRow,
      fontWeight: theme.font.weightNormal,
    },
  }),
);

const App: React.FC<AppProps> = ({store, history, className}) => {
  const moment = require('moment-timezone');
  moment.tz.setDefault('Etc/UTC');
  const classes = snackbarStyle();

  const [userCookie] = useCookies(['magpie']);
  let cookie: Cookie|undefined = userCookie.magpie;

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={15000}
      classes={{
        variantInfo: classes.snackbar,
        variantError: classes.snackbarError,
      }}
      hideIconVariant
    >
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router>
            <div className={classNames('app', className)}>
              <Switch>
                <Route exact path={'/'}
                       render={(props) =>
                         <StyledDashboardContainer {...props} cookie={cookie}/>}
                />
                <Route exact path={'/metrics'} component={StyledMetricsDashboard}/>
                <Route exact path={'/feedback/:rfiNum?'} component={StyledFeedbackDashboard}/>
              </Switch>
            </div>
          </Router>
        </ConnectedRouter>
      </Provider>
    </SnackbarProvider>
  );
};

export default styled(App)`
  height: 100vh;
  background-color: ${theme.color.backgroundBase};
`;
