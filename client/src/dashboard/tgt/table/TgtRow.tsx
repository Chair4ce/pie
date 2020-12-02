import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Box } from '@material-ui/core';
import { StyledExploitationLogButtonVector } from '../../../resources/icons/ExploitationLogButtonVector';
import theme, { rowStyles } from '../../../resources/theme';
import { TargetModel, TargetStatus } from '../../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { convertToPostModel, TargetPostModel } from '../../../store/tgt/TargetPostModel';
import RfiModel, { RfiStatus } from '../../../store/rfi/RfiModel';
import { StyledTgtStatusPickerOutline } from '../../../resources/icons/TgtStatusPickerOutline';
import { Status } from '../TgtDashboard';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import { IxnDeserializer } from '../../../store/ixn/IxnDeserializer';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import { MiniTrashcanButton } from '../../../resources/icons/MiniTrashcanButton';
import HtmlTooltip from '../../components/HtmlToolTip';
import { RejectArrow } from '../../../resources/icons/RejectArrowIcon';

interface MyProps {
  target: TargetModel;
  exploitDate: ExploitDateModel|null;
  rfi: RfiModel;
  setAddEditTarget: (status: Status, id?: number) => void;
  postTarget: (target: TargetPostModel) => void;
  navigateToIxnPage: (target: TargetModel, dateString: string) => void;
  deleteTgt: (tgt: TargetModel) => void;
  key: number;
  addingOrEditing: boolean;
  highlight: boolean;
  className?: string;
}

export const TgtRow: React.FC<MyProps> = (props) => {
  const classes = rowStyles();

  const [displayModal, setDisplayModal] = useState(false);
  const [highlighted, setHighlighted] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (!props.highlight) {
      setHighlighted(false);
    } else {
      setTimeout(() => {
        setHighlighted(false);
      }, 5000);
    }
  }, [props.highlight]);

  const submitStatusChange = (status: TargetStatus) => {
    let newTarget: TargetPostModel = {...convertToPostModel(props.target), status: status};
    props.postTarget(
      newTarget,
    );
  };

  const handleDeleteClick = () => {
    fetch('/api/ixn/' + props.target.id)
      .then(response => response.json())
      .then(ixns => checkIxns(IxnDeserializer.deserialize(ixns).length > 0))
      .catch((reason) => {
        console.log('Failed to delete: ' + reason);
      });
  };

  const performDelete = () => {
    props.deleteTgt(props.target);
  };

  const checkIxns = (hasIxns: boolean) => {
    if (hasIxns) {
      setDisplayModal(true);
    } else {
      performDelete();
    }
  };

  const handleIxnClick = () => {
    if (props.target !== null && props.exploitDate !== null) {
      props.navigateToIxnPage(props.target, props.exploitDate.exploitDate.format('MM/DD/YYYY'));
    }
  };

  const handleDoubleClick = (event: any) => {
    let className: String = event.target.className;
    props.setAddEditTarget(Status.EDIT, props.target.id);
    setTimeout(() => {
      if (className.includes('name') && document.getElementById('tgt-name-input')) {
        document.getElementById('tgt-name-input')!.focus();
      }
      if (className.includes('mgrs') && document.getElementById('mgrs-input')) {
        document.getElementById('mgrs-input')!.focus();
      }
      if (className.includes('notes') && document.getElementById('notes-input')) {
        document.getElementById('notes-input')!.focus();
      }
      if (className.includes('description') && document.getElementById('description-input')) {
        document.getElementById('description-input')!.focus();
      }
    }, 50);
  };

  return (
    <div className={props.className} onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)}>
      <Box
        borderRadius={8}
        className={'tgt-form-box'}
      >
        <div className={classNames('tgt-row-left', props.target.containsRejectedTracks ? 'red-border' : null,
                                   highlighted && props.highlight ? 'highlighted' : null)}>
          {props.target.containsRejectedTracks ?
            <RejectArrow message={'This TGT contains\nrejected callouts.'}/>
            :
            null
          }
          <div className={'tgt-form'}
               onDoubleClick={handleDoubleClick}
          >
            <div className={'data-cell-container'}>
              <div className={classNames('data-cell', 'tgt-name')}>
                {props.target.name === '' ? '\xa0' : props.target.name}
              </div>
              <div className={'data-bottom-no-underline no-select'}>&nbsp;</div>
            </div>
            <div className={'data-cell-container'}>
              <div className={classNames('data-cell', 'mgrs')}>
                {props.target.mgrs}
              </div>
              <div className={'data-bottom'}>&nbsp;</div>
            </div>
            <div className={'data-cell-container'}>
              <div className={classNames('data-cell', 'notes')}>
                <div className={'data-notes'}>
                  {props.target.notes === '' ? '\xa0' : props.target.notes}
                </div>
              </div>
              <div className={'data-bottom'}>&nbsp;</div>
            </div>
            <div className={'data-cell-container'}>
              <div className={classNames('data-cell', 'description')}>
                <div className={'data-description'}>
                  {props.target.description === '' ? '\xa0' : props.target.description}
                </div>
              </div>
              <div className={'data-bottom'}>&nbsp;</div>
            </div>
          </div>
          <HtmlTooltip
            title={
              <div className={'status-menu'}>
                <StyledTgtStatusPickerOutline/>
                <InProgressButton buttonClass={classNames(classes.inProgress, classes.clickable, classes.tgtClickable)}
                                  onClick={() => submitStatusChange(TargetStatus.IN_PROGRESS)}/>
                <CompletedButton buttonClass={classNames(classes.completed, classes.clickable, classes.tgtClickable)}
                                 onClick={() => submitStatusChange(TargetStatus.COMPLETED)}/>
              </div>
            }
            interactive
            disableHoverListener={props.addingOrEditing || props.exploitDate === null}
          >
            <div
              className={'status-wrapper'}>
              {props.target.status === TargetStatus.NOT_STARTED ?
                <NotStartedButton buttonClass={classes.statusUnclickable}/>
                : (props.target.status === TargetStatus.IN_PROGRESS ?
                  <InProgressButton buttonClass={classes.statusUnclickable}/>
                  :
                  <CompletedButton buttonClass={classes.statusUnclickable}/>)
              }</div>
          </HtmlTooltip>
        </div>
        <div className={classNames('tgt-row-right', props.target.containsRejectedTracks ? 'red-border' : null,
                                   highlighted && props.highlight ? 'highlighted' : null)}>
          <div className={classNames('exploitation', (props.addingOrEditing && !(props.rfi.status === RfiStatus.CLOSED))
          || props.exploitDate === null ? 'delete-disabled' : null)} onClick={handleIxnClick}>
            <StyledExploitationLogButtonVector/>
          </div>
        </div>
        {showDelete && props.rfi.status !== RfiStatus.CLOSED ?
          <div className={'delete-container'}>
            <MiniTrashcanButton onClick={handleDeleteClick} className={'delete-tgt-button'} tooltip={'Delete Target'}/>
          </div>
          :
          <div className={'delete-container'}>&nbsp;</div>}
      </Box>
      <DeleteConfirmationModal
        deletingItem={props.target.name}
        display={displayModal}
        setDisplay={setDisplayModal}
        handleYes={() => performDelete()}
      />
    </div>
  );
};

export const StyledTgtRow = styled(TgtRow)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
  width: 1212px;
  
  .reject-arrow {
    width: 26px;
    height: 32px;
    margin-left: -26px;
    z-index: 999;
  }
  
  .red-border {
    border: 2px solid ${theme.color.buttonDoesNotMeetEei};
    margin: -2px;
  }
  
  .tgt-name {
    width: 67px;
    margin: 10px 4px 0 12px !important;
  }
  
  .mgrs {
    width: 155px;
  }
  
  .notes {
    width: 437px;
  }
  
  .description {
    width: 262px;
  }
  
  .status {
    width: 120px;
  }
  
  .data-cell {
    margin: 10px 8px 0 8px;
    overflow-wrap: break-word;
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightNormal};
    position: relative;
    
  }
  
  .data-cell-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .data-bottom {
    height: 7px;
    margin-bottom: 4px;
    width: calc(100% - 16px);
    border-bottom: 1px solid #FFFFFF;
  }
  
  .data-bottom-no-underline {
    height: 7px;
    margin-bottom: 4px;
  }
  
  .exploitation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    align-self: stretch;
  }
  
  .tgt-form-box {
    width: 100%;
    margin: 4px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
  }
  
  .tgt-row-left {
    background-color: ${theme.color.backgroundInformation};
    box-shadow: -2px 2px 4px #000000;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    min-height: 62px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  
  .tgt-row-right {
    background-color: ${theme.color.backgroundInformation};
    box-shadow: -2px 2px 4px #000000;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    justify-content: center;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-left: 9px;
    width: 108px;
    align-self: stretch;
  }
  
  .tgt-form {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .status-wrapper {
    align-self: center;
    margin-right: 25px;
  }
  
  .input-error-msg {
    color: ${theme.color.fontError};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightNormal};
    line-height: 19px;
  }
  
  .status-menu {
    cursor: pointer;
  }
  
  .delete-disabled {
    svg {
      opacity: 0.5;
    }
    
    pointer-events: none;
  }
  
  .highlighted {
    background: ${theme.color.backgroundFocus} !important;
  }
  
  .delete-container {
    align-self: flex-start;
    margin-top: -13px;
    margin-right: -16px;
    height: 20px;
    width: 20px;
  }
`;
