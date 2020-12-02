import styled from 'styled-components';
import theme from '../../resources/theme';
import classNames from 'classnames';
import * as React from 'react';

export class Metric {
  constructor(
    public data: string | number,
    public label?: string,
  ) {}
}

export class MetricCardData {
  constructor(
    public title: string,
    public metrics: Metric[] | number | string,
  ) {}
}

interface MyProps {
  data: MetricCardData,
  className?: string,
}

export const MetricCard: React.FC<MyProps> = (props) => {

  function printRows() {
    return (
      typeof(props.data.metrics) === 'number' || typeof(props.data.metrics) === 'string' ?
        <span>{props.data.metrics}</span>
        :
      props.data.metrics.map((metric: Metric, index: number) =>
        typeof props.data.metrics !== 'number' && props.data.metrics.length < 3 ?
          <div className={'card-row'} key={`card-row-${props.data.title}-${index}`}>
            <span>{metric.label}</span>
            <span><b>{metric.data}</b></span>
          </div>
          :
          <div className={classNames('card-row', 'small')}>
            <span>{metric.label}</span>
            <span><b>{metric.data}</b></span>
          </div>,
      )
    );
  }

  return (
    <div className={classNames('card', props.className)}>
      <div className={'card-header'}>
        {props.data.title}
      </div>
      <div className={'card-body'}>
        {printRows()}
      </div>
    </div>
  );
};

export const StyledMetricCard = styled(MetricCard)`
    width: 294px;
    display: block;
    height: 201px;
    margin: 15px;
    background-color: ${theme.color.backgroundMetricsCard};
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding-top: 12px;
  
  .card-header {
    color: ${theme.color.fontMetricsHeader};
    font-size: ${theme.font.sizeMetricsHeader};
    font-weight: ${theme.font.weightBold};
    text-align: center;
    width: 100%;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 157px;
    font-size: ${theme.font.sizeBigMetric};
    font-weight: bold;
  }
  
  .card-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 13px 34px 13px 34px;
    width: 100%;
    font-weight: normal;
    font-size: ${theme.font.sizeHeader};
  }
  
  .small {
    font-size: ${theme.font.sizeRegion};
    padding: 8px 34px 8px 34px;
  }
`;
