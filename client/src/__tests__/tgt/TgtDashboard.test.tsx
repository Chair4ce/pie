import { TgtDashboard } from '../../dashboard/tgt/TgtDashboard';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import configureStore from '../../configureStore';
import { StyledExploitDateDivider } from '../../dashboard/tgt/table/ExploitDateDivider';
import { initStore } from '../../../setupTests';
import { ApplicationState } from '../../store';


const moment = require('moment');
const rfiTest =
  new RfiModel(1, 'DGS-SPC-2035-02335', 'www.spacejam.com', undefined, RfiStatus.OPEN, '', '', '', 'space forse', '',
               '', '', '', '', moment('2019-11-20').utc(), 'USLT', 'Good morning starshine, the earth says hello',
               'Just a fiction', 42, 0, 0, undefined, false, false, null);

const initState: ApplicationState = {
  ...initStore,
  tgtState: {
    ...initStore.tgtState,
    rfi: rfiTest,
  },
};

//@ts-ignore
const mockStore = configureStore(history, initState);

describe('TgtDashboardContainer', () => {
  let subject: ReactWrapper;

  beforeEach(() => {
    subject = mount(
      <Provider store={mockStore}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={15000}
          hideIconVariant
        >
          <TgtDashboard/>
        </SnackbarProvider>
      </Provider>,
    );
  });

  it('should display the rfi description', () => {
    expect(subject.find('.tgt-dash--rfi-description-container').text())
      .toContain('Good morning starshine, the earth says hello');
  });

  it('should display an add date button', () => {
    expect(subject.find('.add-date-button').exists()).toBeTruthy();
  });

  it('should display the date dividers or not properly', () => {

    let dates: ExploitDateModel[] = [
      new ExploitDateModel(2, 1, moment('2019-11-20').utc()),
      new ExploitDateModel(3, 1, moment('2019-11-21').utc()),
      new ExploitDateModel(4, 1, moment('2019-11-21').utc()),
    ];

    let newState: ApplicationState = {
      ...initState,
      tgtState: {
        ...initState.tgtState,
        exploitDates: dates,
      },
    };

    // @ts-ignore
    const mockStore = configureStore(history, newState);

    subject = mount(
      <Provider store={mockStore}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={15000}
          hideIconVariant
        >
          <TgtDashboard/>
        </SnackbarProvider>
      </Provider>,
    );

    expect(subject.find(StyledExploitDateDivider).length).toBe(3);
  });
});
