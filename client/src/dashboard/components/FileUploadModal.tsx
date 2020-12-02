import { Modal } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { useRef, useState } from 'react';
import { longInputStyles } from '../../resources/theme';
import BrowseButton from '../../resources/icons/BrowseButton';
import styled from 'styled-components';
import DeleteButtonX from '../../resources/icons/DeleteButtonX';
import TextTooltip from './TextTooltip';

interface MyProps {
  hideModal: () => void;
  handleFileUpload: (file: File) => void;
  className?: string;
}

export const FileUploadModal: React.FC<MyProps> = (props) => {
    const classes = longInputStyles();
    const [file, setFile] = useState(undefined as unknown as File);
    const hiddenFileInput = useRef(null);

    const handleDragEnter = (event: any) => {
      event.preventDefault();
    };
    const handleDragOver = (event: any) => {
      event.preventDefault();
    };

    const handleDrop = (event: any) => {
      event.preventDefault();
      setFile(event.dataTransfer.files[0]);
    };

    const handleClickBrowse = () => {
      if (hiddenFileInput.current !== null) {
        //@ts-ignore
        hiddenFileInput.current.click();
      }
    };

    const handleBrowseFileSelect = (event: any) => {
      setFile(event.target.files[0]);
    };

    const handleFileUpload = (event: any) => {
      event.preventDefault();

      if (file) {
        props.handleFileUpload(file);
      }
    };

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
        className={classNames('file-upload-modal', classes.uploadModal, props.className)}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
      >
        <div className={classNames(classes.modalBody, 'modal-body')} onDrop={handleDrop}>
          <div className={'close-wrapper'} onClick={props.hideModal}><DeleteButtonX/></div>
          <div className={classNames('modal-text', classes.uploadModalText)}>
            {file ?
              'Submit this file?' :
              'Drag and drop KML file here'
            }
          </div>
          {file ?
            <>
              <div className={'icon-container'}>
                <img src={'fileIcon.png'} alt={'file icon'}/>
              </div>
              <TextTooltip title={file.name}>
                <div className={'text-container'}>
                <span>
                  {file.name}
                </span>
                </div>
              </TextTooltip>
            </> :
            <div className={classes.uploadDropArea}>
              &nbsp;
            </div>}
          <div className={classes.modalUploadButtons}>
            <div className={classes.uploadSpacer}>&nbsp;</div>
            <span className={classNames('submit-button', file ? null : 'disabled', classes.uploadModalButton)}
                  onClick={handleFileUpload}>
            Submit
          </span>
            <div className={classNames('browse-button')} onClick={handleClickBrowse}>
              <span>Browse</span>&nbsp;<BrowseButton/>
              <input type={'file'} ref={hiddenFileInput} onChange={handleBrowseFileSelect} style={{display: 'none'}}/>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
;

export const StyledFileUploadModal = styled(FileUploadModal)`
  .modal-body {
    padding-top: 2px !important;
    border-width: 4px !important;
    border-radius: 10px;
    
    :hover {
      outline: none;
    }
    
    :focus {
      outline: none;
    }
  }
  
  .close-wrapper {
    display: flex;
    height: 24px;
    padding: 4px;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  
  .browse-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 124px;
    font-size: 16px;
    cursor: pointer;
    
    :hover {
      text-shadow: 0 0 4px #FFF;
      
      svg {
        box-shadow: 0 0 6px #FFFFFF;
      }
    }
  }
  
  .icon-container {
    display: flex;
    flex-direction: column;
    font-size: ${(props) => props.theme.font.sizeHeaderSmall};
    color: ${(props) => props.theme.color.fontPrimary};
  }
  
  .text-container > span {
    display: inline-block;
    max-width: 440px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
