import * as React from 'react';
import { useState } from 'react';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { Cookie } from '../../utils';
import theme from '../../resources/theme';
import TgtPageButtonVector from '../../resources/icons/TgtPageButtonVector';
import ExternalLinkVector from '../../resources/icons/ExternalLinkVector';
import classNames from 'classnames';
import { UploadFileButtonVector } from '../../resources/icons/UploadFileButton';
import { StyledFileUploadModal } from '../components/FileUploadModal';
import { useSnackbar } from 'notistack';
import { DismissSnackbarAction } from '../components/InformationalSnackbar';
import TextTooltip from '../components/TextTooltip';
import { StyledProductLinkButton } from '../../resources/icons/ProductLinkButton';
import { FinishedProductIcon } from '../../resources/icons/FinishedProductIcon';
import { StyledFileDownloadModal } from '../components/FileDownloadModal';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FeedbackIcon } from '../../resources/icons/FeedbackIcon';

interface MyProps {
  rfi: RfiModel|undefined;
  loadTgtPage: (rfi: RfiModel) => void;
  postGetsClick: (rfi: RfiModel) => void;
  handlePostProductUpload: (data: FormData, rfiId: number, userName: string) => void;
  handleDeleteProduct: (rfiId: number, productName: string) => void;
  rfiIsHistorical?: boolean
  viewFeedback?: () => void;
  className?: string
}

export const RfiDescriptionContainer: React.FC<MyProps> = (
  {rfi, loadTgtPage, postGetsClick, className, handlePostProductUpload, handleDeleteProduct, rfiIsHistorical, viewFeedback}) => {
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showDownloadFileModal, setShowDownloadFileModal] = useState(false);

  const [cookies, setCookies] = useCookies(['magpie']);
  let cookie: Cookie = cookies.magpie;

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const handleTgtClick = () => {
    if (rfi && rfi.status !== RfiStatus.PENDING) {
      setCookies('magpie', {...cookie, viewState: {rfiId: rfi.id, tgtId: undefined}});
      loadTgtPage(rfi);
    }
  };

  const handleGetsClick = () => {
    if (rfi) {
      postGetsClick(rfi);
      window.open(rfi.getsUrl, '_blank');
    }
  };

  const handleFileUpload = (file: File) => {
    if (rfi && file) {
      let data = new FormData();
      data.append('file', file);
      data.append('name', file.name);

      handlePostProductUpload(data, rfi.id, cookie.userName);
      setShowUploadFileModal(false);
      enqueueSnackbar('Product Submitted', {
        action: (key) => DismissSnackbarAction(key, closeSnackbar, 'dismiss-snackbar'),
        variant: 'info',
      });
    }
  };

  return (
    <div className={className}>
      {rfiIsHistorical ?
        <div className={'button-section'}>
          <div className={'button-wrapper'}>
            <div className={classNames('navigate-to-tgt-button', 'button', 'no-select',
                                       rfi && rfi.status === RfiStatus.PENDING ? 'disabled' : null)}
                 onClick={handleTgtClick}
            >
              <span> TGTs</span>
              <TgtPageButtonVector/>
            </div>
            <div className={'product-container'}>
              <div
                className={classNames('download-button product-button button',
                                      !rfi || !rfi.productName || rfi.productName.length < 1 ? 'disabled' : null)}
                onClick={() => setShowDownloadFileModal(true)}
              >
                <span>Finished Product</span>
                <FinishedProductIcon/>
              </div>
            </div>
          </div>
          <div className={'view-feedback-button no-select'} onClick={viewFeedback}><FeedbackIcon/><span>View Customer Feedback</span>
          </div>
        </div>
        :
        <div className={'button-section'}>
          {/*<div className={'spacer'}>&nbsp;</div>*/}
          <div className={'button-wrapper'}>
            <div className={classNames('navigate-to-tgt-button', 'button', 'no-select',
                                       rfi && rfi.status === RfiStatus.PENDING ? 'disabled' : null)}
                 onClick={handleTgtClick}
            >
              <span> TGTs</span>
              <TgtPageButtonVector/>
            </div>
            <div className={classNames('gets-button', 'button', 'no-select')}
                 onClick={handleGetsClick}
            >
              <span>GETS</span>
              <ExternalLinkVector/>
            </div>
          </div>
          {rfi && rfi.productName === null ?
            <div
              className={classNames('upload-button product-button button',
                                    rfi && rfi.status !== RfiStatus.PENDING ? null : 'disabled')}
              onClick={() => setShowUploadFileModal(true)}
            >
              {rfi && rfi.status !== RfiStatus.PENDING ? <span>Upload Product</span> : null}
              <UploadFileButtonVector/>
            </div>
            :
            <div
              className={classNames('download-button product-button button',
                                    rfi && rfi.status !== RfiStatus.PENDING ? null : 'disabled')}
              onClick={() => setShowDownloadFileModal(true)}
            >
              {rfi && rfi.status !== RfiStatus.PENDING ? <span>Finished Product</span> : null}
              <FinishedProductIcon/>
            </div>
          }
          <CopyToClipboard
            onCopy={() => {
              enqueueSnackbar('Feedback Link Copied to Clipboard', {
                action: (key) => DismissSnackbarAction(key, closeSnackbar, 'dismiss-snackbar'),
                variant: 'info',
              });
            }}
            text={`${window.location.href}feedback/${rfi ? rfi.rfiNum : 'error'}`}>
            <TextTooltip title={'Copy Link'}>
              <div className={classNames('copy-link', rfi && rfi.productName === null ? 'disabled' : null)}>
                {rfi && rfi.status !== RfiStatus.PENDING && rfi.productName !== null ? <span>Feedback Survey Link</span> : null}
                <StyledProductLinkButton/>
              </div>
            </TextTooltip>
          </CopyToClipboard>
        </div>
      }
      <div className={'body'}>
        {rfi && rfi.completionDate ?
          <>
            <span className={'header header-projected-completion'}>{(rfi.status === RfiStatus.CLOSED ? '' :
              'Projected ') + 'Completion Date'}</span>
            <span className={'text-body projected-completion'}>{rfi.completionDate.format('DD MMMM YYYY')}</span>
          </>
          :
          null
        }
        <span className={'header'}>RFI Description</span>
        <span className={'text-body'}>{rfi ? rfi.description : null}</span>
        <span className={'header'}>Justification</span>
        <span className={'text-body'}>{rfi ? rfi.justification : null}</span>
        <span className={'header'}>Customer Information</span>
        <span className={'text-body'}>
              <span>{rfi ? `${rfi.customerTitle} ${rfi.customerSurname}, ${rfi.customerGivenName}` : null}</span>
              <span>{rfi ?
                `COMM: ${rfi.customerCommPhone}` +
                (rfi.customerDsnPhone === '' ? '' : ` / DSN: ${rfi.customerDsnPhone}`) +
                (rfi.customerSvoip === '' ? '' : ` / SVoIP: ${rfi.customerSvoip}`) +
                (rfi.customerTsvoip === '' ? '' : ` / TSVoIP: ${rfi.customerTsvoip}`)
                :
                null
              }</span>
              <span>{rfi ? rfi.customerEmail : null}</span>
            </span>
      </div>
      {showUploadFileModal ?
        <StyledFileUploadModal hideModal={() => setShowUploadFileModal(false)} handleFileUpload={handleFileUpload}/>
        :
        null
      }
      {showDownloadFileModal && rfi ?
        <StyledFileDownloadModal
          hideModal={() => setShowDownloadFileModal(false)}
          handleDeleteProduct={() => handleDeleteProduct(rfi!.id,
                                                         typeof rfi.productName === 'string' ? rfi.productName :
                                                           '')}
          rfi={rfi}
          userName={cookie.userName}
          disableDelete={rfiIsHistorical}
        />
        :
        null
      }
    </div>
  );
};

export const StyledRfiDescriptionContainer = styled(RfiDescriptionContainer)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  margin-right: 26px;
  font-weight: ${theme.font.weightBold};
  font-size: ${theme.font.sizeRow};
  line-height: 19px;

  .button-section {
    display: flex;
    width: 100%;
    min-width: 815px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
  }
  
  .spacer {
    display: flex;
    width: 225px;
  }

  .product-button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end !important;
    align-items: center;
    width: 200px;
    height: 32px;
    margin-bottom: 5px;
    
    span {
      margin-bottom: 0 !important;
      margin-right: 8px;
    }
  }
  
  .download-button {
    svg {
      margin-right: 4px;
      margin-bottom: 4px;
    }
  }
  
  .button-wrapper {
    display: flex;
  }
  
  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    span {
      margin-bottom: 4px;
    }
    
    :hover {
      text-shadow: 0 0 4px #FFF;
      svg {
        filter: drop-shadow(0 0px 4px #FFFFFF);
      }
    }
  }
  
  .navigate-to-tgt-button {
    margin-right: 8px;
    
    span {
      margin-right: 4px;
    }
  }
  
  .gets-button {
    margin-left: 8px;
    
    span {
      margin-right: 8px;
    }
  }
  
  .body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    overflow-y: auto;
    padding-right: 15px;
    padding-top: 4px;
  }
  
  .header {
    color: ${theme.color.fontHeader};
    margin: 8px 0;
  }
  
  .header-projected-completion {
    font-size: ${theme.font.sizeMetricsHeader};
    font-weight: ${theme.font.weightBold};
  }
  
  .text-body {
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .projected-completion {
    font-weight: ${theme.font.weightBolder};
  }
  
  .view-feedback-button {
    width: 244px;
    height: 39px;
    border-radius: 19.5px;
    background: #243237;
    text-shadow: 0 2px 4px #000000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px 0 5px;
    cursor: pointer;
    
    svg {
      filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5));
    }
    
    div {
      margin-top: 4px;
    }
    
    :hover {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.75);
    }
  }
  
  .copy-link {
    flex: 0 0 250px;
    height: 32px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    
    span {
      margin-right: 4px;
    }
    
    :hover {
      text-shadow: 0 0 4px #FFF;
      svg {
        filter: drop-shadow(0 0px 4px #FFFFFF);
      }
    }
  }
`;
