import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../../resources/theme';
import { TargetModel } from '../../../store/tgt/TargetModel';

interface Props {
  tgt: TargetModel;
  selectTgt: (tgt: TargetModel) => void;
  selected: boolean;
  index?: number;
  className?: string;
}

export const MiniTgtRow: React.FC<Props> = props => {

  return (
    <div className={props.className} id={'tgt-row-' + props.tgt.id}>
      <div
        className={classNames('tgt-row', props.selected ? 'selected' : null, 'no-select')}
        key={props.tgt.exploitDateId + props.tgt.name}
        onClick={() => props.selectTgt(props.tgt)}
      >
        <div className={classNames('cell', 'cell--tgt-num')}>
          {+props.tgt.name.substring(3)}
        </div>
      </div>
    </div>
  );
};

export const StyledMiniTgtRow = styled(MiniTgtRow)`
  .tgt-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    width: 42px;
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightBold};
    border-radius: 8px;
    margin-bottom: 8px;
    height: 62px;
    white-space: nowrap;
    cursor: pointer;
    background-color: ${theme.color.backgroundInformation};
    
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
  
  .cell--tgt-num {
    width: 60px;
  }
`;
