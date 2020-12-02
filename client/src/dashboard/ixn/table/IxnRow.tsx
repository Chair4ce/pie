import * as React from 'react';
import { useEffect, useState } from 'react';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../../../store/ixn/IxnModel';
import { Box, Theme, Tooltip, withStyles } from '@material-ui/core';
import { SegmentModel } from '../../../store/ixn/SegmentModel';
import classNames from 'classnames';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import { StyledIxnStatusPickerOutline } from '../../../resources/icons/IxnStatusPickerOutline';
import DoesNotMeetEeiButton from '../../components/statusButtons/DoesNotMeetEeiButton';
import { DeleteCancelButton } from './DeleteCancelButton';
import styled from 'styled-components';
import theme, { rowStyles } from '../../../resources/theme';
import TrackNarrativeButton from '../../../resources/icons/TrackNarrativeButton';
import { StyledTrackNarrativeModal } from './TrackNarrativeModal';
import { postTrackNarrativeClick } from '../../../store/metrics';
import { TrackNarrativeClickModel } from '../../../store/metrics/TrackNarrativeClickModel';
import TextTooltip from '../../components/TextTooltip';
import { MiniTrashcanButton } from '../../../resources/icons/MiniTrashcanButton';
import { NoteButton } from '../../../resources/icons/NoteButton';
import { CancelButtonLarge } from '../../../resources/icons/CancelButtonSmall';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { getLastName } from '../../../utils';
import { ApprovedIcon, RejectedIcon } from '../../../resources/icons/CompletedIcon';
import { RejectModal } from './RejectModal';
import { RejectArrow } from '../../../resources/icons/RejectArrowIcon';

interface MyProps {
  ixn: IxnModel;
  segment: SegmentModel;
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  setEditIxn: (ixnId: number) => void;
  addingOrEditing: boolean;
  userName: string;
  dateString: string;
  setAddNote: (ixnId: number) => void;
  disabled: boolean;
  readOnly: boolean;
  highlight: number;
  className?: string;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    marginTop: '-15px',
  },
}))(Tooltip);

export const IxnRow: React.FC<MyProps> = props => {
  const classes = rowStyles();

  const [displayTrackNarrative, setDisplayTrackNarrative] = useState(false);
  const [displayNote, setDisplayNote] = useState(false);
  const [ixnToPost, setIxnToPost] = useState(props.ixn);
  const [displayModal, setDisplayModal] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [displayRejectModal, setDisplayRejectModal] = useState(false);

  useEffect(() => {
    if (props.highlight === props.ixn.id) {
      setHighlighted(true);
      setTimeout(() => {
        setHighlighted(false);
      }, 5000);
    }
  }, [props.highlight, props.ixn.id]);

  const handleDeleteClick = () => {
    props.deleteIxn(props.ixn);
  };

  const handleDoubleClick = () => {
    props.setEditIxn(props.ixn.id!);
  };

  const finishCheckRenumbering = (willRenumber: boolean, ixn: IxnModel) => {
    if (willRenumber) {
      setDisplayModal(true);
      setIxnToPost(ixn);
    } else {
      props.postIxn(ixn);
    }
  };

  const checkRenumbering = (ixn: IxnModel) => {
    fetch('/api/ixn/check-renumber',
          {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ixn),
          },
    )
      .then(response => response.json())
      .then(willRenumber => finishCheckRenumbering(willRenumber, ixn))
      .catch((reason) => {
        console.log('Failed to delete: ' + reason);
      });
  };

  const submitStatusChange = (status: IxnStatus) => {
    let ixn: IxnModel = {...props.ixn, status: status, approvalStatus: IxnApprovalStatus.NOT_REVIEWED};

    if (
      ( //Going from not having a track ID to having one
        (props.ixn.status === IxnStatus.NOT_STARTED || props.ixn.status === IxnStatus.DOES_NOT_MEET_EEI)
        &&
        (status === IxnStatus.IN_PROGRESS || status === IxnStatus.COMPLETED)
      )
      ||
      ( //Going from having a track ID to not having one
        (props.ixn.status === IxnStatus.IN_PROGRESS || props.ixn.status === IxnStatus.COMPLETED)
        &&
        status === IxnStatus.DOES_NOT_MEET_EEI
      )
    ) {
      checkRenumbering(ixn);
    } else {
      props.postIxn(ixn);
    }
  };

  const handleSubmitTrackNarrative = (trackNarrative: string) => {
    let ixn: IxnModel = {...props.ixn, trackNarrative: trackNarrative};
    props.postIxn(ixn);
  };

  const handleTrackNarrativeClick = () => {
    postTrackNarrativeClick(new TrackNarrativeClickModel(props.ixn.id!, props.userName));
    setDisplayTrackNarrative(true);

    setTimeout(() => {
      if (props.ixn.trackNarrative === '') {
        let element = document.getElementById('track-narrative-' + props.ixn.id);
        if (element instanceof HTMLTextAreaElement) {
          element.setSelectionRange(16, 16);
        }
      }
    }, 100);
  };

  const handleNoteClick = () => {
    if (props.readOnly) {
      setDisplayNote(!displayNote);
    } else {
      props.setAddNote(props.ixn.id!);
    }
  };

  const handleApprove = () => {
    let ixn: IxnModel = {...props.ixn, approvalStatus: IxnApprovalStatus.APPROVED, checker: props.userName};
    props.postIxn(ixn);
  };

  const handleReject = (rejectReason: string) => {
    let ixn: IxnModel = {
      ...props.ixn, approvalStatus: IxnApprovalStatus.REJECTED, status: IxnStatus.IN_PROGRESS, checker: props.userName,
      note: props.ixn.note === '' ? rejectReason :
        rejectReason === '' ? props.ixn.note : rejectReason + '\n\n' + props.ixn.note,
    };
    props.postIxn(ixn);
    setDisplayRejectModal(false);
  };

  return (
    <div className={classNames(props.className, 'ixn-row')}
         id={'ixn-row-' + props.segment.id + '-' + props.ixn.id}
         onMouseEnter={() => setShowDelete(true)}
         onMouseLeave={() => setShowDelete(false)}
    >
      <Box
        borderRadius={8}
        className={classNames('ixn-row-box', props.disabled ? 'disabled' : null)}
        onDoubleClick={handleDoubleClick}
      >
        {props.ixn.approvalStatus === IxnApprovalStatus.REJECTED ?
          <RejectArrow/>
          :
          <div className={'no-arrow'}>&nbsp;</div>
        }
        <div className={classNames('ixn-box-left', highlighted ? 'highlighted' : null,
                                   props.ixn.approvalStatus === IxnApprovalStatus.REJECTED ? 'red-border'
                                     : props.ixn.approvalStatus === IxnApprovalStatus.APPROVED ? 'green-border'
                                     : 'no-border')}
        >
          <div className={classNames('ixn-data-cell', 'exploit-analyst', 'name')}>
            {props.ixn.exploitAnalyst ? props.ixn.exploitAnalyst : '\xa0'}
          </div>
          <div className={classNames('ixn-data-cell', 'time')}>
            {props.ixn.time.utc().format('HH:mm:ss') + 'Z'}
          </div>
          <div className={classNames('ixn-data-cell', 'activity')}>
            {props.ixn.activity ? props.ixn.activity : '\xa0'}
          </div>
          <div className={classNames('ixn-data-cell', 'track-analyst', 'name')}>
            {props.ixn.trackAnalyst ? props.ixn.trackAnalyst : '\xa0'}
          </div>
          <div className={classNames('ixn-data-cell', 'status', 'no-underline')}>
            <HtmlTooltip
              title={
                <div className={'status-menu'}>
                  <StyledIxnStatusPickerOutline/>
                  <InProgressButton
                    buttonClass={classNames(classes.inProgress, classes.clickable, 'in-progress-button')}
                    onClick={() => submitStatusChange(IxnStatus.IN_PROGRESS)}/>
                  <CompletedButton buttonClass={classNames(classes.completed, classes.clickable, 'completed-button')}
                                   onClick={() => submitStatusChange(IxnStatus.COMPLETED)}/>
                  <DoesNotMeetEeiButton
                    buttonClass={classNames(classes.doesNotMeetEei, classes.clickable, 'does-not-meet-eei-button')}
                    onClick={() => submitStatusChange(IxnStatus.DOES_NOT_MEET_EEI)}/>
                </div>
              }
              interactive
              disableHoverListener={props.addingOrEditing}
            >
              <div className={'status-wrapper'}>
                {props.ixn.status === IxnStatus.NOT_STARTED ?
                  <NotStartedButton buttonClass={classes.statusUnclickable}/>
                  : props.ixn.status === IxnStatus.IN_PROGRESS ?
                    <InProgressButton buttonClass={classes.statusUnclickable}/>
                    : props.ixn.status === IxnStatus.DOES_NOT_MEET_EEI ?
                      <DoesNotMeetEeiButton buttonClass={classes.statusUnclickable}/>
                      : <CompletedButton buttonClass={classes.statusUnclickable}/>}
              </div>
            </HtmlTooltip>
          </div>
          <div className={classNames('ixn-data-cell', 'track', 'no-underline')}>
            {props.ixn.track ?
              <>
                <TextTooltip title={'Track Narrative'}>
                  <div className={'track-narrative-button'} onClick={handleTrackNarrativeClick}>
                    <TrackNarrativeButton hasNarrative={props.ixn.trackNarrative !== ''}/>
                  </div>
                </TextTooltip>
                <span>{props.ixn.track}</span>
              </>
              :
              '\xa0'
            }
          </div>
          <div className={classNames('ixn-data-cell', 'checker',
                                     props.ixn.approvalStatus === IxnApprovalStatus.NOT_REVIEWED ?
                                       'no-underline'
                                       :
                                       null)}>
            {props.ixn.approvalStatus !== IxnApprovalStatus.NOT_REVIEWED ? getLastName(props.ixn.checker) : null}

            {props.ixn.approvalStatus === IxnApprovalStatus.NOT_REVIEWED && props.ixn.status === IxnStatus.COMPLETED ?
              <>
                <div className={'approve-button approve-reject-button no-select'} onClick={handleApprove}>Approve
                </div>

                <div className={'reject-button approve-reject-button no-select'}
                     onClick={() => setDisplayRejectModal(true)}>Reject
                </div>
              </>
              :
              props.ixn.approvalStatus === IxnApprovalStatus.APPROVED ?
                <TextTooltip title={'Reject'}>
                  <div className={'approved-button'} onClick={() => setDisplayRejectModal(true)}>
                    <ApprovedIcon/>
                  </div>
                </TextTooltip>
                : props.ixn.approvalStatus === IxnApprovalStatus.REJECTED ?
                <RejectedIcon/>
                :
                '\xa0'
            }

          </div>
        </div>
        <DeleteCancelButton
          handleClick={handleNoteClick}
          className={classNames('ixn-box-right', highlighted ? 'highlighted' : null,
                                displayNote ? 'note-button-extended' : null,
                                props.ixn.approvalStatus === IxnApprovalStatus.REJECTED ? 'red-border'
                                  : props.ixn.approvalStatus === IxnApprovalStatus.APPROVED ? 'green-border'
                                  : 'no-border')}
          buttonClassName={'note-button'}
          title={!displayNote ? 'Analyst Notes' : 'Hide Notes'}
        >
          {!displayNote ?
            <NoteButton hasNote={props.ixn.note !== ''}/>
            :
            <CancelButtonLarge/>
          }
        </DeleteCancelButton>
        <div className={'delete-container'}>
          {showDelete && !props.readOnly ?
            <MiniTrashcanButton className={'delete-ixn-button'} tooltip={'Delete Callout'} onClick={handleDeleteClick}/>
            :
            '\xa0'
          }
        </div>
      </Box>
      {displayNote ?
        <div className={'note-container'}>
          <div className={'ixn-data-cell note'}>
            {props.ixn.note}
          </div>
        </div>
        :
        null
      }
      {displayTrackNarrative ?
        <StyledTrackNarrativeModal
          setDisplay={setDisplayTrackNarrative}
          ixn={props.ixn}
          submitTrackNarrative={handleSubmitTrackNarrative}
          dateString={props.dateString}
          readOnly={props.readOnly}
          userName={props.userName}
        />
        :
        null
      }
      {displayModal ?
        <ConfirmationModal
          display={true}
          message={'Generating a track for this callout will renumber all previous track IDs and all track narratives.'}
          message2={'Do you want to continue?'}
          setDisplay={() => {
            setDisplayModal(false);
          }}
          handleYes={() => {
            setDisplayModal(false);
            props.postIxn(ixnToPost);
          }}
        />
        :
        null}
      {displayRejectModal ?
        <RejectModal
          className={'reject-modal-container'}
          handleConfirm={handleReject}
          handleClose={() => setDisplayRejectModal(false)}
        />
        :
        null}
    </div>
  );
};

export const StyledIxnRow = styled(IxnRow)`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding-top: 12px;
  margin-top: -6px;
  
  .reject-arrow {
    width: 27px;
    height: 32px;
    z-index: 99999;
  }
  
  .no-arrow {
    width: 27px;
  }
  
  .red-border {
    border: 2px solid ${theme.color.buttonDoesNotMeetEei};
  }
  
  .green-border {
    border: 2px solid ${theme.color.complete};
  }
  
  .no-border {
    border: 2px solid rgba(0,0,0,0);
  }
  
  .ixn-data-cell {
    margin: 8px 4px 8px 4px;
    padding-bottom: 6px;
    overflow-wrap: break-word;
    border-bottom: 1px solid #FFFFFF;
  }
  
  .track-narrative-button {
    margin-right: 2px !important;
  }
  
  .approve-reject-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 63px;
    height: 32px;
    border-radius: 20px;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    box-shadow: 0 2px 4px #000000;
    cursor: pointer;
  
    :hover {
      box-shadow: 0 0 6px #FFF;
    }
  }
  
  .approve-button {
    border: 2px solid ${theme.color.complete};
  }
  
  .reject-button {
    border: 2px solid ${theme.color.buttonDoesNotMeetEei};
  }
  
  .track {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 8px 0 8px;
  }
  
  .no-underline {
    border:none;
  }
  
  .track-narrative-input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 917px;
    height: 534px;
    border: 2px aliceblue;
    border-radius: 5px;
  }
  
  .note-button-extended {
    width: 58px !important;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: stretch !important;
    border-top-right-radius: 8px;
    padding-left: 4px;
    margin-right: -8px;
    background-color: ${theme.color.backgroundInformation};
    margin-bottom: -8px;
    z-index: 1;
    flex-grow: 0 !important;
  }
  
  .note-container {
    width: 1410px;
    min-height: 58px;
    border-radius: 8px 0 8px 8px;
    background-color: ${theme.color.backgroundInformation};
    margin: -4px 0 8px 0;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 50 !important;
    position: relative;
    word-wrap: break-word;
  }
  
  .note {
    margin: 0 !important;
    width: 100%;
  }
  
  .highlighted {
    background: ${theme.color.backgroundFocus} !important;
  }
  
  .delete-container {
    align-self: flex-start;
    margin-top: -13px;
    height: 20px;
    width: 20px;
  }
`;
