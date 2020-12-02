import { Modal } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { longInputStyles } from '../../resources/theme';

interface MyProps {
  deletingItem: string;
  display: boolean;
  setDisplay: (display: boolean) => void;
  handleYes: () => void;
  productDelete?: boolean;
}

export const DeleteConfirmationModal: React.FC<MyProps> = props => {
  const classes = longInputStyles();

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.display}
      onClose={() => props.setDisplay(false)}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={classNames('delete-modal', props.productDelete ? classes.deleteProductModal : classes.deleteModal)}
    >
      <div className={classNames(classes.modalBody, props.productDelete ? classes.deleteModalBody : null)}>
        {props.productDelete ?
          <>
            <div className={classes.modalIcon}>
              <img src={'fileDeleteIcon.png'} alt={'delete icon'}/>
            </div>
            <div className={classNames('modal-text', classes.modalText)}>
              Delete this file?
            </div>
          </>
          :
          <>
            <div className={'modal-text'}>
              Are you sure you want to delete <br/>{props.deletingItem}?
            </div>
            <div className={'modal-text'}>
              All associated data will be erased.
            </div>
          </>}
        {props.productDelete ?
          <div className={classes.productDeleteConfirmation}>
            <span className={classNames('modal-yes', classes.modalButton)} onClick={() => {
              props.handleYes();
              props.setDisplay(false);
            }}>
              Delete
            </span>
            <span className={classNames('modal-no', classes.modalButton)} onClick={() => props.setDisplay(false)}>
              Cancel
            </span>
          </div>
          :
          <div className={classes.modalConfirmation}>
            <span className={classNames('modal-yes', classes.modalButton)} onClick={() => {
              props.handleYes();
              props.setDisplay(false);
            }}>
              YES
            </span>
            <span className={classNames('modal-no', classes.modalButton)} onClick={() => props.setDisplay(false)}>
              NO
            </span>
          </div>}
      </div>
    </Modal>
  );
};
