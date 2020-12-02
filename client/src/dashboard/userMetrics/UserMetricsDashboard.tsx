import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import theme from '../../resources/theme';
import { useDispatch } from 'react-redux';
import { exitUserMetricsPage } from '../../store/rfi';
import TrophyIcon from '../../resources/icons/TrophyIcon';
import { ScoreBoardContainer } from './ScoreBoardContainer';
import { StyledRangeMetricsContainer } from './RangeMetricsContainer';
import { useCookies } from 'react-cookie/cjs';
import { Cookie } from '../../utils';

interface MyProps {
  className?: string;
}

export const UserMetricsDashboard: React.FC<MyProps> = (props) => {
  const dispatch = useDispatch();
  const [displayUserScoreBoard, setDisplayUserScoreBoard] = useState(false);
  const [cookies] = useCookies(['magpie']);
  const cookie: Cookie = cookies.magpie;

  const handleBack = () => {
    displayUserScoreBoard ? setDisplayUserScoreBoard(false) : dispatch(exitUserMetricsPage());
  };

  const buttonClick = () => {
    fetch(
      `/api/metrics/click-scoreboard?userName=${cookie.userName}`,
      {
        method: 'post',
      },
    ).catch((reason) => console.log(`Failed to post scoreboard click metric: ${reason}`));

    setDisplayUserScoreBoard(true);
  };

  return (
    <div className={classNames(props.className, 'metrics-dashboard')}>
      <header className='metrics-header'>
        <div className={'metrics-header--back-button'} onClick={handleBack}>
          <StyledBackButtonVector/>
        </div>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
        <div className={'action-button-area'}>
          {displayUserScoreBoard ? '' : <button onClick={buttonClick} className={'scoreboard-button'}>
            <TrophyIcon/>
          </button>}
        </div>
      </header>
      <section className={'metrics-view'}>
        {displayUserScoreBoard ? <ScoreBoardContainer/>
          :
          <StyledRangeMetricsContainer/>
        }
      </section>
    </div>
  );
};

export const StyledUserMetricsDashboard = styled(UserMetricsDashboard)`
  display: block;
  height: 100%;
  width: 100%;
  background-color: ${theme.color.backgroundBase};
  font-size: ${theme.font.sizeHeader};
  font-weight: ${theme.font.weightNormal};
  
  .metrics-header { 
   width: 100%;
   display: flex;
   position: absolute;
   justify-content: space-between;
   align-items: center;
   flex-shrink: 1;
   flex-grow: 0;
   background: ${theme.color.backgroundInformation};
   height: 63px;
   box-shadow: 0 2px 20px #000000;
   z-index: 101;
  }
  
  .metrics-view {
   position: absolute;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   top: 63px;
   z-index: 100;
  }
  
  .metrics-header--back-button {
   cursor: pointer;
   padding-left: 18px;
   width: 60px;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
  }
  
  .container {
   padding: 15px;
  }
  
  .scoreboard {
   width: 605px;
   height: 900px;
   background: linear-gradient(180deg, #1C272B 0%, rgba(5, 23, 31, 0.53) 100%);
  }
  
   h4 {
    font-size: 18px;
    margin: 0;
    padding-bottom: 10px;
   }
  .scoreboard-header {
   width: 100%;
   position: relative;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   padding-left: 22px;
   padding-right: 10px;
  }
   
  .rating-column-title {
   font-size: 18px;
   width: 85px;
   display: flex;
   flex-shrink: 1;
   flex-grow: 0;
   flex-direction: column;
   position: relative;
   justify-content: flex-end;
   align-items: center;
  }
   
  .user-name{
   font-style: normal;
   font-weight: ${theme.font.weightMedium};
   font-size: 20px;
   line-height: 23px;
   display: flex;
   width: 390px;
   justify-content: start;
   margin-left: 14px;
  }
   
  .approval-rating {
   font-style: normal;
   font-weight: ${theme.font.weightMedium};
   font-size: 20px;
   line-height: 23px;
   margin-left: auto;
  }
   
  .row-background {
   border-radius: 44px;
   width: 517px;
   height: 44px;
   display: flex;
   justify-content: space-between;
   flex-shrink: 1;
   flex-grow: 0;
   align-items: center;
   padding: 0 10px 0 0;
  }
   
  .bottom-cap {
   position: absolute;
   bottom: 0;
   width: 100%;
   height: 58px;
   background: #041319;
   box-shadow: 0px -4px 8px #041319;
  }
    
  .rank-column-title {
   height: 90px;
   width: 90px;
   font-size: 18px;
   display: flex;
   flex-shrink: 1;
   flex-grow: 0;
   flex-direction: column;
   position: relative;
   justify-content: flex-end;
   align-items: center;
  }

  .scoreboard-body {
   flex-direction: column;
   height: 90%;
   align-items: center;
   display: flex;
   position: absolute;
    width: 620px;
      overflow-y: scroll;
  }
  
  .rank-background {
   position: relative;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   border-radius: 100px;
   width: 34px;
   height: 34px;
   margin-left: 5px;
   background: #359EFF;
   border: 1px solid rgba(77, 116, 255, 0.5);
   box-sizing: border-box;
  }

  .scoreboard-row {
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: center;
   margin-top: 6px;
  }
  
  .card-container {
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: flex-start;
   align-content: center;
   flex-wrap: wrap;
   flex-shrink: 1;
   flex-grow: 0;
   overflow-y: auto;
  }
  
  .datepickers {
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
  }
  
  .datepicker-spacer {
   width: 30px;
   text-align: center;
   font-size: 22px;
   font-weight: bold;
  }
  
  .datepicker-date {
   width: 93px;
     input {
       font-size: 22px;
       font-weight: bold;
     }
  }
  
  .scoreBoard-container {
   height: 100%;
   width: 100%;
   background-color: white;
  }
  
  .action-button-area  {
   display: flex;
   height: 60px;
   width: 90px;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   background-color: transparent;
  }
  
  .scoreboard-button {
   height: 30px;
   width: 30px;
   padding: 0;
   background-color: transparent;
   outline: none;
   border: none;
   border-radius: 50%;
   cursor: pointer;
  }
  
  .datepicker-button {
   cursor: pointer;
  }
`;
