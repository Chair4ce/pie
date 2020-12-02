import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledHeaderCell } from './RfiTableHeaderCell';
import { Field, SortKeyModel } from '../../../store/sort/SortKeyModel';
import theme from '../../../resources/theme';

interface Props {
  sortRfis: (field: Field) => void;
  sortKey: SortKeyModel;
  className?: string;
}

export const RfiTableHeader: React.FC<Props> = (props) => {
  return (
    <div className={classNames('header', props.className)}>
      <StyledHeaderCell
        text={'PRI'}
        sort={() => props.sortRfis(Field.PRIORITY)}
        field={Field.PRIORITY}
        className={'header-cell--pri'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'RFI'}
        sort={() => props.sortRfis(Field.RFINUM)}
        field={Field.RFINUM}
        className={'header-cell--rfi-num'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'CC'}
        sort={() => props.sortRfis(Field.COUNTRY)}
        field={Field.COUNTRY}
        className={'header-cell--country'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'Customer'}
        sort={() => props.sortRfis(Field.CUSTOMER)}
        field={Field.CUSTOMER}
        className={'header-cell--customerUnit'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'LTIOV'}
        sort={() => props.sortRfis(Field.LTIOV)}
        field={Field.LTIOV}
        className={'header-cell--ltiov'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'START'}
        sort={() => props.sortRfis(Field.START)}
        field={Field.START}
        className={'header-cell--startDate'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'TGTs'}
        sort={() => props.sortRfis(Field.TGTS)}
        field={Field.TGTS}
        className={'header-cell--count'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'C/Os'}
        sort={() => props.sortRfis(Field.IXNS)}
        field={Field.IXNS}
        className={'header-cell--count'}
        sortKey={props.sortKey}
      />
    </div>
  );
};

export const StyledRfiTableHeader = styled(RfiTableHeader)`
  font-weight: ${theme.font.weightNormal};
  font-size: ${theme.font.sizeRow};
  margin-right: 20px;
  height: 48px;
  display: flex;
  flex: 0 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4px;
  
  .header-cell {
    display:flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 0;
    
    :hover {
      text-shadow: 0 0 4px #FFF;
      svg {
        filter: drop-shadow(0 0 0.5px #FFF);
      }
    }
  }
  
  .header--tgts {
    text-align: center;
    height: 20px;
    width: 40px;
  }
  
  .header--cos {
    text-align: center;
    height: 20px;
    width: 48px;
  }
  
  .header-cell--pri {
    padding-left: 68px !important;
    width: 105px;
  }
  
  .header-cell--rfi-num {
    width: 60px;
    padding-left: 13px;
  }
  
  .header-cell--country {
    width: 70px;
  }
  
  .header-cell--customerUnit {
    width: 100px;
  }
  
  .header-cell--ltiov {
    width: 100px;
  }
  
  .header-cell--startDate {
    width: 85px;
  }
  
  .header-cell--count {
    text-align: center;
    height: 20px;  
  }
  
  .header-cell--description {
    padding-left: 0;
    margin-left: 0;
  }
`;
