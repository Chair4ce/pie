import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { IxnDashboard } from '../../dashboard/ixn/IxnDashboard';
import { StyledIxnDashboardHeader } from '../../dashboard/ixn/IxnDashboardHeader';
import { StyledIxnTable } from '../../dashboard/ixn/table/IxnTable';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';
import configureStore from '../../configureStore';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import { Provider } from 'react-redux';
import { StyledTableHeader } from '../../dashboard/components/header/TableHeader';
import { StyledIxnInputRow } from '../../dashboard/ixn/table/IxnInputRow';
import { SnackbarProvider } from 'notistack';
import { Cookies, CookiesProvider } from 'react-cookie';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../../store/ixn/IxnModel';
import { StyledMiniSegmentRegion } from '../../dashboard/ixn/rollup/MiniSegmentRegion';
import { StyledMiniSegmentDivider } from '../../dashboard/ixn/rollup/MiniSegmentDivider';
import { StyledMiniIxnRow } from '../../dashboard/ixn/rollup/MiniIxnRow';
import { initStore } from '../../../setupTests';

let target = new TargetModel(1, 1, 1, 'SDT20-123', '00ABC1234567890', 'These are some EEI Notes to be displayed.', '',
                             TargetStatus.NOT_STARTED, '', '', false);

const initState = {
  ...initStore,
  ixnState: {
    viewIxnPage: true,
    target: target,
    dateString: '11/11/2011',
    segments: [] as SegmentModel[],
    ixns: [],
  },
};

//@ts-ignore
const mockStore = configureStore(history, initState);

describe('Interactions Dashboard', () => {
  let subject: ReactWrapper;
  const moment = require('moment');
  const cookies = new Cookies();
  cookies.set('magpie', {username: 'billy', segments: []});
  console.error = jest.fn();
  console.log = jest.fn();

  beforeEach(() => {
    subject = mount(
      <Provider store={mockStore}>
        <CookiesProvider allCookies={cookies}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={15000}
            hideIconVariant
          >
            <IxnDashboard/>
          </SnackbarProvider>
        </CookiesProvider>
      </Provider>,
    );
  });

  it('should display the header', () => {
    expect(subject.find(StyledIxnDashboardHeader).exists()).toBeTruthy();
  });

  it('should display an add segment button', () => {
    expect(subject.find('.add-segment-button').exists()).toBeTruthy();
  });

  it('should toggle displaying the add segment placeholder on add segment button press', () => {
    expect(subject.find('.segment-divider-placeholder').exists()).toBeFalsy();
    subject.find('.add-segment-button').at(0).simulate('click');
    expect(subject.find('.segment-divider-placeholder').exists()).toBeTruthy();
  });

  it('should display the interactions table', () => {
    expect(subject.find(StyledIxnTable).exists()).toBeTruthy();
  });

  it('should display the table header when it has segments', () => {
    expect(subject.find(StyledTableHeader).exists()).toBeFalsy();

    const newInitState = {
      ...initStore,
      ixnState: {
        viewIxnPage: true,
        target: target,
        dateString: '11/11/2011',
        segments: [new SegmentModel(1, 1, 1, 1, moment(0), moment(1))],
        ixns: [],
      },
    };

    //@ts-ignore
    const newMockStore = configureStore(history, newInitState);

    subject = mount(
      <Provider store={newMockStore}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={15000}
          hideIconVariant
        >
          <IxnDashboard/>
        </SnackbarProvider>
      </Provider>,
    );

    expect(subject.find(StyledTableHeader).exists()).toBeTruthy();
    expect(subject.find(StyledTableHeader).text()).toContain('Exploit Analyst');
    expect(subject.find(StyledTableHeader).text()).toContain('Time');
    expect(subject.find(StyledTableHeader).text()).toContain('Callout');
    expect(subject.find(StyledTableHeader).text()).toContain('Track ID');
  });

  it('should display interactions within the interactions table', () => {
    const newInitState = {
      ...initStore,
      ixnState: {
        viewIxnPage: true,
        target: target,
        dateString: '11/11/2011',
        segments: [new SegmentModel(1, 1, 1, 1, moment(0), moment(1))],
        ixns: [],
      },
    };

    //@ts-ignore
    const newMockStore = configureStore(history, newInitState);

    subject = mount(
      <Provider store={newMockStore}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={15000}
          hideIconVariant
        >
          <IxnDashboard/>
        </SnackbarProvider>
      </Provider>,
    );

    expect(subject.find(StyledIxnInputRow).exists()).toBeTruthy();
  });

  it('should display the rollup form on clicking the button when there are interactions', () => {
    subject.find('.rollup-button').simulate('click');
    expect(subject.find('rollup-body').exists()).toBeFalsy();

    const newInitState = {
      ...initStore,
      ixnState: {
        viewIxnPage: true,
        target: target,
        dateString: '11/11/2011',
        segments: [new SegmentModel(1, 1, 1, 1, moment(12345), moment(56789))],
        ixns: [new IxnModel(1, 1, 1, 1, 1, 'Billy Bob Joe', moment(
          23456), 'Things happened', '', '', IxnStatus.NOT_STARTED, '', '', '', IxnApprovalStatus.NOT_REVIEWED)],
      },
    };

    //@ts-ignore
    const newMockStore = configureStore(history, newInitState);

    subject = mount(
      <Provider store={newMockStore}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={15000}
          hideIconVariant
        >
          <IxnDashboard/>
        </SnackbarProvider>
      </Provider>,
    );

    subject.find('.rollup-button').simulate('click');

    expect(subject.find('.rollup').exists()).toBeTruthy();
    expect(subject.find(StyledMiniSegmentRegion).exists()).toBeTruthy();
    expect(subject.find(StyledMiniSegmentDivider).exists()).toBeTruthy();
    expect(subject.find(StyledMiniIxnRow).exists()).toBeTruthy();
  });
});
