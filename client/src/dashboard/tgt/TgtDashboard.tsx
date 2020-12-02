import styled from 'styled-components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { StyledTableHeader } from '../components/header/TableHeader';
import { StyledTgtTable } from './table/TgtTable';
import { StyledExploitDateDivider } from './table/ExploitDateDivider';
import theme, { longInputStyles, rowStyles } from '../../resources/theme';
import { ApplicationState } from '../../store';
import { StyledTgtDateRegion } from './table/TgtDateRegion';
import { StyledTgtDashboardHeader } from './TgtDashboardHeader';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { TargetModel } from '../../store/tgt/TargetModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import {
  deleteExploitDate, deleteTargets, deleteTgt, loadTgtPage, postExploitDate, submitPostTargets,
} from '../../store/tgt/Thunks';
import { addTgt, editTgt, exitTgtPage, resetAddEditTgt } from '../../store/tgt';
import { convertToPostModel, TargetPostModel } from '../../store/tgt/TargetPostModel';
import { ExploitDatePostModel } from '../../store/tgt/ExploitDatePostModel';
import { useCookies } from 'react-cookie';
import { Cookie, truncateAndConvertDateToUtc } from '../../utils';
import { UndoSnackbarAction } from '../components/UndoSnackbarAction';
import { navigateToIxnPage } from '../../store/ixn';
import { useSnackbar } from 'notistack';
import { StyledRfiSidebar } from './sidebar/RfiSidebar';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { StyledTgtCopyModal } from './TgtCopyModal';
import { StyledTgtInputRow } from './table/TgtInputRow';
import { StyledTgtRow } from './table/TgtRow';
import { Modal } from '@material-ui/core';
import { deleteProduct, fetchLocalUpdate, postProductUpload, undoDeleteProduct } from '../../store/rfi';
import { DismissSnackbarAction } from '../components/InformationalSnackbar';
import { StyledFileUploadModal } from '../components/FileUploadModal';
import { StyledFileDownloadModal } from '../components/FileDownloadModal';

interface MyProps {
  className?: string;
}

export enum Status {
  VIEW,
  ADD,
  EDIT
}

export const TgtDashboard: React.FC<MyProps> = (props) => {
  const moment = require('moment');
  const classes = rowStyles();
  const [cookies, setCookies] = useCookies(['magpie']);
  let cookie: Cookie = cookies.magpie;
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const rfi = useSelector(({tgtState}: ApplicationState ) => tgtState.rfi);
  const exploitDates = useSelector(({tgtState}: ApplicationState ) => tgtState.exploitDates);
  const showDatePlaceholder = useSelector(({tgtState}: ApplicationState ) => tgtState.showDatePlaceholder);
  const targets = useSelector(({tgtState}: ApplicationState ) => tgtState.targets);
  const addTgtId = useSelector(({tgtState}: ApplicationState ) => tgtState.addTgt);
  const editTgtId = useSelector(({tgtState}: ApplicationState ) => tgtState.editTgt);
  const highlight = useSelector(({tgtState}: ApplicationState ) => tgtState.highlight);

  const [addDate, setAddDate] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [navigate, setNavigate] = useState(null as RfiModel|null);
  const [displayCopyTargets, setDisplayCopyTargets] = useState(false);
  const [displayCopyAllTargets, setDisplayCopyAllTargets] = useState(false);
  const [editingElement, setEditingElement] = useState(null as Element|null);
  const [copyTgts, setCopyTgts] = useState([] as TargetPostModel[]);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showDownloadFileModal, setShowDownloadFileModal] = useState(false);

  const isDisabled = addTgtId > 0 || addDate || editTgtId > 0 || rfi.status === RfiStatus.CLOSED
    || displayCopyAllTargets || displayCopyTargets;

  let newExploitDate = useSelector(({tgtState}: ApplicationState) => tgtState.newExploitDate);

  useEffect(() => {
    if (newExploitDate) {
      enqueueSnackbar(newExploitDate.exploitDate.format('MM/DD/YYYY') + ' Created', {
        action: (key) => UndoSnackbarAction(key, newExploitDate!.id, handleUndoPostExploitDate,
                                            closeSnackbar, classes.snackbarButton),
        variant: 'info',
      });

      let newTgts: TargetPostModel[] = [];
      if (targets.length > 0 && targets[0].exploitDateId === -1) {
        for (let tgt of targets) {
          let newTgt = {...convertToPostModel(tgt), exploitDateId: newExploitDate!.id};
          newTgts.push(newTgt);
        }
        handlePostTargets(newTgts, false);
      } else if (targets.length > 0 && targets[0].exploitDateId > 0) {
        for (let tgt of targets) {
          let newTgt = {...convertToPostModel(tgt), targetId: null, exploitDateId: newExploitDate!.id};
          newTgts.push(newTgt);
        }
        setCopyTgts(newTgts);
        setDisplayCopyAllTargets(true);
      }
    }
  }, [newExploitDate]);

  const dispatch = useDispatch();

  const handleUndoPostExploitDate = (exploitDateId: number) => {
    dispatch(deleteExploitDate(exploitDateId));
  };

  const handleUndoPostTargets = (targets: TargetPostModel[]) => {
    dispatch(deleteTargets(targets, cookie.userName));

  };

  const handleExitTgtPage = () => {
    if (addTgtId > 0 || editTgtId > 0) {
      setNavigating(true);
      setNavigate(null);
    } else {
      setCookies('magpie', {...cookie, viewState: {rfiId: undefined, tgtId: undefined}});
      dispatch(exitTgtPage());
      dispatch(fetchLocalUpdate());
    }
  };

  const handlePostTargets = (targets: TargetPostModel[], isCopy: boolean) => {
    if (!navigating) {
      if (rfi.status !== RfiStatus.CLOSED) {
        let tgts: TargetModel[] = [];
        for (let target of targets) {
          let tgt = new TargetModel(target.targetId ? target.targetId : -1, target.rfiId, target.exploitDateId,
                                    '', target.mgrs, target.notes, target.description, target.status, '', '', false);
          tgts.push(tgt);
        }
        if (isCopy) {
          enqueueSnackbar('Targets Copied', {
            action: (key) => UndoSnackbarAction(key, targets, handleUndoPostTargets, closeSnackbar,
                                                classes.snackbarButton),
            variant: 'info',
          });
        } else if (targets[0].targetId === null) {
          enqueueSnackbar('Target Created', {
            action: (key) => UndoSnackbarAction(key, targets, handleUndoPostTargets, closeSnackbar,
                                                classes.snackbarButton),
            variant: 'info',
          });
        }
        dispatch(submitPostTargets(targets, rfi, cookie.userName, isCopy));
      }
    }
  };

  const handlePostTarget = (target: TargetPostModel) => {
    handlePostTargets([target], false);
  };

  async function handlePostExploitDate(date: ExploitDatePostModel) {
    if (rfi.status !== RfiStatus.CLOSED) {
      dispatch(postExploitDate(rfi, date));
    }
  }

  const handleAddEdit = (status: Status, id?: number) => {
    if (rfi.status !== RfiStatus.CLOSED) {
      switch (status) {
        case Status.ADD:
          if (id && addTgtId === -1 && editTgtId === -1) {
            dispatch(addTgt(id));
          }
          break;
        case Status.EDIT:
          if (id && addTgtId === -1 && editTgtId === -1) {
            dispatch(editTgt(id));
          }
          break;
        case Status.VIEW:
          dispatch(resetAddEditTgt());
      }
    }
  };

  const handleDeleteTarget = (target: TargetModel) => {
    if (rfi.status !== RfiStatus.CLOSED) {
      enqueueSnackbar('You deleted ' + target.name, {
        action: (key) => UndoSnackbarAction(key, {...target, targetId: target.id} as TargetPostModel,
                                            handlePostTarget, closeSnackbar, classes.snackbarButton),
        variant: 'info',
      });
      dispatch(deleteTgt(target.id));
    }
  };

  const handleDeleteExploitDate = (exploitDate: ExploitDateModel) => {
    if (rfi.status !== RfiStatus.CLOSED) {
      let exploitDatePost: ExploitDatePostModel = new ExploitDatePostModel(
        exploitDate.id,
        exploitDate.rfiId,
        truncateAndConvertDateToUtc(new Date(exploitDate.exploitDate.unix() * 1000)),
      );
      enqueueSnackbar('You deleted ' + exploitDate.exploitDate.format('MM/DD/YYYY'), {
        action: (key) => UndoSnackbarAction(key, exploitDatePost, handlePostExploitDate, closeSnackbar,
                                            classes.snackbarButton),
        variant: 'info',
      });
      dispatch(deleteExploitDate(exploitDate.id));
    }
  };

  const handleNavigateToIxnPage = (target: TargetModel, dateString: string) => {
    if (!isDisabled || rfi.status === RfiStatus.CLOSED) {
      setCookies('magpie', {...cookie, viewState: {rfiId: target.rfiId, tgtId: target.id}});
      dispatch(navigateToIxnPage(target, dateString));
    }
  };

  const handleSelectRfi = (rfi: RfiModel) => {
    if (addTgtId > 0 || editTgtId > 0) {
      setNavigating(true);
      setNavigate(rfi);
    } else {
      setAddDate(false);
      setCookies('magpie', {...cookie, viewState: {rfiId: rfi.id}});
      dispatch(loadTgtPage(rfi, true));
    }
  };

  const handleNavigate = () => {
    if (navigate === null) {
      setCookies('magpie', {...cookie, viewState: {rfiId: undefined, tgtId: undefined}});
      dispatch(exitTgtPage());
      dispatch(fetchLocalUpdate());
    } else {
      setCookies('magpie', {...cookie, viewState: {rfiId: navigate.id}});
      dispatch(loadTgtPage(navigate, true));
    }
  };

  const handleAddDate = () => {
    setAddDate(true);
  };

  const handleShowProductModal = () => {
    if (rfi.productName) {
      setShowDownloadFileModal(true);
    } else {
      setShowUploadFileModal(true);
    }
  };

  function printDates(dates: ExploitDateModel[]) {
    return dates.map(
      (exploitDateModel: ExploitDateModel, index: number) =>
        <StyledTgtDateRegion
          rfi={rfi}
          addDate={addDate}
          setAddDate={setAddDate}
          exploitDate={exploitDateModel}
          exploitDateDisplay={exploitDateModel.exploitDate.utc().format('D MMM YY')}
          targets={targets.filter(target => target.exploitDateId === exploitDateModel.id)}
          editTarget={editTgtId}
          addTgt={addTgtId}
          setAddEditTarget={handleAddEdit}
          index={index}
          className={'date-divider--' + moment(exploitDateModel.exploitDate).format('D-MMM-YY')}
          key={index}
          addingOrEditing={isDisabled}
          postTarget={handlePostTarget}
          postExploitDate={handlePostExploitDate}
          deleteTgt={handleDeleteTarget}
          navigateToIxnPage={handleNavigateToIxnPage}
          deleteExploitDate={handleDeleteExploitDate}
          disabled={isDisabled}
          highlight={highlight}
          setEditingElement={setEditingElement}
        />,
    );
  }

  function printGetsTargets() {
    return targets.map(
      (target: TargetModel, index: number) =>
        editTgtId === target.id ?
          <StyledTgtInputRow
            target={target}
            key={index}
            rfi={rfi}
            exploitDate={null}
            setAddEditTarget={handleAddEdit}
            addingOrEditing={isDisabled}
            postTarget={handlePostTarget}
            setEditingElement={setEditingElement}
          />
          :
          <StyledTgtRow
            target={target}
            key={index}
            rfi={rfi}
            exploitDate={null}
            setAddEditTarget={handleAddEdit}
            addingOrEditing={isDisabled}
            postTarget={handlePostTarget}
            deleteTgt={handleDeleteTarget}
            navigateToIxnPage={handleNavigateToIxnPage}
            highlight={highlight}
          />,
    );
  }

  const CopyTargetsModal = () => {
      const classes = longInputStyles();
      return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={displayCopyAllTargets}
          onClose={() => setDisplayCopyAllTargets(false)}
          style={{
            top: '50%',
            left: '50%',
          }}
          className={classNames('delete-modal', classes.deleteModal)}
        >
          <div className={classes.modalBody}>
            <div className={'modal-text'}>Would you like to import <br/>targets from all previous dates?</div>
            <div className={classes.modalConfirmation}>
              <div className={classNames('modal-no', classes.modalButton)} onClick={() => {
                setDisplayCopyAllTargets(false);
              }}>
                No
              </div>
              <div className={classNames('modal-yes', classes.modalButton)} onClick={() => {
                handlePostTargets(copyTgts, true);
                setDisplayCopyAllTargets(false);
              }}>
                Yes
              </div>
            </div>
          </div>
        </Modal>
      );
    }
  ;

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

  const headers = ['TGT ID', 'MGRS', 'EEI Notes', 'TGT Description', 'Status'];

  return (
    <div className={props.className}>
      <StyledTgtDashboardHeader
        exitTgtPage={handleExitTgtPage}
        rfi={rfi}
        editing={addTgtId > 0 || editTgtId > 0 || addDate}
        addDate={handleAddDate}
        disabled={isDisabled}
        displayHelperText={exploitDates.length < 2 && rfi.status === RfiStatus.OPEN}
        displayExploitDateHelper={targets.length > 0 && exploitDates.length === 0}
        displayCopyTargets={() => setDisplayCopyTargets(true)}
        handleShowProductModal={handleShowProductModal}
      />
      <div className={'tgt-dash-container'}>
        <div className={'rfi-sidebar'}>
          <StyledRfiSidebar
            rfi={rfi}
            selectRfi={handleSelectRfi}
          />
        </div>
        <div className={'tgt-dash'}>
          {targets.length > 0 && targets[0].exploitDateId === -1 ?
            <div className={'tgt-dash-body'}>
              <StyledTableHeader
                className={'tgt-table-header'}
                headers={headers}
              />
              <StyledTgtTable displayHelperText={false}>
                {addDate ?
                  <StyledExploitDateDivider
                    rfiId={rfi.id}
                    setAddDate={setAddDate}
                    className={classNames('date-divider--placeholder', 'date-divider--no-top-margin',
                                          exploitDates.length === 0 ? 'date-divider--new' : null)}
                    uKey={rfi.id}
                    hasTgts={false}
                    postExploitDate={handlePostExploitDate}
                    deleteExploitDate={() => {
                    }}
                    disabled={false}
                    highlight={true}
                  />
                  :
                  null
                }
                {printGetsTargets()}
                {addTgtId === 1 ?
                  <StyledTgtInputRow
                    target={null}
                    key={99999}
                    rfi={rfi}
                    exploitDate={null}
                    setAddEditTarget={handleAddEdit}
                    addingOrEditing={isDisabled}
                    postTarget={handlePostTarget}
                    setEditingElement={setEditingElement}
                  />
                  :
                  <div
                    className={classNames('add-tgt-button', 'no-select')}
                    onClick={() => handleAddEdit(Status.ADD, 1)}
                  >
                    Add Target
                  </div>
                }

              </StyledTgtTable>
            </div>
            :
            <div className={'tgt-dash-body'}>
              {exploitDates.length > 0 || showDatePlaceholder ?
                <StyledTableHeader
                  className={'tgt-table-header'}
                  headers={headers}
                />
                :
                null
              }
              <StyledTgtTable
                displayHelperText={exploitDates.length === 0 && rfi.status !== RfiStatus.CLOSED}>
                {printDates(exploitDates)}
                {addDate ?
                  <StyledExploitDateDivider
                    rfiId={rfi.id}
                    setAddDate={setAddDate}
                    className={classNames('date-divider--placeholder',
                                          exploitDates.length === 0 ? 'date-divider--new' : null)}
                    uKey={rfi.id}
                    hasTgts={false}
                    postExploitDate={handlePostExploitDate}
                    deleteExploitDate={() => {
                    }}
                    disabled={false}
                    highlight={true}
                  />
                  :
                  null
                }
              </StyledTgtTable>
            </div>
          }
          <div className={'tgt-dash--rfi-description-container'}>
            <div className={'tgt-dash--rfi-description-box'}>&nbsp;</div>
            <div className={'tgt-dash--rfi-description'}>RFI DESCRIPTION: {rfi.description}</div>
            <input className={'hidden-input'}/>
          </div>
          {navigating ?
            <ConfirmationModal
              message={'You haven\'t saved the target you were editing.'}
              display={true}
              setDisplay={setNavigating}
              handleYes={handleNavigate}
              focusedElement={editingElement}
            />
            :
            null}
        </div>
      </div>
      {displayCopyTargets ?
        <StyledTgtCopyModal
          display={true}
          hide={() => setDisplayCopyTargets(false)}
          postTargets={handlePostTargets}
          exploitDates={exploitDates}
          targets={targets}
        />
        :
        null}
      {displayCopyAllTargets ?
        <CopyTargetsModal/>
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
                                                         typeof rfi.productName === 'string' ?
                                                           rfi.productName : '')}
          rfi={rfi}
          userName={cookie.userName}
        />
        :
        null
      }
    </div>
  );
};

export const StyledTgtDashboard = styled(TgtDashboard)`
  font-size: ${theme.font.sizeRow};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .tgt-dash {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }
 
  .tgt-dash-container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-around;
    width: 100%;
  }
 
  .rfi-sidebar {
   justify-self: flex-start;
  }
  
  .tgt-dash-daterange-display-inactive {
    color: ${theme.color.backgroundInformation};
  }
  
  .tgt-dash-body {
    height: calc(100vh - 224px);
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    width: 1222px;
  }
  
  .tgt-dash--rfi-description-container {
    height: 108px;
    width: 1232px;
    padding: 8px 44px 8px 8px;
    overflow-y: scroll;
    margin-left: 15px;
    margin-bottom: 16px;
  }
  
  .tgt-dash--rfi-description {
    z-index: 2;
    position: relative;
    width: 1200px;
    
  }

  .tgt-dash--rfi-description-box {
    z-index: 1;
    position: absolute;
    margin-top: -11px;
    margin-left: -6px;
    height: 115px;
    width: 1212px;
    padding: 4px;
    background: ${theme.color.backgroundInformation};
    border-radius: 8px;
    border: 2px solid ${theme.color.modalInputBorder};
  }
  
  .add-tgt-button {
    cursor: pointer;
    box-shadow: -2px 2px 20px #000000;
    width: 1212px;
    height: 62px;
    border-radius: 8px;
    background: ${theme.color.backgroundInformation};
    border: 2px solid ${theme.color.borderAddButton};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.font.sizeMetricsHeader};
    font-weight: ${theme.font.weightBold};
    color: ${theme.color.primaryButton};
    margin-top: 4px; 
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
  
  .date-divider--placeholder {
    width: 100%;
    color: ${theme.color.fontBackgroundInactive};
  }
  
  .date-divider--no-top-margin {
    margin-top: 0 !important;
  }
  
  .date-divider--new {
    margin-top: 48px;
  }
  
  .tgt-dash-add-date-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .add-date-button-disabled {
    pointer-events: none; !important;
    background-color: ${theme.color.primaryButton};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    opacity: 0.5;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
  
  .input-disabled {
    pointer-events: none; !important
    opacity: 0.5; !important
  }

  .add-date-vector {
    pointer-events: none;
  }
  
  .tgt-table-header {
    flex: 0 0 27px;
    padding-left: 17px;
    padding-right: 15px;
    align-self: flex-start;
  }
  
  .header-cell--id {
    margin: 0 -5px 0 6px;
    width: 75px;
  }
  
  .header-cell--mgrs {
    width: 163px;
  }
  
  .header-cell--notes {
    width: 445px;
  }
  
  .header-cell--description {
    width: 285px;
  }
  
  .header-cell--status {
    width: 110px;
  }
  
  .hidden-input {
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
  
  .delete-edit-button-container {
    border-left: 9px solid ${theme.color.backgroundBase};
    display: flex;
    flex: 0 0 93px;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    align-self: stretch;
  }
  
  .name-input-helper {
    font-weight: ${theme.font.weightBolder};
    font-size: ${theme.font.sizeHeader};
    line-height: 28px;
    padding-right: 100px;
    margin-bottom: -43px;
    margin-top: 15px;
  }
  
  .modal-text {
    margin-top: 40px;
  }
`;
