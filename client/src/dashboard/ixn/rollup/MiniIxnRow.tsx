import * as React from 'react';
import IxnModel from '../../../store/ixn/IxnModel';
import { Box, Checkbox } from '@material-ui/core';
import classNames from 'classnames';
import styled from 'styled-components';
import { RollupMode } from '../RollupView';
import theme from '../../../resources/theme';

interface MyProps {
  ixn: IxnModel;
  rollupMode: RollupMode;
  selected: boolean;
  select: (ixnId: number) => void;
  readOnly: boolean
  className?: string;
}

export const MiniIxnRow: React.FC<MyProps> = props => {

  const handleClickCheckbox = () => {
    props.select(props.ixn.id!);
  };

  return (
    <div className={props.className}>
      <Box
        borderRadius={8}
        className={'ixn-row-box'}
      >
        {props.rollupMode === RollupMode.ALL_CALLOUTS ?
          <Checkbox
            checked={props.selected}
            onChange={handleClickCheckbox}
            inputProps={{'aria-label': 'primary checkbox'}}
            disableRipple
            color={'primary'}
            className={'import-checkbox'}
            disabled={props.readOnly}
          />
          :
          null
        }
        <div className={classNames('mini-ixn-data-cell', 'time')}>
          {props.ixn.time.utc().format('HH:mm:ss') + 'Z'}
        </div>
        <div className={classNames('mini-ixn-data-cell', 'mini-activity')}>
          {props.ixn.activity ? props.ixn.activity : '\xa0'}
        </div>
      </Box>
    </div>
  );
};

export const StyledMiniIxnRow = styled(MiniIxnRow)`
 .mini-ixn-data-cell {
    margin: 14px 4px 8px 4px;
    padding-bottom: 6px;
    overflow-wrap: break-word;
    border-bottom: 1px solid #FFFFFF;
  }
  
  .ixn-row-box {
    margin: 1px 0 1px 2px !important;
    background: ${theme.color.backgroundInformation};
  }
    
  .mini-activity {
    width: ${(props) => props.rollupMode === RollupMode.HOURLY_ROLLUP ? '345px' : '303px'};
  }
`;
