import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import theme from '../../../resources/theme';

interface Props {
  regionTitle: string
  className?: string;
}

export const RfiRegionDivider: React.FC<Props> = props => {
  return (
    <div className={classNames('region-divider', 'pending', props.className)}>
      <div className={'region-divider--bar'}/>
      <div className={classNames('region-divider--box')}>{props.regionTitle.toUpperCase()}</div>
    </div>
  )
};

export const StyledRfiRegionDivider = styled(RfiRegionDivider)`
  height: 32px;
  font-weight: ${theme.font.weightMedium};
  font-size: ${theme.font.sizeRegion};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  margin-left: 35px;
  
  .region-divider--bar {
    margin-bottom: -4px;
    width: 574px;
    height: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: radial-gradient(300px, ${theme.color.regionDividerPrimary}, ${theme.color.regionDividerSecondary});
    z-index: 2;
  }
  
  .region-divider--box {
    width: 228px;
    height: 25px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 4px solid ${theme.color.regionDividerPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 36px;
    padding-right: 36px;
    z-index: 1;
  }
`;
