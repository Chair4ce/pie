import * as React from 'react';
import { useState } from 'react';
import { ScoiModel } from '../../store/scoi/ScoiModel';
import styled from 'styled-components';
import theme from '../../resources/theme';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';
import { StyledScoiRow } from './ScoiRow';

interface MyProps {
  scoi: ScoiModel;
  selected: boolean;
  select: () => void;
  showRfiInfo: boolean;
  toggleRfiInfo: () => void;
  showTgtInfo: boolean;
  toggleTgtInfo: () => void;
  showCalloutInfo: boolean;
  toggleCalloutInfo: () => void;
  showTrackInfo: boolean;
  toggleTrackInfo: () => void;
  handlePostScoi: (scoi: ScoiModel) => void;
  className?: string;
}

const ScoiInputRow: React.FC<MyProps> = (props) => {
  const [note, setNote] = useState(props.scoi.note);

  const inputNote = (event: any) => {
    setNote(event.target.value.replace('\n', ''));
  };

  const submit = () => {
    props.handlePostScoi({...props.scoi, note: note} as ScoiModel);
  };

  return (
    <div className={classNames('scoi-input-row', props.className)}
         id={'scoi-input-row-' + props.scoi.id}
    >
      <StyledScoiRow
        scoi={props.scoi}
        selected={props.selected}
        select={props.select}
        showRfiInfo={props.showRfiInfo}
        toggleRfiInfo={props.toggleRfiInfo}
        showTgtInfo={props.showTgtInfo}
        toggleTgtInfo={props.toggleTgtInfo}
        showCalloutInfo={props.showCalloutInfo}
        toggleCalloutInfo={props.toggleCalloutInfo}
        showTrackInfo={props.showTrackInfo}
        toggleTrackInfo={props.toggleTrackInfo}
        handleEdit={() => {
        }}
        editing={true}
      />
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
            onKeyPress={(key) => {
              if (key.which === 13) {
                submit();
              }
            }}
            onBlur={submit}
          />
      </div>
    </div>
  );
};

export const StyledScoiInputRow = styled(ScoiInputRow)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
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
  
  .note-container {
    width: 360px;
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
`;
