import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TargetModel } from '../../store/tgt/TargetModel';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { StyledIxnDashboardHeader } from './IxnDashboardHeader';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import {
  deleteIxn, deleteSegment, exitIxnPage, navigateToIxnPage, saveRollup, setAddNote, setAddSegment, setEditIxn,
  setEditSegment, updateIxn, updateSegment,
} from '../../store/ixn';
import theme, { rowStyles } from '../../resources/theme';
import IxnModel, { IxnApprovalStatus } from '../../store/ixn/IxnModel';
import { useCookies } from 'react-cookie';
import { DismissSnackbarAction } from '../components/InformationalSnackbar';
import { useSnackbar } from 'notistack';
import { convertToPostModel, TargetPostModel } from '../../store/tgt/TargetPostModel';
import { postRollupClick } from '../../store/metrics';
import { RollupClickModel } from '../../store/metrics/RollupClickModel';
import { RollupMode, StyledRollupView } from './RollupView';
import { IxnTableView } from './IxnTableView';
import { Cookie } from '../../utils';
import { RfiStatus } from '../../store/rfi/RfiModel';
import { UndoSnackbarAction } from '../components/UndoSnackbarAction';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { loadTgtPage } from '../../store/tgt/Thunks';
import { StyledFileUploadModal } from '../components/FileUploadModal';
import { deleteProduct, postProductUpload, undoDeleteProduct } from '../../store/rfi';
import { StyledFileDownloadModal } from '../components/FileDownloadModal';

interface MyProps {
  className?: string
}

export const IxnDashboard: React.FC<MyProps> = (props) => {
  const moment = require('moment');

  const rfi = useSelector(({tgtState}: ApplicationState) => tgtState.rfi);
  const target = useSelector(({ixnState}: ApplicationState) => ixnState.target);
  const dateString = useSelector(({ixnState}: ApplicationState) => ixnState.dateString);
  const segments = useSelector(({ixnState}: ApplicationState) => ixnState.segments);
  const ixns = useSelector(({ixnState}: ApplicationState) => ixnState.ixns);
  const autofocus = useSelector(({ixnState}: ApplicationState) => ixnState.autofocus);
  const readOnly = useSelector(({tgtState}: ApplicationState) => tgtState.rfi).status === RfiStatus.CLOSED;
  const addSegment = useSelector(({ixnState}: ApplicationState) => ixnState.addSegment);
  const editSegment = useSelector(({ixnState}: ApplicationState) => ixnState.editSegment);
  const editIxn = useSelector(({ixnState}: ApplicationState) => ixnState.editIxn);
  const addNote = useSelector(({ixnState}: ApplicationState) => ixnState.addNote);
  const newSegment = useSelector(({ixnState}: ApplicationState) => ixnState.newSegment);
  const highlight = useSelector(({ixnState}: ApplicationState) => ixnState.highlight);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newSegment) {
      enqueueSnackbar(`${newSegment.startTime.format('HH:mm:ss')} - ${newSegment.endTime.format('HH:mm:ss')} Created`, {
        action: (key) =>
          UndoSnackbarAction(key, newSegment, handleDeleteSegmentSkipSnackbar, closeSnackbar, classes.snackbarButton),
        variant: 'info',
      });
    }
  }, [newSegment]);

  enum Navigate {
    BACK,
    CANCEL_ADD_SEGMENT,
    CANCEL_EDIT_SEGMENT,
    CANCEL_EDIT_IXN
  }

  const addingOrEditing = addSegment || editSegment > 0 || editIxn > 0 || addNote > 0 || readOnly;

  const [tgtAnalyst, setTgtAnalyst] = useState('');
  const [rollupMode, setRollupMode] = useState(false);
  const [displayEeiNotes, setDisplayEeiNotes] = useState(false);

  const [navigate, setNavigate] = useState(Navigate.BACK as TargetModel|Navigate);
  const [navigating, setNavigating] = useState(false);
  const [editingElement, setEditingElement] = useState(null as Element|null);
  const [isSegmentChanged, setIsSegmentChanged] = useState(false);
  const [isIxnChanged, setIsIxnChanged] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showDownloadFileModal, setShowDownloadFileModal] = useState(false);

  let isNavigating = false;

  const [cookies, setCookies] = useCookies(['magpie']);
  let cookie: Cookie = cookies.magpie;

  const rowClasses = rowStyles();

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const classes = rowStyles();

  const displaySnackbar = (message: string) => {
    enqueueSnackbar(message, {
      action: (key) => DismissSnackbarAction(key, closeSnackbar, rowClasses.snackbarButton),
      variant: 'info',
    });
  };

  const handleCollapse = (segmentId: number) => {
    let segments = cookie.segments;
    if (segments.includes(segmentId)) {
      segments.splice(segments.indexOf(segmentId), 1);
    } else {
      segments.push(segmentId);
    }
    setCookies('magpie', {...cookie, segments: segments});
  };

  const handleExitIxnPage = () => {
    if (editIxn > 0 || (editSegment > 0 && isSegmentChanged) ||
      (addSegment && (segments.length > 0 || isSegmentChanged))) {
      setNavigating(true);
      isNavigating = true;
      setNavigate(Navigate.BACK);
    } else {
      setCookies('magpie', {...cookie, viewState: {rfiId: target.rfiId, tgtId: undefined}});
      dispatch(loadTgtPage(rfi, true));
    }
  };

  const handleNavigate = () => {
    if (navigate === Navigate.BACK) {
      setCookies('magpie', {...cookie, viewState: {rfiId: target.rfiId, tgtId: undefined}});
      dispatch(exitIxnPage());
    } else if (navigate === Navigate.CANCEL_ADD_SEGMENT) {
      dispatch(setAddSegment(false));
    } else if (navigate === Navigate.CANCEL_EDIT_IXN) {
      dispatch(setEditIxn(-1));
    } else if (navigate === Navigate.CANCEL_EDIT_SEGMENT) {
      dispatch(setEditSegment(-1));
    } else {
      setCookies('magpie', {...cookie, viewState: {rfiId: target.rfiId, tgtId: navigate.id}});
      dispatch(navigateToIxnPage(navigate, dateString));
    }
  };

  const handleSelectTarget = (newTarget: TargetModel, dateString: string) => {
    if (editIxn > 0 || (editSegment > 0 && isSegmentChanged) ||
      (addSegment && (segments.length > 0 || isSegmentChanged))) {
      setNavigating(true);
      isNavigating = true;
      setNavigate(newTarget);
    } else {
      setDisplayEeiNotes(false);
      setTimeout(() => {
        dispatch(navigateToIxnPage(newTarget, dateString));
        setCookies('magpie', {...cookie, viewState: {rfiId: newTarget.rfiId, tgtId: newTarget.id}});
      }, 100);
    }
  };

  const handleShowRollup = () => {
    setRollupMode(true);
    postRollupClick(new RollupClickModel(target.id, cookie.userName));
  };

  const handleExitRollupMode = () => {
    setRollupMode(false);
  };

  const handleSaveRollup = (mode: RollupMode, rollup: string) => {
    setRollupMode(false);
    let newTarget: TargetPostModel;
    if (mode === RollupMode.ALL_CALLOUTS) {
      newTarget = {...convertToPostModel(target), allCallouts: rollup};
    } else {
      newTarget = {...convertToPostModel(target), hourlyRollup: rollup};
    }
    dispatch(saveRollup(newTarget, dateString, cookie.userName));
    displaySnackbar('Rollup Saved');
  };

  const handleDisplaySnackbar = (message: string) => {
    displaySnackbar(message);
  };

  const handleSetAddSegment = () => {
    if (!addingOrEditing) {
      dispatch(setAddSegment(true));
    } else if (isSegmentChanged) {
      setNavigating(true);
      isNavigating = true;
      setNavigate(Navigate.CANCEL_ADD_SEGMENT);
    } else {
      dispatch(setAddSegment(false));
    }
  };

  const handleEditSegment = (segmentId: number) => {
    if (!addingOrEditing) {
      dispatch(setEditSegment(segmentId));
    } else if (segmentId < 0) {
      if (isSegmentChanged) {
        setNavigating(true);
        isNavigating = true;
        setNavigate(Navigate.CANCEL_EDIT_SEGMENT);
      } else {
        dispatch(setEditSegment(-1));
      }
    }
  };

  const handleEditIxn = (ixnId: number) => {
    if (!addingOrEditing) {
      dispatch(setEditIxn(ixnId));
    } else if (ixnId < 0) {
      if (isIxnChanged) {
        setNavigating(true);
        isNavigating = true;
        setNavigate(Navigate.CANCEL_EDIT_IXN);
      } else {
        dispatch(setEditIxn(-1));
      }
    }
  };

  const handleAddNote = (ixnId: number) => {
    if (!addingOrEditing) {
      dispatch(setAddNote(ixnId));
    } else if (ixnId < 0) {
      dispatch(setAddNote(-1));
    }
  };

  const handlePostIxn = (ixn: IxnModel) => {
    if (!navigating) {
      let oldIxn: IxnModel|undefined = ixns.find(findIxn => findIxn.id === ixn.id);
      if (!readOnly) {
        if (addNote > 0 && oldIxn !== undefined) {
          enqueueSnackbar('Analyst Note Saved.', {
            action: (key) => UndoSnackbarAction(key, oldIxn!, handlePostIxnSkipSnackbar, closeSnackbar,
                                                classes.snackbarButton),
            variant: 'info',
          });
        }
        dispatch(updateIxn(ixn, cookie.userName, ixn.id === null));
        if (ixn.approvalStatus === IxnApprovalStatus.REJECTED && oldIxn && oldIxn.approvalStatus !==
          IxnApprovalStatus.REJECTED) {
          displaySnackbar('Reason saved successfully');
        }
      }
    }
  };

  const handlePostSegment = (segment: SegmentModel) => {
    if (!isNavigating && !navigating && !readOnly) {
      dispatch(updateSegment(segment));
    }
  };

  const handlePostIxnSkipSnackbar = (ixn: IxnModel) => {
    dispatch(updateIxn(ixn, cookie.userName));
  };

  const handleDeleteIxn = (ixn: IxnModel) => {
    if (!readOnly) {
      enqueueSnackbar('Interaction deleted', {
        action: (key) =>
          UndoSnackbarAction(key, ixn, handlePostIxn, closeSnackbar, classes.snackbarButton),
        variant: 'info',
      });
      dispatch(deleteIxn(ixn));
    }
  };

  const handleDeleteSegment = (segment: SegmentModel) => {
    if (!readOnly) {
      enqueueSnackbar('You deleted ' + segment.startTime.format('HH:mm:ss') + 'Z-' +
                        segment.endTime.format('HH:mm:ss') + 'Z', {
                        action: (key) => UndoSnackbarAction(key, segment, handlePostSegment, closeSnackbar,
                                                            classes.snackbarButton),
                        variant: 'info',
                      });
      dispatch(deleteSegment(segment));
    }
  };

  const handleDeleteSegmentSkipSnackbar = (segment: SegmentModel) => {
    if (!readOnly) {
      dispatch(deleteSegment(segment));
    }
  };

  const handleToggleDisplayEeiNotes = () => {
    setDisplayEeiNotes(!displayEeiNotes);
  };

  const handleFileUpload = (file: File) => {
    if (rfi && file) {
      let data = new FormData();
      data.append('file', file);
      data.append('name', file.name);

      dispatch(postProductUpload(data, rfi.id, cookie.userName));
      setShowUploadFileModal(false);
      enqueueSnackbar('Product Submitted', {
        action: (key) => DismissSnackbarAction(key, closeSnackbar, 'dismiss-snackbar'),
        variant: 'info',
      });
    }
  };

  const handleShowProductModal = () => {
    if (rfi.productName) {
      setShowDownloadFileModal(true);
    } else {
      setShowUploadFileModal(true);
    }
  };

  const handleDeleteProduct = (rfiId: number, productName: string) => {
    enqueueSnackbar(`${productName} Deleted`, {
      action: (key) => UndoSnackbarAction(key, rfiId, () => handleUndoDeleteProduct(rfiId),
                                          closeSnackbar, classes.snackbarButton),
      variant: 'info',
    });
    dispatch(deleteProduct(rfiId, cookie.userName));
  };

  const handleUndoDeleteProduct = (rfiId: number) => {
    dispatch(undoDeleteProduct(rfiId, cookie.userName));
  };

  const isAddSegmentDisabled = segments.length < 1 || addingOrEditing || rollupMode;
  const element = editIxn > 0 ? 'callout' : 'segment';

  return (
    <div className={classNames(props.className)}>
      <StyledIxnDashboardHeader
        target={target}
        dateString={dateString}
        rollupMode={rollupMode}
        exitIxnPage={handleExitIxnPage}
        disableButtons={addingOrEditing}
        disableRollupButton={rollupMode || ixns.length === 0}
        disableEeiButton={target.notes === ''}
        disableAddSegment={isAddSegmentDisabled}
        showRollup={handleShowRollup}
        toggleDisplayEeiNotes={handleToggleDisplayEeiNotes}
        displayEeiNotes={displayEeiNotes}
        displaySegmentHelperText={segments.length === 1}
        setAddSegment={handleSetAddSegment}
        exitRollupMode={handleExitRollupMode}
        handleShowProductModal={handleShowProductModal}
        hasProduct={rfi.productName !== null}
      />
      {
        rollupMode ?
          <StyledRollupView
            target={target}
            dateString={moment(dateString, 'MM/DD/YYYY').format('DDMMMYY').toUpperCase()}
            segments={segments}
            ixns={ixns}
            exitRollupMode={handleExitRollupMode}
            saveRollup={handleSaveRollup}
            displaySnackbar={handleDisplaySnackbar}
            userName={cookie.userName}
            readOnly={readOnly}
          />
          :
          <IxnTableView
            target={target}
            segments={segments}
            ixns={ixns}
            autofocus={autofocus}
            tgtAnalyst={tgtAnalyst}
            setTgtAnalyst={setTgtAnalyst}
            collapsedSegments={cookie.segments}
            collapse={handleCollapse}
            userName={cookie.userName}
            dateString={moment(dateString, 'MM/DD/YYYY').format('DDMMMYY').toUpperCase()}
            readOnly={readOnly}
            addSegment={addSegment}
            editSegment={editSegment}
            editIxn={editIxn}
            addNote={addNote}
            addingOrEditing={addingOrEditing}
            setEditingElement={setEditingElement}
            selectTarget={handleSelectTarget}
            handleSetAddSegment={handleSetAddSegment}
            handleEditSegment={handleEditSegment}
            handleEditIxn={handleEditIxn}
            handleAddNote={handleAddNote}
            handlePostSegment={handlePostSegment}
            handlePostIxn={handlePostIxn}
            handleDeleteIxn={handleDeleteIxn}
            handleDeleteSegment={handleDeleteSegment}
            setSegmentChanged={setIsSegmentChanged}
            setIxnChanged={setIsIxnChanged}
            highlight={highlight}
          />
      }
      {navigating ?
        <ConfirmationModal
          message={`You haven't saved the ${element} you were editing.`}
          display={true}
          setDisplay={() => {
            setNavigating(false);
            isNavigating = false;
          }}
          handleYes={handleNavigate}
          focusedElement={editingElement}
        />
        :
        null}
      {showUploadFileModal ?
        <StyledFileUploadModal hideModal={() => setShowUploadFileModal(false)} handleFileUpload={handleFileUpload}/>
        :
        null
      }
      {showDownloadFileModal && rfi ?
        <StyledFileDownloadModal
          hideModal={() => setShowDownloadFileModal(false)}
          handleDeleteProduct={() => handleDeleteProduct(rfi!.id,
                                                         typeof rfi.productName === 'string' ? rfi.productName : '')}
          rfi={rfi}
          userName={cookie.userName}
        />
        :
        null
      }
    </div>
  );
};

export const StyledIxnDashboard = styled(IxnDashboard)`
  font-size: ${theme.font.sizeRow};
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  
  .ixn-dash {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
  }
  
  .ixn-dash-body {
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 27px;
  }
  
  .table-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 1435px;
    margin-left: 27px;
  }

  .header {
    margin-top: -25px;
    padding-left: 8px;
  }
  
  .header-cell--analyst {
    width: 156px;
  }
  
  .name {
    width: 146px;
  }
  
  .checker {
    width: 136px !important;
  }
  
  .header-cell--checker {
    width: 146px;
  }
  
  .header-cell--time {
    width: 95px;
  }
  
  .time {
    width: 98px;
  }
  
  .header-cell--callout {
    width: 574px;
  }

  .activity {
    width: 570px;
  }
  
  .header-cell--id {
    text-align: center;
    width: 95px;
  }
  
  .track {
    width: 75px;
    text-align: center;
  }
  
  .header-cell--status {
    width: 110px;
  }
  
  .status {
    width: 110px;
  }
  
  .header-cell--delete-spacer {
    width: 65px;
  }
  
  .hidden-input {
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
  
  .ixn-row-box {
    margin: 4px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-weight: normal;
    align-self: flex-start;
  }
  
  .ixn-box-left {
    background-color: ${theme.color.backgroundInformation};
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    min-height: 62px;
    width: 1348px;
  }
  
  .segment-divider-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 17px;
    margin-left: 27px;
  }
  
  .segment-divider-empty {
    margin-top: 46px;
    margin-left: -17px
  }
  
  .ixn-box-right {
    background-color: ${theme.color.backgroundInformation};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 58px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    margin-left: 4px;
    padding-left: 4px;
    height: inherit;
    cursor: pointer;
    flex: 1 1 auto;
  }
  
  .exploitation-log-button-wrapper {
    display: flex;
  }
  
  .segment-helper-text {
    font-weight: ${theme.font.weightBold};
    font-size: ${theme.font.sizeHeader};
    line-height: ${theme.font.sizeHelperText};
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
  }
   
  .checker {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  
  .status-wrapper {
    margin-top: 2px;
  }
  
  .ixn-body-spacer {
    width: 70px;
  }
`;
