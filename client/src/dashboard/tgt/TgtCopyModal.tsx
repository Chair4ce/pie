import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Checkbox, createStyles, MenuItem, Modal, Select, Theme } from '@material-ui/core';
import { TargetPostModel } from '../../store/tgt/TargetPostModel';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';
import theme from '../../resources/theme';
import { StyledCopyTargetsButton } from '../../resources/icons/ImportRollupsButton';
import DeleteButtonX from '../../resources/icons/DeleteButtonX';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { ConfirmationModal } from '../components/ConfirmationModal';

interface MyProps {
  display: boolean;
  hide: () => void;
  postTargets: (targets: TargetPostModel[], isCopy: boolean) => void;
  exploitDates: ExploitDateModel[];
  targets: TargetModel[];
  className?: string;
}

const menuStyles = makeStyles((localTheme: Theme) => createStyles(
  {
    root: {
      padding: '8px 24px 0 9px',
    },
    menu: {
      background: '#02252E',
      border: '2px solid #8199A1',
      borderRadius: '4px',
      fontFamily: theme.font.family,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '24px',
      '&:focus': {
        background: '#02252E',
      },
      zIndex: 10001,
    },
  },
));

export const TgtCopyModal: React.FC<MyProps> = (props) => {
  const classes = menuStyles();

  const [copyFromDate, setCopyFromDate] = useState(null as null|ExploitDateModel);
  const [selectedTgtIds, setSelectedTgtIds] = useState([] as number[]);
  const [copyToDateId, setCopyToDateId] = useState(0);
  const [copyToDates, setCopyToDates] = useState(props.exploitDates);
  const [copiedTgts, setCopiedTgts] = useState([] as TargetModel[]);

  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

  const handleHide = () => {
    if (copiedTgts.length > 0) {
      setDisplayConfirmationModal(true);
    } else {
      props.hide();
    }
  };

  const handleClickCheckbox = (targetId: number) => {
    let newSelectedTargets = Array.from(selectedTgtIds);
    if (selectedTgtIds.includes(targetId)) {
      newSelectedTargets.splice(newSelectedTargets.indexOf(targetId), 1);
    } else {
      newSelectedTargets.push(targetId);
    }
    setSelectedTgtIds(newSelectedTargets);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedTgtIds([]);
    } else {
      let newSelectedTgts: number[] = [];
      for (let target of props.targets.filter((target) => {
        return target.exploitDateId === copyFromDate!.id;
      })) {
        if (!checkDisabled(target.mgrs)) {
          newSelectedTgts.push(target.id);
        }
      }
      setSelectedTgtIds(newSelectedTgts);
    }
  };

  const printDates = () => {
    return props.exploitDates.map(
      (date, index) =>
        <div
          className={'tgt-copy--row'}
          id={'exploit-date-' + index}
        >
          <div>
            {date.exploitDate.format('MM/DD/YY')}
          </div>
          <div className={'tgt-copy--select-date'}
               onClick={() => {
                 setCopyFromDate(date);
                 setCopyToDates(props.exploitDates.filter((exploitDate) => exploitDate.id !== date.id));
               }}
          >
            Select
          </div>
        </div>,
    );
  };

  const printTargetsFrom = () => {
    return (
      props.targets.filter(
        (target) => {
          return target.exploitDateId === copyFromDate!.id;
        }).map(
        (target, index) =>
          <div
            className={classNames('tgt-copy--row', checkDisabled(target.mgrs) ? 'disabled' : null)}
            id={'tgt-' + index}
            key={index}
          >
            <div className={'target-name'}>{target.name}</div>
            <div className={'target-mgrs'}>{target.mgrs}</div>
            <Checkbox
              checked={selectedTgtIds.includes(target.id)}
              onChange={() => handleClickCheckbox(target.id)}
              inputProps={{'aria-label': 'primary checkbox'}}
              disableRipple
              color={'primary'}
              className={'copy-checkbox'}
              // disabled={copyToDateId === 0}
            />
          </div>,
      )
    );
  };

  const handleSelectToDate = (event: any) => {
    let newExploitDateId: number = event.target.value;
    if (newExploitDateId > 0) {
      let newExploitDateTgts = props.targets.filter((tgt) => tgt.exploitDateId === newExploitDateId);
      let newSelectedTgts = Object.assign([], selectedTgtIds);
      for (let targetId of selectedTgtIds) {
        let target = props.targets.find((tgt) => tgt.id === targetId);
        if (target !== undefined) {
          let dupe = newExploitDateTgts.find((dupeCandidate) => dupeCandidate.name === target!.name);
          if (dupe !== undefined) {
            newSelectedTgts.splice(newSelectedTgts.indexOf(targetId), 1);
          }
        }
      }
      setCopyToDateId(newExploitDateId);
      setSelectedTgtIds(newSelectedTgts);
    }
  };

  const printMenuItems = () => {
    return copyToDates.map(
      (date) =>
        <MenuItem disableRipple value={date.id}>
          <div className={'menu-item'}>{date.exploitDate.format('MM/DD/YYYY')}</div>
        </MenuItem>,
    );
  };

  const printTargetsTo = () => {
    return (
      props.targets.filter(
        (target) => {
          return target.exploitDateId === copyToDateId;
        }).map(
        (target, index) =>
          <div
            className={'tgt-copy--row'}
            id={'tgt-' + index}
          >
            <div className={'target-name'}>{target.name}</div>
            <div className={'target-mgrs'}>{target.mgrs}</div>
            <div className={'checkbox-spacer'}>&nbsp;</div>
          </div>,
      )
    );
  };

  const printCopiedTargetsTo = () => {
    return (
      copiedTgts.filter(
        (target) => {
          return target.exploitDateId === copyToDateId;
        }).map(
        (target, index) =>
          <div
            className={'tgt-copy--row tgt-copy--row-new'}
            id={'tgt-' + index}
          >
            <div className={'target-name'}>{target.name}</div>
            <div className={'target-mgrs'}>{target.mgrs}</div>
            <div className={'checkbox-spacer'}>&nbsp;</div>
          </div>,
      )
    );
  };

  const checkDisabled = (mgrs: string): boolean => {
    let allTargets: (TargetModel|TargetPostModel)[] = props.targets.filter(
      (target) => {
        return target.exploitDateId === copyToDateId && target.mgrs === mgrs;
      });
    allTargets = allTargets.concat(copiedTgts.filter(
      (target) => {
        return target.exploitDateId === copyToDateId && target.mgrs === mgrs;
      },
    ));
    return allTargets.length > 0;
  };

  const handleCopyClick = () => {
    if (copyToDateId > 0) {
      let newCopiedTargets: TargetModel[] = [];
      for (let target of props.targets.filter((tgt) => selectedTgtIds.includes(tgt.id))) {
        let newTarget: TargetModel =
          {
            ...target,
            exploitDateId: copyToDateId,
          };
        newCopiedTargets.push(newTarget);
      }
      setCopiedTgts(copiedTgts.concat(newCopiedTargets));
      setSelectedTgtIds([]);
    }
  };

  const handleGoBack = () => {
    setCopyFromDate(null);
    setSelectedTgtIds([]);
    setCopyToDateId(0);
    setCopyToDates(props.exploitDates);
    setCopiedTgts([]);
  };

  const handleSubmit = () => {
    if (copiedTgts.length > 0) {
      let copiedTgtPosts: TargetPostModel[] = [];
      for (let tgt of copiedTgts) {
        copiedTgtPosts.push(
          {
            ...tgt,
            targetId: null,
            exploitDateId: copyToDateId,
            status: TargetStatus.NOT_STARTED,
            hourlyRollup: '',
            allCallouts: '',
          },
        );
      }
      props.postTargets(copiedTgtPosts, true);
      handleGoBack();
      props.hide();
    }
  };

  let allSelected = copyFromDate === null ? false : selectedTgtIds.length ===
    props.targets.filter((target) => {
      return target.exploitDateId === copyFromDate.id && !checkDisabled(target.mgrs);
    }).length;

  let disableSelectAll = copyFromDate === null || props.targets.filter((target) => {
    return target.exploitDateId === copyFromDate.id && !checkDisabled(target.mgrs);
  }).length === 0;

  return (
    <Modal
      open={props.display}
      onClose={handleHide}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={props.className}
    >
      <>
        {copyFromDate !== null ?
          <div className={'tgt-copy--copy-tgt-container'}>
            <div className={'tgt-copy--copy-tgt-menu'}>
              <div className={'tgt-copy--header'}>
              <span className={'tgt-copy--header-text'}>
              {copyFromDate.exploitDate.format('MM/DD/YY')}
              </span>
              </div>
              <div className={'tgt-copy--sub-header'}>
                <span>Targets</span>
                <span className={'tgt-copy--header-mgrs'}>MGRS</span>
                <div>
                  <span>Select All</span>
                  <Checkbox
                    checked={allSelected && !disableSelectAll}
                    onChange={handleSelectAll}
                    disableRipple
                    color={'primary'}
                    className={'select-all-checkbox'}
                    disabled={disableSelectAll}
                  />
                </div>
              </div>
              <div className={'tgt-copy--body'}>
                <div>
                  {printTargetsFrom()}
                </div>
              </div>
            </div>

            <div className={classNames('copy-button-container')}>
              <div
                className={classNames('copy-button',
                                      copyToDateId === 0 || selectedTgtIds.length === 0 ? 'disabled' : null)}
                onClick={handleCopyClick}
              >
                <StyledCopyTargetsButton/>
              </div>
            </div>

            <div className={'tgt-copy--copy-tgt-menu'}>
              <div className={'tgt-copy--header'}>
                <span className={'tgt-copy--header-text'}>Copy Targets to</span>
                <div className={'copy-to-menu'}>
                  <Select
                    value={copyToDateId}
                    onChange={handleSelectToDate}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                    classes={{
                      root: classes.root,
                      select: classes.menu,
                      selectMenu: classes.menu,
                    }}
                    MenuProps={{
                      classes: {
                        list: classes.menu,
                      },
                    }}
                    disableUnderline
                  >
                    {copyToDateId === 0 ?
                      <MenuItem className={'menu-item'} disableRipple value={0}>
                        Select Date
                      </MenuItem>
                      :
                      null
                    }
                    {printMenuItems()}
                  </Select>
                </div>
                <div className={'tgt-copy--header-button'} onClick={handleHide}>
                  <DeleteButtonX/>
                </div>
              </div>
              <div className={'tgt-copy--sub-header'}>
                <span>Targets</span>
                <span className={'tgt-copy--header-mgrs'}>MGRS</span>
                <div className={'mgrs-header-spacer'}>&nbsp;</div>
              </div>
              <div className={'tgt-copy--body tgt-copy--small-body'}>
                <div>
                  {printTargetsTo()}
                  {printCopiedTargetsTo()}
                </div>
              </div>
              <div className={'tgt-copy--button-container'}>
                <div
                  className={'tgt-copy--button no-select tgt-copy--go-back'}
                  onClick={handleGoBack}
                >
                  <span>Go Back</span>
                </div>
                <div
                  className={classNames('tgt-copy--button', 'no-select', 'tgt-copy--submit',
                                        copiedTgts.length === 0 ? 'disabled' : null)}
                  onClick={handleSubmit}
                >
                  <span>Save Changes</span>
                </div>
              </div>
            </div>
          </div>
          :
          <div className={'tgt-copy--select-date-menu'}>
            <div className={'tgt-copy--header'}>
              <span className={'tgt-copy--header-text'}>Copy Targets from</span>
              <div className={'tgt-copy--header-button'} onClick={handleHide}>
                <DeleteButtonX/>
              </div>
            </div>
            <div className={'tgt-copy--sub-header'}>Coverage Date</div>
            <div className={'tgt-copy--body'}>
              <div>
                {printDates()}
              </div>
            </div>
          </div>
        }
        <ConfirmationModal
          message={'You haven\'t saved all the targets you\'ve copied.'}
          display={displayConfirmationModal}
          setDisplay={setDisplayConfirmationModal}
          handleYes={() => props.hide()}
        />
      </>
    </Modal>
  );
};

export const StyledTgtCopyModal = styled(TgtCopyModal)`
  font-size: ${theme.font.sizeHeader};
  
  .tgt-copy--select-date-menu {
    width: 400px;
    margin-left: -200px;
    margin-top: -240px;
    background: ${theme.color.backgroundInformation};
    outline: none;
    border-radius: 8px;
    border: 4px solid ${theme.color.backgroundFocus};
  }
  
  .tgt-copy--header {
    width: 100%;
    height: 60px;
    background: ${theme.color.backgroundFocus};
    font-size: ${theme.font.sizeModalHeader};
    font-weight: ${theme.font.weightBold};
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    padding-left: 21px;
    padding-right: 4px;
  }
  
  .tgt-copy--header-button {
    margin-top: -8px;
    svg {
      path {
        fill: ${theme.color.backgroundBase};
      }
      circle {
        fill: ${theme.color.primaryButton};
      }
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
    }
  }
  
  .tgt-copy--header-text {
    margin-top: -4px;
    align-self: center;
  }
  
  .tgt-copy--sub-header {
    width: 100%;
    height: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 21px;
    font-size: ${theme.font.sizeMetricsHeader};
    color: ${theme.color.fontSubHeader};
    font-weight: ${theme.font.weightLight};
  }
  
  .tgt-copy--body {
    max-height: 380px;
    padding-right: 21px;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    overflow-y: auto;
    flex-shrink: 1;
  }
  
  .tgt-copy--small-body {
    height: 325px !important;
  }
  
  .tgt-copy--row {
    flex-grow: 1;
    height: 64px;
    padding-left: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.color.copyTgtBorder};
  }
  
  .tgt-copy--row-new {
    color: ${theme.color.primaryButton};
  }
  
  .tgt-copy--select-date {
    font-weight: ${theme.font.weightMedium};
    font-size: ${theme.font.sizeRow};
    color: ${theme.color.primaryButton};
    cursor: pointer;
  
    :hover {
      text-shadow: 0 0 1px #FFFFFF;
    }
  }
  
  .tgt-copy--copy-tgt-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    height: 490px;
    margin-left: -500px;
    margin-top: -245px;
    outline: none;
  }
  
  .tgt-copy--copy-tgt-menu {
    background: ${theme.color.backgroundInformation};
    flex-grow: 0;
    width: 450px;
    height: 490px;
    border-radius: 8px;
    border: 4px solid ${theme.color.backgroundFocus};
  }
  
  .copy-button {
    cursor: pointer;
  }
  
  .target-name {
    width: 140px;
  }
  
  .target-mgrs {
    width: 226px;
  }
  
  .tgt-copy--header-mgrs {
    margin-left: -16px;
  }
  
  .mgrs-header-spacer {
    width: 122px;
  }
  
  .checkbox-spacer {
    width: 42px;
  }
  
  .tgt-copy--button-container {
    width: 100%;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.5);
  }
  
  .tgt-copy--button {
    width: 208px;
    height: 38px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: ${theme.font.sizeRow};
    border-radius: 4px;
    cursor: pointer;
   
    :hover {
      box-shadow: 0 0 6px #FFF;
    }
  }
  
  .tgt-copy--go-back {
    border: 1px solid ${theme.color.primaryButton};
    margin-right: 17px;
  }
  
  .tgt-copy--submit {
    background: ${theme.color.primaryButton};
  }
  
  .copy-button-container {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: ${theme.color.backgroundBase};
  }
  
  .copy-to-menu {
    align-self: center;
    
    .MuiListItem-root {
      background: #02252E !important;
    }
  }
  
  .menu-item {
    background: #02252E !important;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 24px !important;
    
      :hover {
        font-weight: ${theme.font.weightBold} !important;
        text-shadow: 0 0 2px #FFF !important;
      }
  }
`;
