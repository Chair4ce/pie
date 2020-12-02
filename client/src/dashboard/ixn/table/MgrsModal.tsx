import * as React from 'react';
import { Modal, TextField } from '@material-ui/core';
import classNames from 'classnames';
import styled from 'styled-components';
import theme from '../../../resources/theme';
import { useState } from 'react';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import { strongMatchMgrsError, weakMatchMgrsError } from '../../../utils';

interface MyProps {
  hideModal: () => void;
  submitScoi: (mgrs: string) => void;
  className?: string;
}

const MgrsModal: React.FC<MyProps> = (props) => {
  const [mgrsError, setMgrsError] = useState(false);
  //If the user enters a MGRS incorrectly once, always check for exact match
  const [strongValidateMgrs, setStrongValidateMgrs] = useState(false);
  const [mgrs, setMgrs] = useState('');

  let isMgrsInput: boolean = mgrs.length === 15 && !mgrsError;

  const inputMgrs = (event: any) => {
    let newMgrs = event.target.value;
    if (newMgrs.charAt(newMgrs.length - 1) !== '\n') {
      setMgrs(newMgrs);
    }
    if (strongValidateMgrs) {
      setMgrsError(strongMatchMgrsError(newMgrs));
    } else {
      setMgrsError(weakMatchMgrsError(newMgrs));
      setStrongValidateMgrs(weakMatchMgrsError(newMgrs));
    }
  };

  const handleSubmitClick = () => {
    if (isMgrsInput) {
      props.submitScoi(mgrs);
    }
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
      onClose={props.hideModal}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={classNames('mgrs-modal', props.className)}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <>
        <div className={'modal-container'}>
          <div className={'modal-body'}>
            <div
              className={'cancel-mgrs-input'}
              onClick={props.hideModal}
            >
              <DeleteButtonX/>
            </div>
            <span>Type MGRS coordinates below</span>
            <TextField
              autoFocus={true}
              className={'mgrs'}
              value={mgrs}
              required
              placeholder="##XXX##########"
              label={mgrsError ? 'Error' : 'Required'}
              error={mgrsError}
              onChange={inputMgrs}
              onKeyPress={(key) => {
                if (key.which === 13) {
                  handleSubmitClick();
                }
              }}
              inputProps={{
                className: 'mgrs-input',
              }}
            />
          </div>
          <div className={classNames('submit-button', 'no-select',
                                     isMgrsInput ? null : 'disabled')} onClick={handleSubmitClick}>
            <span>Submit</span>
          </div>
        </div>
        {mgrsError ?
          <div className={'error-message'}>
            <span>Please use the format “##XXX##########” for MGRS</span>
          </div>
          :
          null
        }
      </>
    </Modal>
  );
};

export const StyledMgrsModal = styled(MgrsModal)`
  margin-left: -212px;
  margin-top: -83px;
  width: 424px;
  height: 192px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .modal-container {
    background: ${theme.color.backgroundFocus};
    border-radius: 10px;
    padding: 4px;
    width: 333px;
    height: 156px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }  
  
  .modal-body {
    background: ${theme.color.backgroundInformation};
    width: 325px;
    height: 114px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    span {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      color: ${theme.color.fontMgrsModal};
    }
    
    input {
      text-align: center;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
    }
  }
  
  .cancel-mgrs-input {
    margin-right: 4px;
    margin-bottom: -12px;
    align-self: flex-end;
  }

  .error-message {
    background: ${theme.color.backgroundInformation};
    width: 424px;
    height: 24px;
    border-radius: 12px;
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: ${theme.color.fontErrorAlternate};
  }
  
  .submit-button {
    margin-top: 6px;
    width: 86px;
    height: 26px;
    border-radius: 13px;
    background: ${theme.color.primaryButton};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
    :hover {
      box-shadow: 0 0 6px #FFF;
    }
    
    span {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
    }
  }
`;
