import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../../resources/theme';
import { StyledMiniRfiRegionDivider } from './MiniRfiRegionDivider';

interface Props {
  title: string;
  emptyMessage: string;
  className?: string;
}

export const MiniRfiRegion: React.FC<Props> = props => {

  function displayMessage(message: string) {
    return <div className={'empty-message'}>{message}</div>;
  }

  return (
    <div
      className={classNames('region', `region--${props.title}`, props.className)}
    >
      <StyledMiniRfiRegionDivider regionTitle={props.title}/>
      {React.Children.count(props.children) === 0 ? displayMessage(props.emptyMessage) : props.children}
    </div>
  );

};

export const StyledMiniRfiRegion = styled(MiniRfiRegion)`
  display: flex;
  flex-direction: column;
  
  .empty-message {
    font-weight: ${theme.font.weightMedium};
    font-size: ${theme.font.sizeRegion};
    margin-top: 16px;
    text-align: center;
    opacity: 50%;
  }
`;
