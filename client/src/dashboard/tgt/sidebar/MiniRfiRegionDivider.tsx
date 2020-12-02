import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import theme from '../../../resources/theme';

interface MyProps {
  regionTitle: string;
  className?: string;
}

export const MiniRfiRegionDivider: React.FC<MyProps> = props => {
  return (
    <div className={classNames('region-divider', 'pending', props.className)}>
      <div className={'region-divider--bar'}/>
      <div className={classNames('region-divider--box')}>{props.regionTitle.toUpperCase()}</div>
    </div>
  )
};

export const StyledMiniRfiRegionDivider = styled(MiniRfiRegionDivider)`
  height: 32px;
  font-weight: ${theme.font.weightMedium};
  font-size: ${theme.font.sizeRow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  
  .region-divider--bar {
    margin-bottom: -4px;
    width: 65px;
    height: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: radial-gradient(300px, ${theme.color.regionDividerPrimary}, ${theme.color.regionDividerSecondary});
    z-index: 2;
  }
  
  .region-divider--box {
    width: 65px;
    height: 30px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    border: 4px solid ${theme.color.regionDividerPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
`;
