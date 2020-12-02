import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { StyledTgtDashboard } from '../dashboard/tgt/TgtDashboard';
import { StyledRfiDashboard } from '../dashboard/rfi/RfiDashboard';
import { StyledIxnDashboard } from '../dashboard/ixn/IxnDashboard';
import { DashboardContainer } from '../dashboard/DashboardContainer';
import { StyledLoadingScreen } from '../dashboard/components/loading/LoadingScreen';
import { StyledLoginDashboard } from '../dashboard/login/LoginDashboard';
import RfiModel, { RfiStatus } from '../store/rfi/RfiModel';
import { ExploitDateModel } from '../store/tgt/ExploitDateModel';
import { TargetModel, TargetStatus } from '../store/tgt/TargetModel';
import { StyledUserMetricsDashboard } from '../dashboard/userMetrics/UserMetricsDashboard';

describe('WorkflowContainer', () => {
  const moment = require('moment');
  let subject: ShallowWrapper;
  let rfi = new RfiModel(1, 'DGS1-SDT-2020-00321', 'google.com', undefined, RfiStatus.OPEN, '', '', '', '', '', '', '',
                         '', '', undefined, 'USA', '', 'Just a fiction', 1, 1, 0, undefined, false, false, null);
  let exploitDate = new ExploitDateModel(1, 1, moment(123456));
  let tgt = new TargetModel(1, 1, 1, 'SDT12-123', '12ASD1231231231', '', '', TargetStatus.IN_PROGRESS, '', '', false);

  it('should display a login page when not logged in', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={jest.fn()}
        fetchLocalUpdate={jest.fn()}
        loadTgtPage={jest.fn()}
        postSiteVisit={() => {
          return new Promise((resolve, reject) => {
          });
        }}
        loading={true}
        viewTgtPage={false}
        viewIxnPage={false}
        viewUserMetricsPage={false}
        viewScoiPage={false}
        rfi={undefined}
        cookie={undefined}
        navigateToIxnPage={jest.fn()}
        loadSuccess={jest.fn()}
        tgts={[]}
        exploitDates={[]}
        rfis={[]}
        viewRfiHistoryPage={false}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeTruthy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledUserMetricsDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

  it('should display loading screen while app is loading', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={jest.fn()}
        fetchLocalUpdate={jest.fn()}
        loadTgtPage={jest.fn()}
        postSiteVisit={() => {
          return new Promise((resolve, reject) => {
          });
        }}
        loading={true}
        viewTgtPage={false}
        viewIxnPage={false}
        viewUserMetricsPage={false}
        viewScoiPage={false}
        rfi={undefined}
        cookie={{userName: 'billy.bob.joe', segments: [], viewState: {rfiId: undefined, tgtId: undefined}}}
        navigateToIxnPage={jest.fn()}
        loadSuccess={jest.fn()}
        tgts={[]}
        exploitDates={[]}
        rfis={[]}
        viewRfiHistoryPage={false}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledUserMetricsDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

  it('should display the rfi page upon logging in', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={jest.fn()}
        fetchLocalUpdate={jest.fn()}
        loadTgtPage={jest.fn()}
        postSiteVisit={() => {
          return new Promise((resolve, reject) => {
          });
        }}
        loading={false}
        viewTgtPage={false}
        viewIxnPage={false}
        viewUserMetricsPage={false}
        viewScoiPage={false}
        rfi={rfi}
        cookie={{userName: 'billy.bob.joe', segments: [], viewState: {rfiId: undefined, tgtId: undefined}}}
        navigateToIxnPage={jest.fn()}
        loadSuccess={jest.fn()}
        tgts={[]}
        exploitDates={[]}
        rfis={[rfi]}
        viewRfiHistoryPage={false}
      />);
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeTruthy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledUserMetricsDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

  it('should display the tgt page when user navigates through rfi', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={jest.fn()}
        fetchLocalUpdate={jest.fn()}
        loadTgtPage={jest.fn()}
        postSiteVisit={() => {
          return new Promise((resolve, reject) => {
          });
        }}
        loading={false}
        viewTgtPage={true}
        viewIxnPage={false}
        viewUserMetricsPage={false}
        viewScoiPage={false}
        rfi={rfi}
        cookie={{userName: 'billy.bob.joe', segments: [], viewState: {rfiId: undefined, tgtId: undefined}}}
        navigateToIxnPage={jest.fn()}
        loadSuccess={jest.fn()}
        tgts={[tgt]}
        exploitDates={[exploitDate]}
        rfis={[rfi]}
        viewRfiHistoryPage={false}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeTruthy();
    expect(subject.find(StyledUserMetricsDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

  it('should display the ixn page when user navigates through tgt', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={jest.fn()}
        fetchLocalUpdate={jest.fn()}
        loadTgtPage={jest.fn()}
        postSiteVisit={() => {
          return new Promise((resolve, reject) => {
          });
        }}
        loading={false}
        viewTgtPage={true}
        viewIxnPage={true}
        viewUserMetricsPage={false}
        viewScoiPage={false}
        rfi={rfi}
        cookie={{userName: 'billy.bob.joe', segments: [], viewState: {rfiId: undefined, tgtId: undefined}}}
        navigateToIxnPage={jest.fn()}
        loadSuccess={jest.fn()}
        tgts={[tgt]}
        exploitDates={[exploitDate]}
        rfis={[rfi]}
        viewRfiHistoryPage={false}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledUserMetricsDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeTruthy();
  });

  it('should display the user metrics page when user navigates through metrics button', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={jest.fn()}
        fetchLocalUpdate={jest.fn()}
        loadTgtPage={jest.fn()}
        postSiteVisit={() => {
          return new Promise((resolve, reject) => {
          });
        }}
        loading={false}
        viewTgtPage={false}
        viewIxnPage={false}
        viewUserMetricsPage={true}
        viewScoiPage={false}
        rfi={undefined}
        cookie={{userName: 'billy.bob.joe', segments: [], viewState: {rfiId: undefined, tgtId: undefined}}}
        navigateToIxnPage={jest.fn()}
        loadSuccess={jest.fn()}
        tgts={[]}
        exploitDates={[]}
        rfis={[]}
        viewRfiHistoryPage={false}
      />);

    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledUserMetricsDashboard).exists()).toBeTruthy();
  });
});
