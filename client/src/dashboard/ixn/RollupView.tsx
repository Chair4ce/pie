import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { Box, TextField } from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { StyledIxnTable } from './table/IxnTable';
import styled from 'styled-components';
import theme, { longInputStyles } from '../../resources/theme';
import { TargetModel } from '../../store/tgt/TargetModel';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../../store/ixn/IxnModel';
import { StyledMiniSegmentRegion } from './rollup/MiniSegmentRegion';
import { StyledImportRollupsButton } from '../../resources/icons/ImportRollupsButton';
import { convertTimeStringToMoment } from '../../utils';
import TgtTriangleVector from '../../resources/icons/TgtTriangleVector';
import { postImportClick } from '../../store/metrics';
import { ImportClickModel } from '../../store/metrics/ImportClickModel';
import DeleteButtonX from '../../resources/icons/DeleteButtonX';

interface MyProps {
  target: TargetModel;
  dateString: string;
  segments: SegmentModel[];
  ixns: IxnModel[];
  exitRollupMode: () => void;
  saveRollup: (mode: RollupMode, rollup: string) => void;
  displaySnackbar: (message: string) => void;
  userName: string;
  readOnly: boolean;
  className?: string;
}

export enum RollupMode {
  ALL_CALLOUTS,
  HOURLY_ROLLUP
}

export const RollupView: React.FC<MyProps> = (props) => {
  const mapSegmentStrings = (): string => {
    let segmentString = '';
    for (let segment of props.segments) {
      let timeBlock = +segment.startTime.format('HHmm');
      let segmentEnd = +segment.endTime.format('HHmm');
      while (timeBlock + 100 - (timeBlock % 100) < segmentEnd) {
        segmentString += timeBlock.toString().padStart(4, '0') + 'Z - '
          + (timeBlock += 100 - (timeBlock % 100)).toString().padStart(4, '0') + 'Z: \n\n';
      }
      segmentString += timeBlock.toString().padStart(4, '0') + 'Z - ' +
        segmentEnd.toString().padStart(4, '0') + 'Z: \n\n';
    }
    return segmentString;
  };

  const initHourlyRollup = (): string => {
    return '\n\n' +
      mapSegmentStrings() +
      'Note:';
  };

  const [rollupMode, setRollupMode] = useState(RollupMode.ALL_CALLOUTS);

  const [hourlyRollup, setHourlyRollup] = useState(props.target.hourlyRollup === '' ? initHourlyRollup() :
                                                     props.target.hourlyRollup);
  const [allCallouts, setAllCallouts] = useState(
    props.target.allCallouts === '' ?
      '\n\n\n\nNote:'
      : props.target.allCallouts,
  );
  const [selectedIxns, setSelectedIxns] = useState([] as number[]);

  const classes = longInputStyles();

  function printMiniSegmentRegions() {
    return props.segments.map(
      (segment: SegmentModel, index: number) =>
        <StyledMiniSegmentRegion
          segment={segment}
          ixns={props.ixns.filter((ixn) => ixn.segmentId === segment.id)}
          rollupMode={rollupMode}
          select={handleSelect}
          selectedIxns={selectedIxns}
          key={index}
          readOnly={props.readOnly}
        />,
    );
  }

  const toggleMode = () => {
    if (rollupMode === RollupMode.ALL_CALLOUTS) {
      setRollupMode(RollupMode.HOURLY_ROLLUP);
      setTimeout(() => {
        let element = document.getElementById('rollup-input');
        if (element instanceof HTMLTextAreaElement) {
          element.focus();
          element.setSelectionRange(53, 53);
        }
      }, 100);
    } else {
      setRollupMode(RollupMode.ALL_CALLOUTS);
    }
  };

  const handleSaveClick = () => {
    if (rollupMode === RollupMode.ALL_CALLOUTS) {
      props.saveRollup(RollupMode.ALL_CALLOUTS, allCallouts);
    } else {
      props.saveRollup(RollupMode.HOURLY_ROLLUP, hourlyRollup);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    if (rollupMode === RollupMode.ALL_CALLOUTS) {
      setAllCallouts(event.target.value);
    } else {
      setHourlyRollup(event.target.value);
    }
  };

  const handleSelect = (ixnId: number) => {
    let newSelectedIxns = Array.from(selectedIxns);
    if (newSelectedIxns.includes(ixnId)) {
      newSelectedIxns.splice(newSelectedIxns.indexOf(ixnId), 1);
      setSelectedIxns(newSelectedIxns);
    } else {
      newSelectedIxns.push(ixnId);
      setSelectedIxns(newSelectedIxns);
    }
  };

  const mapIxns = (ixns: IxnModel[]): string => {
    let ixnString = '';
    for (let ixn of ixns) {
      ixnString += ixn.time.format('HH:mm:ss') + 'Z - ' + ixn.activity + '\n\n';
    }
    return ixnString;
  };

  const importIxns = () => {
    let allIxns = props.ixns.filter((ixn) => selectedIxns.includes(ixn.id!));

    postImportClick(new ImportClickModel(props.target.id, selectedIxns.length, props.userName));

    let matches: RegExpMatchArray|null = allCallouts.match(/([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])Z.*\n/g);

    if (matches) {
      for (let match of matches) {
        let timeString = match.substr(0, 8);
        let activityString = match.substring(12, match.length - 1);
        allIxns.push(new IxnModel(0, 0, 0, 0, 0, '', convertTimeStringToMoment(
          timeString), activityString, '', '', IxnStatus.NOT_STARTED, '', '', '', IxnApprovalStatus.NOT_REVIEWED));
      }
    }

    allIxns.sort((ixn1, ixn2) => ixn1.time.isSame(ixn2.time) ? 0 : ixn1.time.isBefore(ixn2.time) ? -1 : 1);

    let rollup = '\n' + mapIxns(allIxns) + allCallouts.substr(allCallouts.indexOf('Note:'));

    setAllCallouts(rollup);
    setSelectedIxns([]);
  };

  const preRollupText = 'Activity Rollup (' + props.target.name + ')\n\n' + props.dateString;

  return (
    <div className={classNames(props.className, 'rollup-body-container')}>
      <div className={'rollup'}>
        <div className={classes.rollupModalBody}>
          <div className={'rollup-button-container'}>
            <div className={'rollup-mode-toggle-button'} onClick={toggleMode}>
              <Box
                height={22}
                width={98}
                border={2}
                borderRadius={11}
                borderColor={theme.color.primaryButton}
                bgcolor={theme.color.backgroundInformation}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingRight={0.1}
                paddingLeft={0.9}
                fontSize={11}
                marginRight={'-22px'}
                className={classNames('no-select', 'rollup-mode-button', 'left-button',
                                      rollupMode === RollupMode.HOURLY_ROLLUP ? 'button-active' : 'button-inactive')}
              >
                <span>Hourly Rollup</span>
                <div className={'icon icon-left'}><TgtTriangleVector/></div>
              </Box>
              <Box
                height={22}
                width={98}
                border={2}
                borderRadius={11}
                borderColor={theme.color.primaryButton}
                bgcolor={theme.color.backgroundInformation}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingRight={1.8}
                paddingLeft={0.2}
                fontSize={11}
                className={classNames('no-select', 'rollup-mode-button',
                                      rollupMode === RollupMode.ALL_CALLOUTS ? 'button-active' : 'button-inactive')}
              >
                <div className={'icon icon-right'}><TgtTriangleVector/></div>
                <span>All Callouts</span>
              </Box>
            </div>
            <div className={'rollup-close-button'} onClick={props.exitRollupMode}>
              <DeleteButtonX/>
            </div>
          </div>
          <form className={classNames('rollup-form')}>
            <div className={classNames(classes.modalInputContainer, props.readOnly ? 'rollup-text-wrapper' : null)}>
              <div className={'pre-rollup-text rollup-text'}>{preRollupText}</div>
              {!props.readOnly ?
                <TextField
                  className={classNames('rollup', classes.modalTextfield)}
                  value={rollupMode === RollupMode.ALL_CALLOUTS ? allCallouts : hourlyRollup}
                  onChange={handleInput}
                  autoFocus
                  multiline
                  rows={24}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  inputProps={{
                    id: 'rollup-input',
                    className: 'rollup-input',
                  }}
                />
                :
                <div className={'rollup-text'}>
                  {preRollupText + '\n' + (rollupMode === RollupMode.ALL_CALLOUTS ? allCallouts : hourlyRollup)}
                </div>
              }
            </div>
          </form>
          <div className={classNames('button-section', classes.modalConfirmation)}>
            <CopyToClipboard onCopy={() => props.displaySnackbar('Copied to Clipboard')}
                             text={preRollupText + '\n' +
                             (rollupMode === RollupMode.ALL_CALLOUTS ? allCallouts : hourlyRollup)}>
              <div className={classNames('copy-to-clipboard', classes.copyToClipboard)}>
                Copy to Clipboard
              </div>
            </CopyToClipboard>
            <div
              onClick={handleSaveClick}
              className={classNames('save', classes.saveSubmitButton, props.readOnly ? 'disabled' : null)}
            >
              Save Changes
            </div>
          </div>
        </div>
      </div>
      {rollupMode === RollupMode.ALL_CALLOUTS ?
        <div
          className={classNames('import-rollup-button',
                                selectedIxns.length === 0 || props.readOnly ? 'disabled' : null)}
          onClick={importIxns}
        >
          <StyledImportRollupsButton/>
        </div>
        :
        <div className={'spacer'}>&nbsp;</div>
      }
      <StyledIxnTable
        className={'mini-ixn-table-wrapper'}>
        {printMiniSegmentRegions()}
      </StyledIxnTable>
    </div>
  );
};

export const StyledRollupView = styled(RollupView)`
  margin-top: 58px;
  width: 100%;
  height: calc(100vh - 116px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 62px;
  align-items: center;

  .mini-ixn-table-wrapper {
    padding-left: 0 !important;
    overflow-y: auto;
    height: 601px;
    width: 478px;
    flex-shrink: 0;
  }

  .import-rollup-button {
    margin: 4px;
  }

  .spacer {
    width: 48px;
  }

  .icon {
    width: 16px;
    height: 16px;
  }
  
  .icon-left {
    svg {
      transform: rotate(-90deg);
    }
  }
  
  .icon-right {
    svg {
      transform: rotate(90deg);
    }
  }
  
  .button-inactive {
    color: ${theme.color.fontInactive};
    z-index: 1;
  }
  
  .button-active {
    z-index: 2;
  }
  
  .rollup-mode-button {
    span {
      padding-top: 1px;
    }
  }

  .rollup-mode-toggle-button {
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    margin-top: -4px;
    margin-bottom: 4px;
    border-radius: 11px;
    cursor: pointer;
    
    :hover {
      box-shadow: 0 0 6px #FFF;
    } 
  }
  
  .rollup-text {
    width: 100%;
    padding-left: 3px;
    align-self: flex-start;
    justify-self: flex-start;
    word-wrap: break-word;
    white-space: pre-wrap;
    text-align: left;
  }
  
  .rollup-text-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 4px;
    overflow-y: auto;
  }
  
  .rollup-button-container {
    width: 200px;
    height: 30px;
    display: flex;
    align-self: flex-end;
    flex-direction: row;
    justify-content: space-between;
    z-index: 2;       
  }
  
  .rollup-close-button {
    padding-top: 6px;
    padding-right: 3px;
  }
  
  .rollup-input {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: -6px;
    padding-right: 24px;
  }
`;
