import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../../../store/ixn/IxnModel';
import { Box, TextField, ThemeProvider } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import { SegmentModel } from '../../../store/ixn/SegmentModel';
import classNames from 'classnames';
import theme, { rowStyles, rowTheme } from '../../../resources/theme';
import { convertTimeStringToMoment, getLastName, RowAction } from '../../../utils';
import { DeleteCancelButton } from './DeleteCancelButton';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import DoesNotMeetEeiButton from '../../components/statusButtons/DoesNotMeetEeiButton';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import TrackNarrativeButton from '../../../resources/icons/TrackNarrativeButton';
import { CancelButtonLarge } from '../../../resources/icons/CancelButtonSmall';
import CollapseNotesButton from '../../../resources/icons/CollapseNoteButton';
import { ApprovedIcon, RejectedIcon } from '../../../resources/icons/CompletedIcon';

interface MyProps {
  ixn: IxnModel|null;
  segment: SegmentModel;
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  setEditIxn: (ixnId: number) => void;
  autofocus: boolean;
  setAdding: (adding: boolean) => void;
  disabled: boolean;
  addingNote: boolean;
  setAddNote: (ixnId: number) => void;
  setEditingElement: (e: Element|null) => void;
  setIxnChanged: (isIxnChanged: boolean) => void;
  className?: string;
}

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement|null) => void;
}

function IxnTimeTextMask(props: TextMaskCustomProps) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/, 'Z']}
      placeholderChar={'_'}
      showMask
    />
  );
}

export const IxnInputRow: React.FC<MyProps> = props => {
  const classes = rowStyles();

  const [exploitAnalyst, setExploitAnalyst] = useState(props.ixn ? props.ixn.exploitAnalyst : props.tgtAnalyst);
  const [time, setTime] = useState(props.ixn ? props.ixn.time.format('HH:mm:ss') : '');
  const [activity, setActivity] = useState(props.ixn ? props.ixn.activity : '');
  const [trackAnalyst, setTrackAnalyst] = useState(props.ixn ? props.ixn.trackAnalyst : '');

  const [note, setNote] = useState(props.ixn ? props.ixn.note : '');

  const [timeInvalidError, setTimeInvalidError] = useState(false);
  const [timeOutOfBoundsError, setTimeOutOfBoundsError] = useState(false);
  const [action, setAction] = useState(RowAction.NONE);

  const ixnChanged = (props.ixn ?
    exploitAnalyst !== props.ixn.exploitAnalyst ||
    time !== props.ixn.time.format('HH:mm:ss') ||
    activity !== props.ixn.activity ||
    trackAnalyst !== props.ixn.trackAnalyst
    :
    false);

  useEffect(() => {
    props.setIxnChanged(ixnChanged);
  }, [ixnChanged]);

  const resetAction = () => {
    setTimeout(() => {
      setAction(RowAction.NONE);
    }, 500);
  };

  const handleAction = () => {
    switch (action) {
      case RowAction.DELETING:
        if (props.ixn) {
          props.setEditIxn(-1);
          props.setAddNote(-1);
          resetAction();
        } else {
          setExploitAnalyst('');
          setTime('');
          setActivity('');
          setTrackAnalyst('');
          setNote('');
          setTimeInvalidError(false);
          setTimeOutOfBoundsError(false);
          resetAction();
        }
        break;
      case RowAction.SUBMITTING:
        props.setTgtAnalyst(exploitAnalyst.trim());
        validateAndSubmit();
        break;
    }
  };

  useEffect(
    handleAction,
    [action],
  );

  const bringElementIntoView = (elementId: string) => {
    setTimeout(() => {
      let element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'nearest'});
      }
    }, 450);
  };

  const checkTimeInvalid = (time: string): boolean => {
    time = time.replace(/_/g, '0');
    return time.match(/([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/) === null;
  };

  const checkTimeOutOfBounds = (time: string): boolean => {
    let timeMoment = convertTimeStringToMoment(time);
    return (
      (timeMoment.isBefore(props.segment.startTime) ||
        timeMoment.isAfter(props.segment.endTime))
      && !(checkTimeInvalid(time))
    );
  };

  const inputExploitAnalyst = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 21) {
      setExploitAnalyst(event.target.value);
    }
    props.setAdding(!isBlank);
  };

  const inputTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTime = event.target.value;
    setTime(newTime);

    let timeInvalidErrorLocal = checkTimeInvalid(newTime);
    setTimeInvalidError(timeInvalidErrorLocal);

    if (timeInvalidErrorLocal) {
      bringElementIntoView('time-invalid-error-' + props.segment.id);
    }
    props.setAdding(!isBlank);
  };

  const inputActivity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(event.target.value.replace(/\n/g, ''));
    props.setAdding(!isBlank);
  };

  const inputTrackAnalyst = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackAnalyst(event.target.value.replace(/\n/g, ''));
    props.setAdding(!isBlank);
  };

  const inputNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value.replace(/\n/g, ''));
  };

  const timeBlur = () => {
    let newTime = time.replace(/_/g, '0');
    setTime(newTime);

    let timeOutOfBoundsErrorLocal = checkTimeOutOfBounds(newTime);
    setTimeOutOfBoundsError(timeOutOfBoundsErrorLocal);

    if (timeOutOfBoundsErrorLocal) {
      bringElementIntoView('time-oob-error-' + props.segment.id);
    }
  };

  function formBlur(event: any) {
    let currentTarget: any = event.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) && action !== RowAction.DELETING) {
        setAction(RowAction.SUBMITTING);
      } else {
        props.setEditingElement(document.activeElement);
      }
    }, 300);
  }

  const validateAndSubmit = () => {
    let timeInvalidErrorLocal = checkTimeInvalid(time);
    let timeOutOfBoundsErrorLocal = checkTimeOutOfBounds(time);
    setTimeInvalidError(timeInvalidErrorLocal);
    setTimeOutOfBoundsError(timeOutOfBoundsErrorLocal);

    if (!timeInvalidErrorLocal && !timeOutOfBoundsErrorLocal) {
      props.setAdding(false);
      if (props.segment.id) {
        props.postIxn(new IxnModel(props.ixn ? props.ixn.id :
                                     null, props.segment.rfiId, props.segment.exploitDateId, props.segment.targetId,
                                   props.segment.id,
                                   exploitAnalyst.trim(), convertTimeStringToMoment(
            time), activity.trim(), '', trackAnalyst.trim(), props.ixn ? props.ixn.status :
                                     IxnStatus.NOT_STARTED, props.ixn ? props.ixn.checker : '',
                                   props.ixn ? props.ixn.trackNarrative :
                                     '', note.trim(),
                                   props.ixn ? props.ixn.approvalStatus : IxnApprovalStatus.NOT_REVIEWED));
        if (props.ixn === null) {
          bringElementIntoView(('ixn-row-' + props.segment.id + '-input'));
        }
      }
    }

    resetAction();
  };

  const handleCancelClick = () => {
    setAction(RowAction.DELETING);
  };

  const inputProps = {
    id: 'ixn-time-' + (props.ixn !== null ? props.ixn.id!.toString() : (props.segment.id) + '-new'),
  };

  let isBlank = exploitAnalyst === '' &&
    (time === '' || time === '__:__:__') &&
    activity === '' &&
    trackAnalyst === '';

  const highlight = (props.ixn ? ixnChanged : !isBlank);
  const enterKey = 13;
  const tabKey = 9;

  return (
    <div className={props.className} id={'ixn-row-input'}>
      <ThemeProvider theme={rowTheme}>
        <form className={classNames('ixn-form', 'edit-ixn-form')}
              onKeyPress={(key) => {
                if (key.which === enterKey) {
                  setAction(RowAction.SUBMITTING);
                }
              }}
              onBlur={formBlur}
        >
          <Box
            borderRadius={8}
            className={classNames('ixn-row-box', props.disabled ? 'disabled' : null)}
          >
            <div className={classNames('ixn-box-left', highlight ? 'highlighted' : null,
                                       props.addingNote ? 'dark-bg' : 'ixn-input-section')}>
              <div className={'input-container'}>
                <TextField
                  className={classNames('exploit-analyst', 'name')}
                  value={exploitAnalyst}
                  placeholder="Name"
                  onChange={inputExploitAnalyst}
                  autoFocus={(props.autofocus && props.tgtAnalyst === '') || props.ixn !== null}
                />
              </div>
              <div className={'input-container'}>
                <Input
                  className={classNames('time')}
                  value={time}
                  onChange={inputTime}
                  inputComponent={IxnTimeTextMask as any}
                  error={(timeInvalidError && time !== '') || timeOutOfBoundsError}
                  onBlur={timeBlur}
                  required
                  inputProps={inputProps}
                  autoFocus={props.autofocus && props.tgtAnalyst !== ''}
                />
              </div>
              <div className={'input-container'}>
                <TextField
                  multiline
                  className={classNames('activity')}
                  value={activity}
                  onChange={inputActivity}
                  placeholder={'Callout'}
                />
              </div>
              <div className={'input-container'}>
                <TextField
                  className={classNames('track-analyst', 'name')}
                  value={trackAnalyst}
                  placeholder="Name"
                  onChange={inputTrackAnalyst}
                  onKeyDown={(key) => {
                    if (key.which === tabKey && !key.shiftKey) {
                      setAction(RowAction.SUBMITTING);
                    }
                  }}
                />
              </div>
              <div className={classNames('status', 'input-container')}>
                {props.ixn === null || props.ixn.status === IxnStatus.NOT_STARTED ?
                  <NotStartedButton buttonClass={classes.statusUnclickable}/>
                  : props.ixn.status === IxnStatus.IN_PROGRESS ?
                    <InProgressButton buttonClass={classes.statusUnclickable}/>
                    : props.ixn.status === IxnStatus.DOES_NOT_MEET_EEI ?
                      <DoesNotMeetEeiButton buttonClass={classes.statusUnclickable}/>
                      : <CompletedButton buttonClass={classes.statusUnclickable}/>}
              </div>
              <div className={classNames('input-container', 'track')}>
                {props.ixn && props.ixn.track ?
                  <>
                    <TrackNarrativeButton className={'no-click'} hasNarrative={props.ixn.trackNarrative.length > 0}/>
                    <span>{props.ixn.track}</span>
                  </>
                  :
                  '\xa0'
                }
              </div>
              <div className={classNames('ixn-data-cell', 'checker', props.ixn &&
              props.ixn.approvalStatus !== IxnApprovalStatus.NOT_REVIEWED ?
                'underline'
                :
                null)}>
                {props.ixn && props.ixn.approvalStatus !== IxnApprovalStatus.NOT_REVIEWED ?
                  getLastName(props.ixn.checker) : null}

                {props.ixn && props.ixn.approvalStatus === IxnApprovalStatus.APPROVED ?
                  <ApprovedIcon/>
                  : props.ixn && props.ixn.approvalStatus === IxnApprovalStatus.REJECTED ?
                    <RejectedIcon/>
                    :
                    '\xa0'
                }

              </div>
            </div>
            <DeleteCancelButton
              handleClick={props.ixn && props.addingNote && props.ixn.note !== note ?
                () => setAction(RowAction.SUBMITTING) : handleCancelClick}
              className={classNames(
                'ixn-box-right',
                highlight ? 'highlighted' : null,
                ((props.ixn === null && isBlank) ? 'delete-disabled' : null),
                (props.addingNote ? 'note-button-extended' : 'ixn-input-section'),
              )}
              buttonClassName={'cancel-edit-ixn-button'}
              title={props.addingNote ? 'Collapse Note' : 'Cancel Edit'}
            >
              {props.addingNote ? <CollapseNotesButton/> : <CancelButtonLarge/>}
            </DeleteCancelButton>
          </Box>
          {props.addingNote ?
            <div className={'note-container'}>
              <TextField
                multiline
                className={classNames('note')}
                value={note}
                onChange={inputNote}
                autoFocus
                inputProps={{
                  className: 'note-input',
                }}
              />
            </div>
            :
            null
          }
        </form>
      </ThemeProvider>
      {timeOutOfBoundsError ?
        <div className={'input-error-msg'}
             id={('time-oob-error-' + props.segment.id)}
        >
          The time you entered does not fall within the segment timeline
        </div>
        : null
      }
      {timeInvalidError && time !== '' ?
        <div className={'input-error-msg'}
             id={('time-invalid-error-' + props.segment.id)}
        >
          Invalid time.
        </div>
        : null
      }
    </div>
  );
};

export const StyledIxnInputRow = styled(IxnInputRow)`
  margin-left: 27px;
  padding-top: 4px;

  .underline {
    padding-bottom: 6px;
    border-bottom: 1px solid #FFF;
    margin: 8px 4px;
  }

  .ixn-input-section {
    border: 2px solid #48788C;
    padding-left: 0 !important;
  }
  
  .input-error-msg {
    color: ${theme.color.fontError};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightNormal};
    line-height: 19px;
  }
  
  .no-click {
    pointer-events: none;
  }
  
  .track {
    width: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 8px 6px 8px !important;
  }
  
  .delete-disabled {
    pointer-events: none;
  
    svg {
      filter: none;
      box-shadow: none;
      
      path {
        fill: ${theme.color.buttonRowDisabled};
      }
    }
  }

  .note{
    width: 100%;
  }
  
  .note-input {
    font-size: ${theme.font.sizeRegion};
    font-weight: ${theme.font.weightMedium};
  }
  
  .note-button-extended {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 0 !important;
    margin-right: -8px;
    margin-bottom: -8px;
    padding-right: 7px;
    padding-bottom: 8px;
    z-index: 1;
    flex-grow: 0 !important;
    align-self: stretch !important;
    background-color: ${theme.color.backgroundFocus} !important;
  }
  
  .cancel-edit-ixn-button {
    margin: 4px 0 0 ${(props) => props.addingNote ? '6px' : '1px'};
  }
  
  .note-container {
    width: 1410px;
    min-height: 58px;
    border-radius: 8px 0 8px 8px;
    background-color: ${theme.color.backgroundFocus};
    margin-bottom: 8px;
    padding: 12px;
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 50 !important;
    position: relative;
  }
    
  .dark-bg {
    background-color: ${theme.color.backgroundFocus} !important;
  }
  
  .input-container {
    margin: 0 4px 6px 4px;
  }
  
  .highlighted {
    background: ${theme.color.backgroundFocus} !important;
    border: 2px solid ${theme.color.backgroundFocus} !important;
  }
`;
