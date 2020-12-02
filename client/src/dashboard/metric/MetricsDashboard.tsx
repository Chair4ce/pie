import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../resources/theme';
import { fetchMetric } from '../../store/metrics';
import { Metric, MetricCardData, StyledMetricCard } from './MetricsCard';

interface MyProps {
  className?: string;
}

export const MetricsDashboard: React.FC<MyProps> = (props) => {
  const [workflowTime, setWorkflowTime] = useState([-1, -1]);
  const [tgtsPerWeek, setTgtsPerWeek] = useState(-1);
  const [ixnsPerWeek, setIxnsPerWeek] = useState(-1);
  const [ixnsCompletedPerWeek, setIxnsCompletedPerWeek] = useState(-1);
  const [getsClicks, setGetsClicks] = useState([-1, -1]);
  const [deletions, setDeletions] = useState([-1, -1, -1, -1]);
  const [logins, setLogins] = useState(-1);
  const [undos, setUndos] = useState([-1, -1, -1, -1]);
  const [edits, setEdits] = useState([-1, -1, -1, -1]);
  const [prioritizations, setPrioritizations] = useState(-1);
  const [ltiovsMet, setLtiovsMet] = useState(-1);
  const [unworkedRfis, setUnworkedRfis] = useState(-1);

  useEffect(() => {
    fetchMetric('percent-rfis-unworked')
      .then(response => response.json())
      .then(unworkedRfis => setUnworkedRfis(unworkedRfis))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('workflow-time')
      .then(response => response.json())
      .then(workflowTime => setWorkflowTime(workflowTime))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('targets-created-per-week')
      .then(response => response.json())
      .then(tgtsPerWeek => setTgtsPerWeek(tgtsPerWeek))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('ixns-created-per-week')
      .then(response => response.json())
      .then(ixnsPerWeek => setIxnsPerWeek(ixnsPerWeek))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('ixns-completed-per-week')
      .then(response => response.json())
      .then(ixnsCompletedPerWeek => setIxnsCompletedPerWeek(ixnsCompletedPerWeek))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('gets-clicks')
      .then(response => response.json())
      .then(getsClicks => setGetsClicks(getsClicks))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('deletions-per-week')
      .then(response => response.json())
      .then(deletions => setDeletions(deletions))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('logins-per-week')
      .then(response => response.json())
      .then(logins => setLogins(logins))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('undos-per-week')
      .then(response => response.json())
      .then(undos => setUndos(undos))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('edits-per-week')
      .then(response => response.json())
      .then(edits => setEdits(edits))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('prioritizations-per-week')
      .then(response => response.json())
      .then(prioritizations => setPrioritizations(prioritizations))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('percent-rfis-met-ltiov')
      .then(response => response.json())
      .then(ltiovsMet => setLtiovsMet(ltiovsMet))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  return (
    <div className={classNames(props.className, 'metrics-dashboard')}>
      <div className='metrics-header'>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
      </div>
      <div className={'metrics-container'}>
        {workflowTime[0] > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg RFI Spent in Status',
                                     [
                                       new Metric(workflowTime[0] + ' d', 'Open'),
                                       new Metric(workflowTime[1] + ' d', 'New'),
                                     ])}
            className={'workflow-time'}
          />
          :
          null
        }
        {tgtsPerWeek > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Targets Created', tgtsPerWeek)}
            className={'tgts-created'}
          />
          :
          null
        }
        {ixnsPerWeek > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Interactions Created', ixnsPerWeek)}
            className={'ixns-created'}
          />
          :
          null
        }
        {getsClicks[0] > -1 ?
          <StyledMetricCard
            data={new MetricCardData('GETS Clicks',
                                     [
                                       new Metric(getsClicks[0], 'Open'),
                                       new Metric(getsClicks[1], 'New'),
                                     ])}
            className={'gets-clicks'}
          />
          :
          null
        }
        {deletions[0] > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Deletions',
                                     [
                                       new Metric(deletions[0], 'Dates'),
                                       new Metric(deletions[1], 'Targets'),
                                       new Metric(deletions[2], 'Segments'),
                                       new Metric(deletions[3], 'Interactions'),
                                     ])}
            className={'deletions'}
          />
          :
          null
        }
        {logins > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Logins', logins)}
            className={'logins'}
          />
          :
          null
        }
        {undos[0] > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Undo Actions',
                                     [
                                       new Metric(undos[0], 'Dates'),
                                       new Metric(undos[1], 'Targets'),
                                       new Metric(undos[2], 'Segments'),
                                       new Metric(undos[3], 'Interactions'),
                                     ])}
            className={'undos'}
          />
          :
          null
        }
        {edits[0] > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Edits',
                                     [
                                       new Metric(edits[0], 'Dates'),
                                       new Metric(edits[1], 'Targets'),
                                       new Metric(edits[2], 'Segments'),
                                       new Metric(edits[3], 'Interactions'),
                                     ])}
            className={'edits'}
          />
          :
          null
        }
        {prioritizations > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Prioritization Actions', prioritizations)}
            className={'prioritizations'}
          />
          :
          null
        }
        {ltiovsMet > -1 ?
          <StyledMetricCard
            data={new MetricCardData('LTIOVs Met', ltiovsMet + '%')}
            className={'ltiovs-met'}
          />
          :
          null
        }
        {unworkedRfis > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Unworked RFIs', unworkedRfis + '%')}
            className={'unworked-rfis'}
          />
          :
          null
        }
        {ixnsCompletedPerWeek > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Tracks Completed', ixnsCompletedPerWeek)}
            className={'ixns-completed'}
          />
          :
          null
        }
      </div>
    </div>
  );
};

export const StyledMetricsDashboard = styled(MetricsDashboard)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  width: 100%;
  background-color: ${theme.color.backgroundBase};
  font-size: ${theme.font.sizeHeader};
  font-weight: ${theme.font.weightNormal};
  
  .metrics-header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${theme.color.backgroundInformation};
    margin-bottom: 17px;
    flex: 0 0 63px;
  }
  
  .metrics-sidebar {
    flex: 0 0 134px;
    background-color: ${theme.color.backgroundInformation};
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .metrics-container {
    width: 100%;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow-y: auto;
  }
`;
