import { Modal, TextField } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { useEffect, useState } from 'react';
import theme, { longInputStyles, rowStyles } from '../../../resources/theme';
import IxnModel from '../../../store/ixn/IxnModel';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { DismissSnackbarAction } from '../../components/InformationalSnackbar';
import styled from 'styled-components';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { StyledScoiChip } from './ScoiChip';
import { StyledExpandCollapseArrow } from '../../../resources/icons/ExpandCollapse';
import { ScoiModel } from '../../../store/scoi/ScoiModel';
import { StyledMgrsModal } from './MgrsModal';
import { postScoi } from '../../../store/scoi/Actions';

interface MyProps {
  setDisplay: (display: boolean) => void;
  ixn: IxnModel;
  submitTrackNarrative: (trackNarrative: string) => void;
  dateString: string;
  readOnly: boolean;
  userName: string;
  className?: string;
}

export const TrackNarrativeModal: React.FC<MyProps> = props => {
  const classes = longInputStyles();
  const rowClasses = rowStyles();
  const initNarrative = props.dateString + '\n\nSTART\n\n\n\nSTOP';

  const [trackNarrative, setTrackNarrative] = useState(
    props.ixn.trackNarrative === '' ?
      initNarrative
      :
      props.ixn.trackNarrative,
  );
  const [scoiNameList, setScoiNameList] = useState([] as string[]);
  const [scoiList, setScoiList] = useState([] as ScoiModel[]);
  const [collapseScoiChips, setCollapseScoiChips] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [displayMgrsModal, setDisplayMgrsModal] = useState(false);
  const [newName, setNewName] = useState('');

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  useEffect(() => {
    checkForScois(trackNarrative);
  }, []);

  //Overlay spans with backgrounds on the MGRSes for highlight
  let trackNarrativeDisplay = () => {
    const parts = trackNarrative.split(/([A-Z]{3}[0-9]{2}-S[0-9]{0,4})/g);
    return <span>{parts.map((part, i) =>
                              <span key={i} style={part.match(/[A-Z]{3}[0-9]{2}-S[0-9]{0,4}/g) !== null ?
                                {backgroundColor: '#42686A', borderRadius: '4px'} : {}}>
            {part}
        </span>)
    }<br/><br/><br/></span>;
  };

  const inputTrackNarrative = (event: any) => {
    let newTrackNarrative: string = event.target.value;
    //look for SCOIs to save
    checkForScois(newTrackNarrative);
    setTrackNarrative(newTrackNarrative);
  };

  const checkForMgrs = (scoiName: string) => {
    //query backend
    fetch('/api/scoi?name=' + scoiName, {
      method: 'get',
    })
      .then(response => {
        //if not exists, prompt for mgrs
        if (response.status === 404) {
          setNewName(scoiName);
          setDisplayMgrsModal(true);
          return;
        } else {
          return response.json();
        }
      })
      .then(responseJson => {
        //if exists, add new SCOI model to list
        if (responseJson) {
          setScoiList(scoiList => scoiList.concat(responseJson));
        }
      }).catch((reason) => console.log('Failed to fetch SCOI: ' + reason));
  };

  const checkForScois = (trackNarrative: string) => {
    let matches: RegExpMatchArray|null = trackNarrative.match(/[A-Z]{3}[0-9]{2}-S[0-9]{4}/g);
    let newScoiNameList: string[] = [];
    if (matches) {
      matches.forEach((match: string) => {
        if (!newScoiNameList.includes(match)) {
          newScoiNameList.push(match);
        }
        if (!scoiList.find((scoi) => scoi.name === match)) {
          checkForMgrs(match);
        }
      });
    }
    setScoiNameList(newScoiNameList);
  };

  const displaySnackbar = (message: string) => {
    enqueueSnackbar(message, {
      action: (key) => DismissSnackbarAction(key, closeSnackbar, rowClasses.snackbarButton),
      variant: 'info',
    });
  };

  const handleSave = () => {
    if (!props.readOnly) {
      props.submitTrackNarrative(trackNarrative);
      props.setDisplay(false);
      displaySnackbar('Track Narrative Saved');
    }
  };

  const mapScoisToChips = () => {
    return scoiList
      .filter(
        (scoi) => scoiNameList.includes(scoi.name),
      )
      .map((scoi: ScoiModel, index: number) =>
             <StyledScoiChip scoi={scoi} key={index}/>,
      );
  };

  //Scrolls highlights with the input text
  setTimeout(() => {
    let trackNarrativeInput = document.getElementById('track-narrative-' + props.ixn.id)!;
    let trackNarrativeDisplayDiv = document.getElementById(`track-narrative-display-${props.ixn.id}`)!;

    if (trackNarrativeInput && trackNarrativeDisplayDiv) {
      trackNarrativeInput.onscroll = function () {
        trackNarrativeDisplayDiv.scrollTop = trackNarrativeInput.scrollTop;
      };
    }
  }, 500);

  const cancelMgrsInput = () => {
    let newScoiNameList = Array.from(scoiNameList);
    newScoiNameList.splice(newScoiNameList.indexOf(newName), 1);

    setTrackNarrative(trackNarrative => trackNarrative.replace(newName, ''));
    setScoiNameList(newScoiNameList);
    setDisplayMgrsModal(false);
    setNewName('');
  };

  const handlePostScoi = (mgrs: string) => {
    let scoi = new ScoiModel(undefined, newName, mgrs, '');
    postScoi(scoi, props.userName)
      .then(response => response.json())
      .then(scoi => {
        setScoiList(scoiList => scoiList.concat(scoi));
        displaySnackbar(`${scoi.name} created`);
      })
      .catch((reason) => console.log('Failed to receive SCOI: ' + reason));
    setDisplayMgrsModal(false);
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
      onClose={() => props.setDisplay(false)}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={classNames('narrative-modal', classes.modal, props.className)}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <div className={classes.narrativeModalBody}>
        <form className={classNames('track-narrative-form')}
        >
          <div className={'track-narrative-header'}>
            <div>&nbsp;</div>
            <span><b>{props.ixn.track}</b></span>
            <div
              className={classNames('cancel', classes.modalButton)}
              onClick={
                () =>
                  (props.ixn.trackNarrative === '' && trackNarrative === initNarrative) ||
                  props.ixn.trackNarrative === trackNarrative
                    ?
                    props.setDisplay(false)
                    :
                    setNavigating(true)
              }
            >
              <DeleteButtonX/>
            </div>
          </div>
          <div className={classNames('narrative-input', props.readOnly ? 'narrative-text-wrapper' : null)}>
            {!props.readOnly ?
              <>
                <div id={`track-narrative-display-${props.ixn.id}`} className={classNames('track-narrative-display',
                                                                                          classes.modalTextfield)}>{trackNarrativeDisplay()}</div>
                <TextField
                  className={classNames('track-narrative', classes.modalTextfield)}
                  value={trackNarrative}
                  onChange={inputTrackNarrative}
                  autoFocus
                  multiline
                  rows={27}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  inputProps={{
                    id: 'track-narrative-' + props.ixn.id,
                    className: 'track-narrative-input',
                  }}
                />
              </>
              :
              <TextField
                className={classNames('track-narrative uneditable', classes.modalTextfield)}
                value={trackNarrative}
                multiline
                rows={27}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  id: 'track-narrative-' + props.ixn.id,
                  className: 'track-narrative-input',
                }}
              />
            }
            {scoiList.length > 0 ?
              <div className={'scoi-container'}>
                <div className={'scoi-queue-header'}>
                  <span>
                    SCOI Queue:
                  </span>
                  <div className='expand-collapse-scois' onClick={() => setCollapseScoiChips(!collapseScoiChips)}>
                    <StyledExpandCollapseArrow collapsed={collapseScoiChips}/>
                  </div>
                </div>
                {collapseScoiChips ?
                  null
                  :
                  <div className={'scoi-queue'}>
                    {mapScoisToChips()}
                  </div>
                }
              </div>
              :
              null
            }
          </div>
        </form>
        <div className={classNames('button-section', classes.modalConfirmation)}>
          <CopyToClipboard onCopy={() => displaySnackbar('Copied to Clipboard')} text={trackNarrative}>
            <div
              className={classNames('copy-to-clipboard', 'no-select', classes.copyToClipboard)}
            >
              Copy to Clipboard
            </div>
          </CopyToClipboard>
          <div
            onClick={handleSave}
            className={classNames('save', 'no-select', classes.saveSubmitButton, classes.modalButton,
                                  props.readOnly ? 'disabled' : null)}
          >
            SAVE
          </div>
        </div>
        {navigating ?
          <ConfirmationModal
            message={`You haven't saved the track narrative you were editing.`}
            display={true}
            setDisplay={setNavigating}
            handleYes={() => props.setDisplay(false)}
            focusedElement={null}
          />
          :
          null}
        {displayMgrsModal ?
          <StyledMgrsModal
            hideModal={cancelMgrsInput}
            submitScoi={handlePostScoi}
          />
          :
          null
        }
      </div>
    </Modal>
  );
};

export const StyledTrackNarrativeModal = styled(TrackNarrativeModal)`
  margin-top: -350px !important;

  .track-narrative-header {
    display: flex;
    height: 30px;
    align-self: stretch;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 942px;
    padding: 2px;
    margin-top: -2px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background: ${theme.color.backgroundFocus};
  }

  .narrative-text {
    margin-top: 8px;
    width: 100%;
    align-self: flex-start;
    justify-self: flex-start;
    word-wrap: break-word;
    white-space: pre-wrap;
    text-align: left;
  }
  
  .narrative-text-wrapper {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    overflow-y: auto !important;
  }
  
  .narrative-input {
    padding: 0 2px;
  }
  
  .cancel {
    padding-top: 3px;
    padding-right: 3px;
  }
  
  .button-section {
    height: 64px;
  }
  
  .uneditable {
    pointer-events: none;
  }
  
  .scoi-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 9px;
    width: 942px;
    background: ${theme.color.backgroundScoiContainer};
    border-left: 2px solid ${theme.color.backgroundFocus};
    border-right: 2px solid ${theme.color.backgroundFocus};
    margin: 0 -2px;
    overflow-y: auto;
  }
  
  .scoi-queue-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background: ${theme.color.backgroundScoiContainer};
    padding: 0 25px 2px 0;
  }
  
  .scoi-queue {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    max-height: 56px;
  }
  
  .track-narrative {
    background: none; //no background in order to let highligts show
  }
  
  .track-narrative-input {
    text-align: left;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: normal;
  }
  
  .track-narrative-display {
    color: rgba(0, 0, 0, 0); //hide text
    overflow-y: hidden;
    white-space: pre-wrap;
    text-align: left;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: normal;
    padding-top: 6px !important;
    height: 526px;
    margin-bottom: -526px;
  }
`;
