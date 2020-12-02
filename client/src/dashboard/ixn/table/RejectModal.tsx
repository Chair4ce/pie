import * as React from 'react';
import { useState } from 'react';
import { Modal, TextField } from '@material-ui/core';
import classNames from 'classnames';
import { longInputStyles } from '../../../resources/theme';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';

interface Props {
  className?: string;
  handleConfirm: (rejectReason: string) => void;
  handleClose: () => void;
}

export const RejectModal: React.FC<Props> = props => {
  const classes = longInputStyles();

  const [rejectReason, setRejectReason] = useState('');

  const inputRejectReason = (event: any) => {
    setRejectReason(event.target.value);
  };

  return (
    <div className={props.className}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open
        onClose={() => props.handleClose()}
        style={{
          top: '50%',
          left: '50%',
        }}
        className={classNames('reject-modal', classes.rejectModal, props.className)}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <div className={classes.narrativeModalBody}>
          <form className={classNames('reject-form')}
          >
            <div className={classNames('reject-input-container')}>
              <div className={classes.rejectHeader}>
                <div>&nbsp;</div>
                <span><b>Input a reason for rejecting the track</b></span>
                <div
                  className={classNames('cancel', classes.modalButton)}
                  onClick={() => props.handleClose()}
                >
                  <DeleteButtonX/>
                </div>
              </div>
              <TextField
                className={classNames('track-narrative', classes.rejectTextfield)}
                value={rejectReason}
                onChange={inputRejectReason }
                autoFocus
                multiline
                rows={18}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  className: 'reject-input',
                }}
              />
            </div>
          </form>
          <div className={classNames('button-section', classes.modalConfirmation)}>
            <div
              onClick={() => props.handleClose()}
              className={classNames('cancel-button', 'no-select', classes.copyToClipboard, classes.modalButton)}
            >
              Cancel
            </div>
            <div
              onClick={() => props.handleConfirm(rejectReason.trim())}
              className={classNames('submit-button', 'no-select', classes.saveSubmitButton, classes.modalButton)}
            >
              Save Changes
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
