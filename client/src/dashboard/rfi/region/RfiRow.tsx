import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import RfiModel, { RfiStatus } from '../../../store/rfi/RfiModel';
import theme from '../../../resources/theme';
import IconDnDBurger from '../../../resources/icons/DnDBurgerVector';
import { formatRfiNum } from '../../../utils';
import ExceedsLTIOVIcon from '../../../resources/icons/ExceedsLTIOVIcon';
import TextTooltip from '../../components/TextTooltip';
import { RejectArrow } from '../../../resources/icons/RejectArrowIcon';

interface Props {
  rfi: RfiModel;
  scrollRegionRef: any;
  selectRfi: (rfiId: number) => void;
  selected: boolean;
  index?: number;
  prioritizing?: boolean;
  className?: string;
}

export const RfiRow: React.FC<Props> = props => {

  return (
    <div className={classNames('rfi-row-container', props.className)} id={'rfi-row-' + props.rfi.id}>
      {props.rfi.containsRejectedTracks ?
        <RejectArrow message={'This RFI contains\nrejected callouts.'}/>
        :
        null
      }
      <div
        className={classNames('rfi-row', props.selected ? 'selected' : null,
                              props.rfi.containsRejectedTracks ? 'red-border' : 'no-border')}
        key={props.rfi.rfiNum}
        onClick={() => props.selectRfi(props.rfi.id)}
      >
        {props.rfi.priority > -1 && props.rfi.status === 'OPEN' ? props.prioritizing ?
          <div className={classNames('cell', 'cell--pri', 'prioritizing')}>
            <IconDnDBurger/>
            <span className={'priority'}>{props.rfi.priority}</span>
          </div>
          :
          <div className={classNames('cell', 'cell--pri', 'not-prioritizing')}>
            <IconDnDBurger/>
            <span className={'priority'}>{props.rfi.priority}</span>
          </div>
          :
          <div className={classNames('cell', 'cell--pri', 'not-prioritizing')}>
            <IconDnDBurger/>
            <span className={'priority'}>-</span>
          </div>
        }
        <span className={classNames('cell', 'cell--rfi-num')}>
          {formatRfiNum(props.rfi.rfiNum)}
        </span>
        <span className={classNames('cell', 'cell--country')}>
          {props.rfi.country}
        </span>
        <span className={classNames('cell', 'cell--customerUnit')}>
          <div>{props.rfi.customerUnit}</div>
        </span>
        <span className={classNames('cell', 'cell--ltiov')}>
          {props.rfi.ltiov === undefined ? '-' : props.rfi.ltiov.utc().format('D MMM YY').toUpperCase()}
        </span>
        <span className={classNames('cell', 'cell--startDate')}>
          {props.rfi.startDate === undefined ? '-' : props.rfi.startDate.utc().format('D MMM YY').toUpperCase()}
        </span>
        <span className={classNames('cell', 'cell--count')}>
          {props.rfi.status === RfiStatus.PENDING ? '-' : props.rfi.tgtCount}
        </span>
        <span className={classNames('cell', 'cell--count')}>
          {props.rfi.status === RfiStatus.PENDING ? '-' : props.rfi.ixnCount}
        </span>
        {props.rfi.completionDate && props.rfi.ltiov && props.rfi.status !== RfiStatus.CLOSED &&
        (props.rfi.completionDate > props.rfi.ltiov) ?
          <TextTooltip title={'The LTIOV expires before \nProjected Completion Date.'}>
            <div className={'popover--LTIOV'}><ExceedsLTIOVIcon/></div>
          </TextTooltip> : null}
      </div>
    </div>
  );
};

export const StyledRfiRow = styled(RfiRow)`
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
    
  .reject-arrow {
    width: 21px;
    height: 32px;
    margin-left: -21px;
    margin-bottom: 8px;
    cursor: default;
  }

  .red-border {
    border: 2px solid ${theme.color.buttonDoesNotMeetEei};
    
    :hover {
      box-shadow: 0 0 4px #FAA !important;
    }
  }
  
  .no-border {
    border: 2px solid rgba(0,0,0,0);
  }
  
  .rfi-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 574px;
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightBold};
    border-radius: 8px;
    margin-bottom: 8px;
    height: 62px;
    white-space: nowrap;
    cursor: pointer;
    background-color: ${theme.color.backgroundInformation};
    margin-left: 4px;
    
    :hover {
      box-shadow: 0 0 4px #FFF;
    }
  }
  
  .selected {
    background-color: ${theme.color.backgroundFocus};
    cursor: default !important;
    :hover {
      box-shadow: none !important;
    }
  }
  
  .cell--pri {
    width: 61px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  
  .prioritizing {
    cursor: grab;
  }
  
  .not-prioritizing {
    svg {
      opacity: 0;
    }
  }
  
  .cell--rfi-num {
    width: 60px;
  }
  
  .cell--country {
    width: 45px;
  }
  
  .cell--customerUnit {
    width: 90px;
  
    div {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .cell--ltiov {
    width: 80px;
  }
  
  .cell--startDate {
    width: 80px;
  }
  
  .cell--count {
    width: 30px;
  }
  
  .popover--LTIOV {
    align-self: flex-start;
    margin-left: -30px;
    margin-top: -5px;
    margin-right: -5px;
  }
`;

export const PendingRfiRow = styled(StyledRfiRow)` 
  .section--information, .section--button {
    font-weight: ${theme.font.weightBold};
    background: ${theme.color.backgroundInformation};
  }
  
  .section--information {
    max-width: 1440px;
  }
`;

export const OpenRfiRow = styled(StyledRfiRow)` 
  .section--information, .section--button {
    font-weight: ${theme.font.weightNormal};
    background: ${theme.color.backgroundInformation};
  }
`;

export const ClosedRfiRow = styled(StyledRfiRow)` 
  .section--information, .section-button {
    font-weight: ${theme.font.weightNormal};
    background: ${theme.color.backgroundInactive};
  }
    
  .section--information {
    max-width: 1440px;
  }
`;
