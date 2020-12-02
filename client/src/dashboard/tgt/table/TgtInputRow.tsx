import * as React from 'react';
import { useEffect, useState } from 'react';
import { TargetModel, TargetStatus } from '../../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { convertToPostModel, TargetPostModel } from '../../../store/tgt/TargetPostModel';
import { Box, MuiThemeProvider, TextField } from '@material-ui/core';
import theme, { rowStyles, rowTheme } from '../../../resources/theme';
import styled from 'styled-components';
import RfiModel from '../../../store/rfi/RfiModel';
import { RowAction, strongMatchMgrsError, weakMatchMgrsError } from '../../../utils';
import { Status } from '../TgtDashboard';
import classNames from 'classnames';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import CancelButton from '../../../resources/icons/CancelButton';
import { DeleteCancelButton } from '../../ixn/table/DeleteCancelButton';


interface MyProps {
  target: TargetModel|null;
  exploitDate: ExploitDateModel|null;
  rfi: RfiModel;
  setAddEditTarget: (status: Status, id?: number) => void;
  postTarget: (target: TargetPostModel) => void;
  key: number;
  addingOrEditing: boolean;
  setEditingElement: (e: Element|null) => void;
  className?: string;
}

export const TgtInputRow: React.FC<MyProps> = props => {
  const classes = rowStyles();

  const [mgrsError, setMgrsError] = useState(false);
  //If the user enters a MGRS incorrectly once, always check for exact match
  const [strongValidateMgrs, setStrongValidateMgrs] = useState(false);
  const [mgrs, setMgrs] = useState(props.target ? props.target.mgrs : '');
  const [notes, setNotes] = useState(props.target ? props.target.notes : '');
  const [description, setDescription] = useState(props.target ? props.target.description : '');
  const [action, setAction] = useState(RowAction.NONE);

  const handleAction = () => {
    switch (action) {
      case RowAction.DELETING:
        props.setAddEditTarget(Status.VIEW);
        break;
      case RowAction.SUBMITTING:
        validateAllAndSubmit();
        break;
    }
  };

  useEffect(
    handleAction,
    [action],
  );

  const inputMgrs = (event: any) => {
    let newMgrs: string = event.target.value.replace(/\n/g, '');
    setMgrs(newMgrs);
    if (strongValidateMgrs) {
      setMgrsError(strongMatchMgrsError(newMgrs));
    } else {
      setMgrsError(weakMatchMgrsError(newMgrs));
      setStrongValidateMgrs(weakMatchMgrsError(newMgrs));
    }
  };

  const inputNotes = (event: any) => {
    let newNotes: string = event.target.value.replace(/\n/g, '');
    setNotes(newNotes);
  };

  const inputDescription = (event: any) => {
    let newDescription: string = event.target.value.replace(/\n/g, '');
    setDescription(newDescription);
  };

  const validateAllAndSubmit = () => {
      let mgrsErrorLocal = strongMatchMgrsError(mgrs);
      setMgrsError(mgrsErrorLocal);

      if (!strongValidateMgrs) {
        setStrongValidateMgrs(mgrsErrorLocal);
      }
      if (!mgrsErrorLocal) {
        if (props.target) {
          props.postTarget({
                             ...convertToPostModel(props.target), mgrs: mgrs.trim(), notes: notes? notes.trim() : '',
                             description: description? description.trim() : '',
                           });
        } else {
          props.postTarget(
            new TargetPostModel(null, props.rfi.id, props.exploitDate ? props.exploitDate.id : -1, mgrs, notes,
                                description, TargetStatus.NOT_STARTED, '', ''),
          );
        }
      }
      setAction(RowAction.NONE);
    }
  ;

  function onBlur(event: any) {
    let currentTarget: any = event.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) && action !== RowAction.DELETING) {
        setAction(RowAction.SUBMITTING);
      } else {
        props.setEditingElement(document.activeElement);
      }
    }, 300);
  }

  const mgrsInputProps = {
    id: 'mgrs-input',
  };

  const notesInputProps = {
    id: 'notes-input',
  };

  const descriptionInputProps = {
    id: 'description-input',
  };

  const enterKey = 13;
  const tabKey = 9;

  return (
    <div className={props.className}>
      <Box
        borderRadius={8}
        className={'tgt-form-box'}
      >
        <MuiThemeProvider theme={rowTheme}>
          <form className={classNames('tgt-form', props.target ? 'edit-tgt-form' : 'add-tgt-form')}
                onBlur={onBlur}
                onKeyPress={(key) => {
                  if (key.which === enterKey) {
                    validateAllAndSubmit();
                  }
                }}
                onSubmit={(event) => {
                  event.preventDefault();
                }}
          >
            <div className={classNames(classes.margin, 'tgt-name', 'data-cell', 'bottom-space')}>
              {props.target ? props.target.name : '\xa0'}
            </div>
            <div className={classes.margin}>
              <TextField
                autoFocus={true}
                className={'mgrs'}
                value={mgrs}
                required
                placeholder="##XXX##########"
                label={props.target ? '' : (mgrsError ? 'Error' : 'Required')}
                error={mgrsError}
                onChange={inputMgrs}
                inputProps={mgrsInputProps}
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                multiline
                className={'notes'}
                value={notes}
                label={props.target || notes !== '' ? '' : 'EEI Notes'}
                onChange={inputNotes}
                inputProps={notesInputProps}
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                multiline
                className={'description'}
                value={description}
                label={props.target || description !== '' ? '' : 'TGT Description'}
                onChange={inputDescription}
                onKeyDown={(key: any) => {
                  if (key.keyCode === tabKey && !key.shiftKey) {
                    validateAllAndSubmit();
                  }
                }}
                inputProps={descriptionInputProps}
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
          </form>
        </MuiThemeProvider>
        <div
          className={'status-wrapper'}>
          {props.target === null || props.target.status === TargetStatus.NOT_STARTED ?
            <NotStartedButton buttonClass={classes.statusUnclickable}/>
            : (props.target.status === TargetStatus.IN_PROGRESS ?
              <InProgressButton buttonClass={classes.statusUnclickable}/>
              :
              <CompletedButton buttonClass={classes.statusUnclickable}/>)
          }
        </div>
        <DeleteCancelButton
          handleClick={() => setAction(RowAction.DELETING)}
          title={'Cancel Edit'}
          buttonClassName={'cancel-edit-tgt-button'}
          className={'delete-edit-button-container'}
        >
          <CancelButton/>
        </DeleteCancelButton>
      </Box>
      {mgrsError ?
        <div className={'input-error-msg'}>Please use the format "##XXX##########" for MGRS</div>
        : null
      }
    </div>
  );
};

export const StyledTgtInputRow = styled(TgtInputRow)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: -4px;
  width: 1212px;
  margin-bottom: -1px;
  
  .tgt-name {
    width: 67px;
    margin: 10px 4px 0 12px !important;
  }
  
  .bottom-space {
    margin-bottom: 12px !important;
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
  
  .data-overflow {
    overflow-wrap: break-word;
  }
  
  .data-bottom {
    height: 7px;
    margin-bottom: 4px;
    width: calc(100% - 16px);
    border-bottom: 1px solid #FFFFFF;
  }
  
  .tgt-form-box {
    min-height: 62px;
    width: 100%;
    margin-top: 8px;
    background-color: ${theme.color.backgroundInformation};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
    flex-grow: 1;
    box-shadow: -2px 2px 4px #000000;
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
    pointer-events: none;
  
    svg {
      filter: none;
      
      path {
        fill: ${theme.color.buttonRowDisabled};
      }
    }
  }
`;
