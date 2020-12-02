import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import { TargetModel } from '../../store/tgt/TargetModel';
import theme from '../../resources/theme';
import EeiNotesIcon from '../../resources/icons/EeiNotesIcon';
import AddSegmentIcon from '../../resources/icons/AddSegmentIcon';
import ExportRollupsIcon from '../../resources/icons/ExportRollupsIcon';
import TextTooltip, { EeiTooltip } from '../components/TextTooltip';
import UploadFileIcon from '../../resources/icons/UploadFileIcon';

interface MyProps {
  exitIxnPage: () => void;
  exitRollupMode: () => void;
  rollupMode: boolean;
  target: TargetModel;
  dateString: string;
  disableButtons: boolean;
  disableAddSegment: boolean;
  disableRollupButton: boolean;
  disableEeiButton: boolean;
  showRollup: () => void;
  displayEeiNotes: boolean;
  toggleDisplayEeiNotes: () => void;
  setAddSegment: () => void;
  displaySegmentHelperText: boolean;
  handleShowProductModal: () => void;
  hasProduct: boolean;
  className?: string;
}

export const IxnDashboardHeader: React.FC<MyProps> = (props) => {

  const handleRollupClick = () => {
    if (!props.disableButtons) {
      props.showRollup();
    }
  };

  return (
    <div className={classNames(props.className)}>
      <div className={'ixn-dash--header'}>
        <div className={'ixn-dash--header--left-side'}>
          <div className={'ixn-dash--header--back-button'}
               onClick={props.rollupMode ? props.exitRollupMode : props.exitIxnPage}>
            <StyledBackButtonVector/>
          </div>
          <div className={'ixn-dash--header--mgrs-date-container'}>
            <div className={'ixn-dash--header--mgrs'}>
              <b>MGRS:</b> {props.target.mgrs}
            </div>
            <div className={'ixn-dash--header--date'}>
              <b>Date:</b> {props.dateString}
            </div>
          </div>
        </div>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
        <div className={'ixn-dash--header--buttons'}>
          {props.displaySegmentHelperText ?
            <span className={'header-helper-text'}>Add an Additional Segment</span>
            :
            null
          }
          <TextTooltip title={'Add Segment'}>
            <div
              className={classNames('header-button', 'add-segment-button',
                                    props.disableButtons || props.disableAddSegment ? 'disabled' : null)}
              onClick={props.setAddSegment}
            >
              <AddSegmentIcon/>
            </div>
          </TextTooltip>
          <EeiTooltip
            arrow
            title={props.target.notes}
            placement={'bottom-end'}
            interactive
            leaveDelay={100}
            open={props.displayEeiNotes}
          >
            <TextTooltip title={props.displayEeiNotes ? '' : 'EEI Notes'}>
              <div
                className={classNames('header-button', 'eei-notes-button',
                                      props.disableButtons || props.disableEeiButton ? 'disabled' : null)}
                onClick={props.toggleDisplayEeiNotes}
              >
                <EeiNotesIcon/>
              </div>
            </TextTooltip>
          </EeiTooltip>
          <TextTooltip title={props.hasProduct ? 'Download Product' : 'Upload Product'}>
            <div className={classNames('header-button', 'upload-file-button', props.disableButtons ? 'disabled' : null)}
                 onClick={props.handleShowProductModal}
            >
              <UploadFileIcon hasProduct={props.hasProduct}/>
            </div>
          </TextTooltip>
          <TextTooltip title={'Export Rollups'}>
            <div
              className={classNames('header-button', 'rollup-button',
                                    props.disableButtons || props.disableRollupButton ? 'disabled' : null)}
              onClick={handleRollupClick}
            >
              <ExportRollupsIcon/>
            </div>
          </TextTooltip>
        </div>
      </div>
    </div>
  );
};

export const StyledIxnDashboardHeader = styled(IxnDashboardHeader)`
  font-size: ${theme.font.sizeRow};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  
  .ixn-dash--header--left-side {
    display: flex;
    flex-direction: row;
  }
  
  .ixn-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${theme.color.backgroundInformation};
  }
  
  .ixn-dash--header--back-button {
    cursor: pointer;
    padding-left: 18px;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  
  .ixn-dash--header--mgrs-date-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    font-size: 20px;
  }
  
  .ixn-dash--header--tgt-name-container {
    text-align: center;
    width: 400px;
    min-width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: ${theme.font.weightBold};
  }
  
  .ixn-dash--header--tgt-name {
    font-size: 32px;
    font-weight: ${theme.font.weightMedium};
  }
  
  .ixn-dash--header--buttons {
    width: 192px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 34px;
  }
  
  .header-button {
    border-radius: 15px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  
  .ixn-dash--header--filler {
    width: 60px;
  }
  
  .header-helper-text {
    position: absolute;
    text-align: end;
    font-size: ${theme.font.sizeRegion};
    line-height: 21px;
    width: 300px;
    margin-left: -300px;
    padding-right: 8px;
    height: 24px;
  }
`;
