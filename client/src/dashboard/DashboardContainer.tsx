import * as React from 'react';
import { connect } from 'react-redux';
import { StyledRfiDashboard } from './rfi/RfiDashboard';
import styled from 'styled-components';
import classNames from 'classnames';
import { ApplicationState } from '../store';
import { StyledTgtDashboard } from './tgt/TgtDashboard';
import { StyledIxnDashboard } from './ixn/IxnDashboard';
import RfiModel from '../store/rfi/RfiModel';
import { StyledLoadingScreen } from './components/loading/LoadingScreen';
import { fetchLocalUpdate, fetchRfis, loadSuccess } from '../store/rfi';
import { postSiteVisit } from '../store/metrics';
import { loadTgtPage } from '../store/tgt/Thunks';
import { StyledLoginDashboard } from './login/LoginDashboard';
import { Cookie } from '../utils';
import { navigateToIxnPage } from '../store/ixn';
import { TargetModel } from '../store/tgt/TargetModel';
import { ExploitDateModel } from '../store/tgt/ExploitDateModel';
import { StyledUserMetricsDashboard } from './userMetrics/UserMetricsDashboard';
import { StyledScoiDashboard } from './scoi/ScoiDashboard';
import { StyledRfiHistoryDashboard } from './rfiHistory/RfiHistoryDashboard';

interface Props {
  fetchRfis: () => void;
  postSiteVisit: () => Promise<any>;
  fetchLocalUpdate: () => void;
  loadTgtPage: (rfi: RfiModel, firstLoad: boolean) => void;
  navigateToIxnPage: (target: TargetModel, dateString: string) => void;
  viewUserMetricsPage: boolean;
  viewRfiHistoryPage: boolean;
  viewScoiPage: boolean;
  loadSuccess: () => void;
  rfi: RfiModel|undefined;
  rfis: RfiModel[];
  tgts: TargetModel[];
  exploitDates: ExploitDateModel[];
  loading: boolean;
  viewTgtPage: boolean;
  viewIxnPage: boolean;
  cookie: Cookie|undefined;
  className?: string;
}

export class DashboardContainer extends React.Component<Props, any> {

  componentDidMount(): void {
    setInterval(() => {
      this.refreshRfis();
    }, 5000);

    setInterval(() => {
      this.refreshTgts();
    }, 5000);

    this.props.postSiteVisit()
      .catch((reason => {
        console.log('Failed to post site visit metric: ' + reason);
      }));
    this.props.fetchRfis();
  }

  private refreshRfis() {
    if (!this.props.loading && !this.props.viewTgtPage) {
      this.props.fetchLocalUpdate();
    }
  }

  private refreshTgts() {
    if (this.props.viewTgtPage && !this.props.viewIxnPage && this.props.rfi) {
      this.props.loadTgtPage(this.props.rfi, false);
    }
  }

  render() {
    if (this.props.cookie === undefined || this.props.cookie.viewState === undefined) {
      return <StyledLoginDashboard/>;
    }

    //navigate to tgt page by rfi id
    if (this.props.cookie.viewState.rfiId && !(this.props.viewTgtPage)) {
      while (this.props.rfis === []) {
      }
      let tgtRfi: RfiModel|undefined = this.props.rfis.find(
        (rfi) => rfi.id === this.props.cookie!.viewState.rfiId);
      if (tgtRfi) {
        this.props.loadTgtPage(tgtRfi, true);
      } else {
        this.props.loadSuccess()
      }
    }
    //navigate to ixn page by tgt id
    else if (this.props.cookie.viewState.tgtId && !(this.props.viewIxnPage)) {
      while (this.props.tgts === []) {
      }
      let ixnTgt: TargetModel|undefined = this.props.tgts.find(
        (tgt) => tgt.id === this.props.cookie!.viewState.tgtId);

      if (ixnTgt) {
        let ixnDate: ExploitDateModel|undefined = this.props.exploitDates.find(
          (date) => date.id === ixnTgt!.exploitDateId);
        if (ixnDate) {
          this.props.navigateToIxnPage(ixnTgt, ixnDate.exploitDate.format('MM/DD/YYYY'));
        } else {
          this.props.loadSuccess()
        }
      } else {
        this.props.loadSuccess()
      }
    } else if (this.props.loading) {
      this.props.loadSuccess();
    }

    if (this.props.loading) {
      return <StyledLoadingScreen/>;
    }

    if (this.props.viewIxnPage) {
      return <StyledIxnDashboard/>;
    }

    if (this.props.viewTgtPage) {
      return <StyledTgtDashboard/>;
    }

    if (this.props.viewUserMetricsPage) {
      return <StyledUserMetricsDashboard/>;
    }

    if (this.props.viewRfiHistoryPage) {
      return <StyledRfiHistoryDashboard/>;
    }

    if (this.props.viewScoiPage) {
      return <StyledScoiDashboard/>;
    }

    return (
      <div className={classNames('rm-dashboard', this.props.className)}>
        <StyledRfiDashboard/>
      </div>
    );
  }
}

const mapStateToProps = ({rfiState, tgtState, ixnState, scoiState, historicalRfiState}: ApplicationState) => ({
  loading: rfiState.loading,
  viewTgtPage: tgtState.viewTgtPage,
  viewIxnPage: ixnState.viewIxnPage,
  rfi: tgtState.rfi,
  rfis: rfiState.rfis,
  tgts: tgtState.targets,
  exploitDates: tgtState.exploitDates,
  viewUserMetricsPage: rfiState.viewUserMetricsPage,
  viewRfiHistoryPage: historicalRfiState.viewRfiHistoryPage,
  viewScoiPage: scoiState.viewScoiPage,
});

const mapDispatchToProps = {
  fetchRfis: fetchRfis,
  postSiteVisit: postSiteVisit,
  fetchLocalUpdate: fetchLocalUpdate,
  loadTgtPage: loadTgtPage,
  navigateToIxnPage: navigateToIxnPage,
  loadSuccess: loadSuccess,
};

export const StyledDashboardContainer = styled(
  connect(mapStateToProps, mapDispatchToProps)(DashboardContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: inherit;
`;
