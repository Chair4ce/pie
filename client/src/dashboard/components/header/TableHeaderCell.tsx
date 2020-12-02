import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  text: string;
  className?: string;
}

export const TableHeaderCell: React.FC<Props> = props => {
  return (
    <div
      className={classNames('header-cell', props.className)}
    >
    {props.text === 'delete-spacer' ?
      <>&nbsp;</>
    :
      <span className={'header--' + props.text.split(' ')[props.text.split(' ').length - 1].toLowerCase()}>
        {props.text}
      </span>
    }
    </div>
  )
};

export const StyledTableHeaderCell = styled(TableHeaderCell)`
  display: flex;
  flex-direction: row;
  margin-left: 8px;
`;