import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { StyledTableHeaderCell } from './TableHeaderCell';
import theme from '../../../resources/theme';

interface Props {
  headers: string[];
  className?: string;
}

export const TableHeader: React.FC<Props> = props => {

  return (
    <div className={classNames('table-header', props.className)}>
      {props.headers.map(value =>
        <StyledTableHeaderCell
          text={value}
          className={classNames('header-cell--' + value.split(' ')[value.split(' ').length - 1].toLowerCase())}
          key={value}
        />
      )}
    </div>
      );
};

export const StyledTableHeader = styled(TableHeader)`
  font-weight: ${theme.font.weightBolder};
  font-size: ${theme.font.sizeRegion};
  margin-top: 46px;
  margin-right: 20px;
  height: 33px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
