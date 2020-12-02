import * as React from 'react';
import { StyledTableHeader } from '../components/header/TableHeader';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../resources/theme';
import { HistoricalRfiModel } from '../../store/rfiHistory/HistoricalRfiModel';
import { StyledHistoricalRfiRow } from './HistoricalRfiRow';

interface MyProps {
  historicalRfis: HistoricalRfiModel[];
  selectedHistoricalRfiId: number;
  handleSelectHistoricalRfi: (historicalRfi: HistoricalRfiModel) => void;
  className?: string;
}

const HistoricalRfiTable: React.FC<MyProps> = (props) => {
  const mapHistoricalRfiRows = () => {
    return props.historicalRfis.map(
      (historicalRfi, index) =>
          <StyledHistoricalRfiRow
            key={`historical-rfi-row-${index}`}
            historicalRfi={historicalRfi}
            selected={props.selectedHistoricalRfiId === historicalRfi.rfi.id}
            select={() => props.handleSelectHistoricalRfi(historicalRfi)}
          />
      ,
    );
  };

  return (
    <div className={classNames('historical-rfi-table', props.className)}>
      <StyledTableHeader
        headers={['RFI', 'Product', 'Customer Rating']}
      />
      <div className={'historical-rfi-table-body'}>
        {mapHistoricalRfiRows()}
      </div>
    </div>
  );
};

export const StyledHistoricalRfiTable = styled(HistoricalRfiTable)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  .header-cell--rfi {
    width: 65px;
    margin-right: 5px;
    margin-left: 0 !important;
  }
  
  .header-cell--product {
    width: 136px;
    margin-right: 5px;
    margin-left: 0 !important;
  }
  
  .header-cell--rating {
    margin-left: 0 !important;
  }
  
  .table-header {
    width: 496px;
    justify-content: flex-start !important;
    margin: 0 !important;
    padding-left: 16px;
    height: 28px;
    flex-shrink: 0;
  }
  
  .historicalRfi-table-body {
    padding: 6px; 
    width: 538px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: auto;
  }
  
  .highlighted {
    background: ${theme.color.backgroundFocus};
    cursor: default;
    :hover {
      box-shadow: 0 2px 4px #000000;
    }
  }
  
  .no-glow {
    box-shadow: none !important;
  }
`;
