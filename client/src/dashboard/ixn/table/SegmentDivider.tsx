import * as React from 'react';
import { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { InputAdornment } from '@material-ui/core';
import styled from 'styled-components';
import classNames from 'classnames';
import globalTheme from '../../../resources/theme';
import theme from '../../../resources/theme';
import { TargetModel } from '../../../store/tgt/TargetModel';
import { SegmentModel } from '../../../store/ixn/SegmentModel';
import IxnModel from '../../../store/ixn/IxnModel';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import EditButton from '../../../resources/icons/EditButton';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import { convertTimeStringToMoment, RowAction } from '../../../utils';
import { postCancelAddSegment } from '../../../store/ixn';
import TextTooltip from '../../components/TextTooltip';
import { SegmentDividerTrashcanButton } from '../../../resources/icons/SegmentDividerTrashcanButton';

interface Props {
  target: TargetModel;
  segment: SegmentModel|null;
  postSegment: (segment: SegmentModel) => void;
  postIxn: (ixn: IxnModel) => void;
  deleteSegment: (segment: SegmentModel) => void;
  cancelAddSegment: () => void;
  hasIxns: boolean;
  editing: boolean;
  setEdit: (segmentId: number) => void;
  disabled: boolean;
  disableCancel: boolean;
  setEditingElement: (e: Element|null) => void;
  setSegmentChanged: (isSegmentChanged: boolean) => void;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    margin: {
      marginLeft: 0,
    },
  }),
);

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement|null) => void;
}

function SegmentTextMask(props: TextMaskCustomProps) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
      placeholderChar={'_'}
      showMask
    />
  );
}

export const SegmentDivider: React.FC<Props> = props => {
  const classes = useStyles();

  const [segmentStartString, setSegmentStartString] =
    useState(props.segment ? props.segment.startTime.format('HH:mm:ss') : '__:__:__');
  const [segmentEndString, setSegmentEndString] =
    useState(props.segment ? props.segment.endTime.format('HH:mm:ss') : '__:__:__');
  const [segmentStartError, setSegmentStartError] = React.useState(false);
  const [segmentEndError, setSegmentEndError] = React.useState(false);
  const [displayModal, setDisplayModal] = React.useState(false);
  const [action, setAction] = useState(RowAction.NONE);

  const resetAction = () => {
    setTimeout(() => {
      setAction(RowAction.NONE);
    }, 1000);
  };

  useEffect(() => {
    switch (action) {
      case (RowAction.DELETING):
        if (props.editing) {
          if (props.segment) {
            props.setEdit(-1);
          } else {
            props.cancelAddSegment();
            postCancelAddSegment(props.target.id)
              .catch(reason => console.log('Failed to post cancel add segment metric: ' + reason));
          }
        } else {
          handleDelete();
        }
        resetAction();
        break;
      case (RowAction.SUBMITTING):
        setTimeout(() => {
          validateAndSubmit();
          resetAction();
        }, 200);
        break;
    }
  }, [action]);

  const segmentError = (segment: string): boolean => {
    segment = segment.replace(/_/g, '0');
    return segment.match(/([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/) === null;
  };

  const changeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTime = event.target.value;
    if (props.segment ?
      newTime === props.segment.startTime.format('HH:mm:ss') && segmentEndString ===
      props.segment.endTime.format('HH:mm:ss')
      :
      newTime === '__:__:__' && segmentEndString === '__:__:__'
    ) {
      props.setSegmentChanged(false);
    } else {
      props.setSegmentChanged(true);
    }
    setSegmentStartString(newTime);
    setSegmentStartError(segmentError(newTime));
  };

  const changeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTime = event.target.value;
    if (props.segment ?
      newTime === props.segment.endTime.format('HH:mm:ss') && segmentStartString ===
      props.segment.startTime.format('HH:mm:ss')
      :
      newTime === '__:__:__' && segmentStartString === '__:__:__'
    ) {
      props.setSegmentChanged(false);
    } else {
      props.setSegmentChanged(true);
    }
    setSegmentEndString(newTime);
    setSegmentEndError(segmentError(newTime));
  };

  const validateAndSubmit = () => {
    if (segmentEndString !== '__:__:__' && action !== RowAction.DELETING) {

      setSegmentStartString(segmentStartString.replace(/_/g, '0'));
      setSegmentEndString(segmentEndString.replace(/_/g, '0'));
      let segmentStartErrorLocal = segmentError(segmentStartString.replace(/_/g, '0'));
      let segmentEndErrorLocal = segmentError(segmentEndString.replace(/_/g, '0'));

      setSegmentStartError(segmentStartErrorLocal);
      setSegmentEndError(segmentEndErrorLocal);

      if (!segmentStartErrorLocal && !segmentEndErrorLocal) {
        let segmentStart = convertTimeStringToMoment(segmentStartString);
        let segmentEnd = convertTimeStringToMoment(segmentEndString);
        if (segmentStart.isBefore(segmentEnd)) {
          let segment = new SegmentModel(
            props.segment ? props.segment.id : null,
            props.target.rfiId,
            props.target.exploitDateId,
            props.target.id,
            segmentStart,
            segmentEnd,
          );
          props.postSegment(segment);
        } else {
          setSegmentStartError(true);
        }
      }
    }
  };

  const handleDeleteClick = () => {
    if (props.hasIxns) {
      setDisplayModal(true);
    } else {
      setAction(RowAction.DELETING);
    }
  };

  const handleDelete = () => {
    if (props.segment !== null) {
      props.deleteSegment(props.segment);
    } else {
      props.cancelAddSegment();
      setDisplayModal(false);
    }
  };

  const handleEditClick = () => {
    if (props.segment && props.segment.id) {
      setSegmentStartString(props.segment.startTime.format('HH:mm:ss'));
      setSegmentEndString(props.segment.endTime.format('HH:mm:ss'));
      props.setEdit(props.segment.id);
    }
  };

  const handleBlur = (event: any) => {
    let currentTarget: any = event.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) && action !== RowAction.DELETING) {
        setAction(RowAction.SUBMITTING);
      } else {
        props.setEditingElement(document.activeElement);
      }
    }, 300);
  };

  const enterKey = 13;

  return (
    <div className={classNames(props.className)}>
      <div className={'segment-divider-placeholder'}>
        <div className={classNames('segment-divider--bar', props.editing ? 'highlighted' : null)}/>
        <div className={classNames('segment-divider--box', props.editing ? 'highlighted-box' : null)}>
          {!props.editing ?
            <div className={'segment-form'}>
              <TextTooltip
                title={'Edit Segment'}
              >
                <div
                  className={classNames('edit-segment', props.disabled ? 'disabled' : null)}
                  onClick={handleEditClick}
                >
                  <EditButton/>
                </div>
              </TextTooltip>
              <div className={classNames('segment-value', 'segment-start')}>
                {props.segment!.startTime.format('HH:mm:ss') + 'Z'}
              </div>
              <div className={'segment-spacer'}>
                <span>-</span>
              </div>
              <div className={classNames('segment-value', 'segment-end')}>
                {props.segment!.endTime.format('HH:mm:ss') + 'Z'}
              </div>
              <TextTooltip
                title={'Delete Segment'}
              >
                <div
                  className={classNames('delete-segment', 'delete-cancel-segment-wrapper',
                                        props.disabled ? 'disabled' : null)}
                  onClick={handleDeleteClick}>
                  <SegmentDividerTrashcanButton className={'delete-cancel-segment'}/>
                </div>
              </TextTooltip>
            </div>
            :
            <div className={'segment-form add-segment-form'}
                 onBlur={handleBlur}
            >
              <div
                className={'edit-segment disabled'}
              >
                <EditButton/>
              </div>
              <div className={'segment-value'}>
                <FormControl>
                  <div className={'segment-input-container'}>
                    <Input
                      className={classNames('segment-start')}
                      value={segmentStartString}
                      onChange={changeStart}
                      onFocus={() => props.setEditingElement(document.activeElement)}
                      inputComponent={SegmentTextMask as any}
                      disableUnderline
                      endAdornment={
                        <InputAdornment
                          color={globalTheme.color.fontBackgroundInactive}
                          className={classes.margin}
                          position="end">
                          <div className={'zulu'}>Z</div>
                        </InputAdornment>
                      }
                      autoFocus={true}
                      error={segmentStartError}
                      onKeyPress={(key) => {
                        if (key.which === enterKey) {
                          setAction(RowAction.SUBMITTING);
                        }
                      }}
                      onBlur={() => !segmentStartString.match(/[0-9]/) ? () => {
                      } : setSegmentStartString(segmentStartString.replace(/_/g, '0'))}
                    />
                  </div>
                </FormControl>
              </div>
              <div className={'segment-spacer'}>
                <span>-</span>
              </div>
              <div className={'segment-value'}>
                <FormControl>
                  <div className={'segment-input-container'}>
                    <Input
                      className={classNames('segment-end')}
                      value={segmentEndString}
                      onChange={changeEnd}
                      onFocus={() => props.setEditingElement(document.activeElement)}
                      inputComponent={SegmentTextMask as any}
                      disableUnderline
                      endAdornment={
                        <InputAdornment
                          className={classes.margin}
                          position="end">
                          <div className={'zulu'}>Z</div>
                        </InputAdornment>
                      }
                      error={segmentEndError}
                      onKeyPress={(key) => {
                        if (key.which === enterKey) {
                          setAction(RowAction.SUBMITTING);
                        }
                      }}
                      onBlur={() => !segmentEndString.match(/[0-9]/) ? () => {
                      } : setSegmentEndString(segmentEndString.replace(/_/g, '0'))}
                    />
                  </div>
                </FormControl>
              </div>
              <TextTooltip
                title={'Cancel Edit'}
              >
                <div
                  className={classNames('cancel-add-segment', 'delete-cancel-segment-wrapper',
                                        props.disableCancel ? 'disabled' : null)}
                  onClick={handleDeleteClick}>
                  <DeleteButtonX className={'delete-cancel-segment'}/>
                </div>
              </TextTooltip>
            </div>
          }
        </div>
      </div>
      {segmentStartError || segmentEndError ?
        <div className={'segment-error'}>Error: invalid time.</div> :
        null}
      <DeleteConfirmationModal
        deletingItem={props.segment ?
          props.segment.startTime.format('HH:mm:ss') + 'Z - ' + props.segment.endTime.format('HH:mm:ss') + 'Z' : ''}
        display={displayModal}
        setDisplay={setDisplayModal}
        handleYes={handleDelete}
      />
    </div>
  );
};

export const StyledSegmentDivider = styled(SegmentDivider)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .segment-value {
    width: 72px;
  }
  
  .segment-input-empty {
    color: ${theme.color.fontBackgroundInactive}
  }
  
  .segment-spacer {
    width: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  
  .segment-divider--bar {
    margin-bottom: -4px;
    width: 1410px;
    height: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: radial-gradient(300px, ${theme.color.regionDividerPrimary}, ${theme.color.regionDividerSecondary});
    z-index: 3;
    box-shadow: -2px 2px 4px #000;
  }
  
  .segment-divider--box {
    width: 306px;
    height: 30px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 4px solid ${theme.color.regionDividerPrimary};
    background: ${theme.color.backgroundBase};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 36px;
    padding-right: 36px;
    z-index: 2;
    box-shadow: -2px 2px 4px #000;
  }
  
  .segment-form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
  
  .segment-error {
    color: ${theme.color.fontError};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightNormal};
    line-height: 19px;
    margin-top: -17px;
    margin-bottom: -9px;
    z-index: 3;
  }
  
  .zulu {
    color: ${theme.color.fontBackgroundInactive};
    margin-top: -1px;
  }
  
  .segment-input-container {
    width: 72px;
    padding-top: 1px;
  }
  
  .delete-cancel-segment {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .delete-cancel-segment-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 24px;
  }
  
  .edit-segment {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 24px;
    width: 12px;
  }
  
  .highlighted {
    background: ${theme.color.primaryButton} !important;
  }
  
  .highlighted-box {
    border-color: ${theme.color.primaryButton} !important;
  }
`;
