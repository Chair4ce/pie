import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const IxnTable: React.FC<Props> = props => {
  return (
    <div className={classNames('ixn-table-wrapper', props.className)} id={'ixn-table-scrollable-region'}>
      <div className={'ixn-table'}>
        {props.children}
      </div>
    </div>
  )
};

export const StyledIxnTable = styled(IxnTable)`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 20px;
`;
