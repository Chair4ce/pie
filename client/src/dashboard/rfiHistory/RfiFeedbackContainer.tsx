import * as React from 'react';
import RfiModel from '../../store/rfi/RfiModel';
import styled from 'styled-components';
import theme from '../../resources/theme';
import classNames from 'classnames';
import RfiFeedbackModel from '../../store/rfi/RfiFeedbackModel';
import { Bullet } from '../../resources/icons/Bullet';
import { RfiInfoButton } from '../../resources/icons/RfiInfoButton';

interface MyProps {
  rfi: RfiModel|undefined
  feedback: RfiFeedbackModel|undefined;
  viewRfiInfo: () => void;
  className?: string
}

export const RfiFeedbackContainer: React.FC<MyProps> = (props) => {
  const commentsSubmitted = props.feedback && props.feedback.comments && props.feedback.comments.length > 0;
  const timelinessSubmitted = props.feedback && props.feedback.timeliness && props.feedback.timeliness.length > 0;
  const qualitySubmitted = props.feedback && props.feedback.quality && props.feedback.quality.length > 0;
  const missionImpactSubmitted = props.feedback && props.feedback.missionImpact && props.feedback.missionImpact.length >
    0;

  return (
    <div className={props.className}>
      <div className={'button-section'}>
        <div className={'view-rfi-info-button no-select'} onClick={props.viewRfiInfo}>
          <span>View RFI Information</span>
          <RfiInfoButton/>
        </div>
      </div>
      <div className={'body'}>
        <span className={'header'}>Customer Feedback</span>
        <span className={classNames('text-body', commentsSubmitted ? null : 'no-feedback')}>
          {commentsSubmitted ?
            props.feedback!.comments
            :
            props.rfi ?
              `${props.rfi!.customerTitle} ${props.rfi!.customerSurname}, ${props.rfi!.customerGivenName} did not submit written feedback for this RFI.`
              :
              null
          }
        </span>

        <span className={'header'}>How did we do?</span>
        <span className={classNames('text-body', timelinessSubmitted ? null : 'no-feedback')}>
          {timelinessSubmitted ?
            <><Bullet highlighted/>{props.feedback!.timeliness}</>
            :
            <><Bullet inactive/>No timeliness feedback was submitted.</>
          }
        </span>
        <span className={classNames('text-body', qualitySubmitted ? null : 'no-feedback')}>
          {qualitySubmitted ?
            <><Bullet highlighted/>{props.feedback!.quality}</>
            :
            <><Bullet inactive/>No quality feedback was submitted.</>
          }
        </span>
        <span className={classNames('text-body', missionImpactSubmitted ? null : 'no-feedback')}>
          {missionImpactSubmitted ?
            <><Bullet highlighted/>{props.feedback!.missionImpact}</>
            :
            <><Bullet inactive/>No mission impact feedback was submitted.</>
          }
        </span>
      </div>
    </div>
  );
};

export const StyledRfiFeedbackContainer = styled(RfiFeedbackContainer)`
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
    height: 37px;
    
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
    svg {
      margin-right: 5px;
    }
  }
  
  .projected-completion {
    font-weight: ${theme.font.weightBolder};
  }

  .product-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 225px;
  }
  
  .no-feedback {
    font-style: italic;
    color: #D5E9F0;
    font-weight: 500;
  }
  
  .button-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: -16px;
    z-index: 999;
    
  }
  
  .view-rfi-info-button {
    width: 215px;
    height: 39px;
    border-radius: 19.5px;
    background: #243237;
    text-shadow: 0 2px 4px #000000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 0 19px;
    cursor: pointer;
    
    div {
      margin-top: 4px;
    }
    
    :hover {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.75);
    }
  }
`;
