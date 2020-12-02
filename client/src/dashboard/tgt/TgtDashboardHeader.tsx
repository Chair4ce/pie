import * as React from 'react';
import styled from 'styled-components';
import RfiModel from '../../store/rfi/RfiModel';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import theme from '../../resources/theme';
import AddTgtDateVector from '../../resources/icons/AddTgtDateVector';
import classNames from 'classnames';
import TextTooltip from '../components/TextTooltip';
import CopyTargetsButton from '../../resources/icons/CopyTargetsButton';
import UploadFileIcon from '../../resources/icons/UploadFileIcon';

interface OwnProps {
  exitTgtPage: () => void;
  rfi: RfiModel;
  editing: boolean;
  addDate: () => void;
  disabled: boolean;
  displayHelperText: boolean;
  displayExploitDateHelper: boolean;
  displayCopyTargets: () => void;
  handleShowProductModal: () => void;
  className?: string;
}

export const TgtDashboardHeader: React.FC<OwnProps> = (props) => {
  const handleDateClick = () => {
    if (!props.disabled) {
      props.addDate();
      setTimeout(() => {
        let scrollToLocation = document.getElementById('tgt-table-scrollable-region');
        if (scrollToLocation !== null) {
          scrollToLocation!.scrollTo(0, scrollToLocation!.scrollHeight);
        }
      }, 50);
    }
  };

  const handleCopyTgtsClick = () => {
    if (!props.displayHelperText) {
      props.displayCopyTargets();
    }
  };

  return (
    <div className={props.className}>
      <div className={'tgt-dash--header'}>
        <div className={'tgt-dash--header--back-button'} onClick={() => props.exitTgtPage()}>
          <StyledBackButtonVector/>
        </div>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
        <div className={'tgt-dash--header--right-section'}>
          {props.displayHelperText || props.displayExploitDateHelper ?
            <div className={'header-helper-text'}>{
              props.displayExploitDateHelper ?
                'Add Coverage Date to Exploit TGTs'
                :
                'Add additional coverage dates'
            }
            </div>
            :
            null
          }
          <TextTooltip
            title={'Add Exploit Date'}
            PopperProps={{
              className: 'header-tooltip',
            }}
            disableFocusListener={props.displayHelperText}
            disableHoverListener={props.displayHelperText}
            disableTouchListener={props.displayHelperText}
          >
            <div className={classNames('add-date-button header-button', props.disabled ? 'disabled' : null)}
                 onClick={handleDateClick}
            >
              <AddTgtDateVector/>
            </div>
          </TextTooltip>
          <TextTooltip title={props.rfi.productName === null ? 'Upload Product' : 'Download Product'}
                       PopperProps={{
                         className: 'header-tooltip',
                       }}>
            <div className={classNames('upload-file-button header-button', props.disabled ? 'disabled' : null)}
                 onClick={() => props.handleShowProductModal()}
            >
              <UploadFileIcon hasProduct={props.rfi.productName !== null}/>
            </div>
          </TextTooltip>
          <TextTooltip
            title={'Copy Targets'}
            PopperProps={{
              className: 'header-tooltip',
            }}
          >
            <div className={classNames('copy-tgts-button header-button',
                                       props.disabled || props.displayHelperText ? 'disabled' : null)}
                 onClick={handleCopyTgtsClick}
            >
              <CopyTargetsButton/>
            </div>
          </TextTooltip>
        </div>
      </div>
    </div>
  );
};

export const StyledTgtDashboardHeader = styled(TgtDashboardHeader)`
  font-size: ${theme.font.sizeRow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .tgt-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    padding-right: 34px;
    background: ${theme.color.backgroundInformation};
    z-index: 10000;
  }
  
  .tgt-dash--header--back-button {
    cursor: pointer;
    padding-left: 18px;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  
  .header-helper-text {
    position: absolute;
    text-align: end;
    font-size: ${theme.font.sizeRegion};
    font-weight: ${theme.font.weightBold};
    width: 300px;
    margin-left: -300px;
    padding-right: 8px;
    height: 24px;
  }
  
  .tgt-dash--header--rfi-num {
    font-size: 32px;
    font-weight: ${theme.font.weightMedium};
  }
  
  .tgt-dash--header--right-section {
    width: 138px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
    
  .header-button {
    border-radius: 15px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;
