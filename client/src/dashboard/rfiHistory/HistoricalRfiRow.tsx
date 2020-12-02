import * as React from 'react';
import { HistoricalRfiModel } from '../../store/rfiHistory/HistoricalRfiModel';
import styled from 'styled-components';
import theme from '../../resources/theme';
import classNames from 'classnames';
import { formatRfiNum } from '../../utils';
import { HistoricalStar } from '../../resources/icons/HistoricalStar';
import TextTooltip from '../components/TextTooltip';

interface MyProps {
  historicalRfi: HistoricalRfiModel;
  selected: boolean;
  select: () => void;
  className?: string;
}

const HistoricalRfiRow: React.FC<MyProps> = (props) => {

  function isOverflown(element: any) {
    if (element) {
      return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }
    return false;
  }

  const productIsOverflown = isOverflown(document.getElementById('product-name-' + props.historicalRfi.rfi.id));

  const mapStars = () => {
    return [1, 2, 3, 4, 5].map(index => {
                                 return (
                                   props.historicalRfi.feedback ?
                                     <HistoricalStar filled={index <= props.historicalRfi.feedback.stars}/>
                                     :
                                     <div className={'dash'}>&nbsp;</div>
                                 );
                               },
    );
  };

  return (
    <div className={classNames('historical-rfi-row', props.className, props.selected ? 'highlighted' : null)} onClick={props.select}>
      <div className={'cell--rfi-num'}>{formatRfiNum(props.historicalRfi.rfi.rfiNum)}</div>
      {productIsOverflown ?
        <TextTooltip title={props.historicalRfi.rfi.productName}>
          <div className={'cell--product-name'}
               id={'product-name-' + props.historicalRfi.rfi.id}><span>{props.historicalRfi.rfi.productName}</span>
          </div>
        </TextTooltip>
        :
        <div className={'cell--product-name'}
             id={'product-name-' + props.historicalRfi.rfi.id}><span>{props.historicalRfi.rfi.productName ?
          props.historicalRfi.rfi.productName :
          <i>None</i>}</span></div>
      }
      <div className={'cell--stars no-select'}>{mapStars()}</div>
    </div>
  );
};

export const StyledHistoricalRfiRow = styled(HistoricalRfiRow)`
  background: ${theme.color.backgroundInformation};
  width: 496px;
  height: 58px;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px #000000;
  flex-shrink: 0;
  flex-grow: 0;
  padding-left: 16px;
  
  :hover {
    box-shadow: 0 0 6px #FFFFFF;
  }
  
  .cell--rfi-num {
    width: 65px;
    margin-right: 5px;
    margin-left: 0 !important;
  }
  
  .cell--product-name {
    width: 136px;
    height: 19px;
    margin-right: 5px;
    margin-left: 0 !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .cell--stars {
    margin-left: 0 !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 240px;
  }
  
  .dash {
    width: 22px;
    height: 4px;
    border-radius: 2px;
    background: ${theme.color.starInactive};
    margin: 9px;
  }
`;
