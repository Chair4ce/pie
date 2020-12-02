import * as React from 'react';
import styled from 'styled-components';
import { StyledRfiRegionDivider } from './RfiRegionDivider';
import classNames from 'classnames';
import theme from '../../../resources/theme';

interface Props {
  title: string;
  emptyMessage: string;
  provided: any;
  className?: string;
}

export const RfiRegion: React.FC<Props> = props => {

  function displayMessage(message: string) {
    return <div className={'empty-message'}>{message}</div>;
  }

        return (
          <div
            className={classNames('region', `region--${props.title}`, props.className)}
            ref={props.provided.innerRef}
          >
            <StyledRfiRegionDivider regionTitle={props.title}/>
            {React.Children.count(props.children) === 0 ? displayMessage(props.emptyMessage) : props.children}
            {props.provided.placeholder}
          </div>
        );

};

export const StyledRfiRegion = styled(RfiRegion)`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  
  .empty-message {
    font-weight: ${theme.font.weightMedium};
    font-size: ${theme.font.sizeRegion};
    margin-top: 16px;
    text-align: center;
    opacity: 50%;
  }
`;

