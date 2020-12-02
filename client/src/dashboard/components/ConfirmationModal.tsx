import { Modal } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { longInputStyles } from '../../resources/theme';

interface MyProps {
  display: boolean;
  message: string;
  setDisplay: (display: boolean) => void;
  handleYes: () => void;
  message2?: string;
  message3?: string;
  focusedElement?: Element|null;
}

export const ConfirmationModal: React.FC<MyProps> = (props) => {
  const classes = longInputStyles();

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.display}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={() => props.setDisplay(false)}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={classNames('delete-modal navigate-modal', classes.deleteModal)}
    >
      <div className={classes.modalBody}>
        <div className={'modal-text'}>{props.message}</div>
        <div className={'modal-text'}>{props.message2 ? props.message2 : 'Do you want to leave without saving?'}</div>
        {props.message3 ?
          <div className={'modal-text'}>{props.message3}</div>
          :
          null
        }
        <div className={classes.modalConfirmation}>
          <span className={classNames('modal-yes', classes.modalButton)} onClick={() => {
            props.handleYes();
            props.setDisplay(false);
          }}>
            {props.message2 ? 'Yes' : 'Leave Page'}
          </span>
          <span className={classNames('modal-no', classes.modalButton)} onClick={() => {
            props.setDisplay(false);
            setTimeout(() => {
              if (props.focusedElement instanceof HTMLElement) {
                props.focusedElement.focus();
              }
            }, 200);
          }}>
            {props.message2 ? 'No' : 'Stay on Page'}
          </span>
        </div>
      </div>
    </Modal>
  );
};
