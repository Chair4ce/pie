import * as React from 'react';
import { useState } from 'react';
import RfiModel from '../../store/rfi/RfiModel';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';
import classNames from 'classnames';
import theme from '../../resources/theme';
import DeleteButtonX from '../../resources/icons/DeleteButtonX';
import TextTooltip from './TextTooltip';
import { DownloadIcon } from '../../resources/icons/DownloadIcon';
import { MiniTrashcanButton } from '../../resources/icons/MiniTrashcanButton';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

interface MyProps {
  rfi: RfiModel;
  userName: string;
  hideModal: () => void;
  handleDeleteProduct: () => void;
  disableDelete?: boolean;
  className?: string;
}

export const FileDownloadModal: React.FC<MyProps> = (props) => {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  const handleDeleteProduct = () => {
    props.handleDeleteProduct();
    props.hideModal();
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={() => props.hideModal()}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={classNames('file-download-modal', props.className)}
    >
      <div className={'modal-container'}>
        <div className={'modal-header'}>
          <div className={'close-button'} onClick={() => props.hideModal()}>
            <DeleteButtonX/>
          </div>
        </div>
        <div className={'modal-body'}>
          {props.rfi.productName ?
            <>
              <div className={'button-and-icon-container no-select'}>
                <div className={'icon-container'}>
                  <img src={'fileIcon.png'} alt={'file icon'}/>
                </div>
                <div className={'button-container'}>
                  <a
                    href={`/api/product?rfiId=${props.rfi.id}&userName=${props.userName}`}
                    download={props.rfi.productName}
                  >
                    <div className={'download-button button no-select'}>
                      <DownloadIcon/>
                      <span>Download</span>
                    </div>
                  </a>
                  <div>
                    <div className={classNames('delete-button', 'button', 'no-select',
                                               props.disableDelete ? 'disabled' : null)}
                         onClick={() => {
                           if (!props.disableDelete) {
                             setShowDeletePrompt(true);
                           }
                         }}>
                      <MiniTrashcanButton/>
                      <span>Delete</span>
                    </div>
                  </div>
                </div>
              </div>
              <TextTooltip title={props.rfi.productName}>
                <div className={'text-container'}>
                  <span>
                    {props.rfi.productName}
                  </span>
                </div>
              </TextTooltip>
            </>
            :
            null
          }
          <div className={'spacer no-select'}>&nbsp;</div>
          {showDeletePrompt ?
            <DeleteConfirmationModal display={true} setDisplay={setShowDeletePrompt}
                                     deletingItem={props.rfi.productName!} handleYes={handleDeleteProduct}
                                     productDelete={true}/>
            :
            null}
        </div>
      </div>
    </Modal>
  );
};

export const StyledFileDownloadModal = styled(FileDownloadModal)`
  .modal-container {
    width: 315px;
    height: 228px;
    margin-top: -114px;
    margin-left: -158px;
    background: ${theme.color.backgroundInformation};
    border: 4px solid ${theme.color.backgroundFocus};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    
    :hover {
      outline: none;
    }
    
    :focus {
      outline: none;
    }
  }
  
  .modal-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  
  .close-button {
    margin-top: 4px;
    margin-right: 4px;
  }
  
  .modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: available;
  }
  
  .icon-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .text-container > span {
    display: inline-block;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${theme.font.sizeRow};
    font-weight: bold;
  }
  
  a {
    color: ${theme.color.fontPrimary};
    text-decoration: none;
    outline: none;
  }
  
  .spacer {
    width: 12px;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 104px;
    margin-top: -18px;
  }
  
  .button-and-icon-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 126px;
    height: 38px;
    border: 2px solid ${theme.color.downloadButtonBorder};
    background: ${theme.color.backgroundDownloadButton};
    border-radius: 19px;
    padding-left: 2px;
    text-decoration:none;
    cursor: pointer;
    box-shadow: 0 2px 4px #000000;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
    
    span {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      flex-grow: 1;
    }
  }
  
  .delete-button {
    svg {
      margin-left: 10px;
      height: 30px;
      width: 30px;
      box-shadow: none;
      pointer-events: none;
    }
  }
`;
