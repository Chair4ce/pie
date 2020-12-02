import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Field, SortKeyModel } from '../../../store/sort/SortKeyModel';
import SortButtonVector from '../../../resources/icons/SortButtonVector';

interface Props {
  text: string;
  sort: () => void;
  sortKey: SortKeyModel;
  field: Field;
  className?: string;
}

export const RfiTableHeaderCell: React.FC<Props> = props => {

  return (
    <div
      className={classNames('header-cell', 'no-select', props.className)}
      onClick={props.sort}
    >
      <div className={'header-wrapper'}>
        <div className={classNames('upper--sort')}>
          {props.sortKey.defaultOrder &&
          (props.sortKey.field === props.field) ?
            <SortButtonVector ascending={true} active={true}/> : <SortButtonVector ascending={true} active={false}/>}
        </div>
        <span className={'header--' + props.text.replace(/\W/g, '').toLowerCase()}>
        {props.text}
      </span>
        <div className={classNames('lower--sort')}>
          {!props.sortKey.defaultOrder &&
          (props.sortKey.field === props.field) ?
            <SortButtonVector ascending={false} active={true}/> : <SortButtonVector ascending={false} active={false}/>}
        </div>
      </div>
    </div>
  );
};

export const StyledHeaderCell = styled(RfiTableHeaderCell)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4px;

  .header-wrapper {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }
  
  span {
    height: 20px;
  }
  
  .upper--sort {
    height: 10px;
    width: 10px;
  }
  
  .lower--sort {
    height: 10px;
    width: 10px;
  }
  
  svg {
    margin-top: -10px;
  }
`;
