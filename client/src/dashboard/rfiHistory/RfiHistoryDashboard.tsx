import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRfiSuccess } from '../../store/rfi';
import theme from '../../resources/theme';
import { HistoricalRfiModel } from '../../store/rfiHistory/HistoricalRfiModel';
import { StyledHistoricalRfiTable } from './HistoricalRfiTable';
import { StyledRfiFeedbackContainer } from './RfiFeedbackContainer';
import { StyledRfiDescriptionContainer } from '../rfi/RfiDescriptionContainer';
import RfiModel from '../../store/rfi/RfiModel';
import { loadTgtPage } from '../../store/tgt/Thunks';
import { exitRfiHistoryPage, selectHistoricalRfi } from '../../store/rfiHistory/Actions';
import { ApplicationState } from '../../store';

interface MyProps {
  className?: string
}

export const RfiHistoryDashboard: React.FC<MyProps> = (props) => {
  const historicalRfis = useSelector(({historicalRfiState}: ApplicationState) => historicalRfiState.historicalRfis);
  const selectedHistoricalRfi = useSelector(({historicalRfiState}: ApplicationState) => historicalRfiState.selectedHistoricalRfi);

  let selectedHistoricalRfiId = selectedHistoricalRfi? selectedHistoricalRfi.rfi.id : -1;

  const [viewRfiInfo, setViewRfiInfo] = useState(false);

  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(exitRfiHistoryPage());
  };

  const handleSelectHistoricalRfi = (historicalRfi: HistoricalRfiModel) => {
    dispatch(selectHistoricalRfi(historicalRfi));
  };

  const handleLoadTgtPage = () => {
    let allClosedRfis: RfiModel[] = historicalRfis.map((historicalRfi) =>
                                                         historicalRfi.rfi);
    if (selectedHistoricalRfi) {
      if (allClosedRfis.length > 50) {
        let selectedIndex = allClosedRfis.indexOf(selectedHistoricalRfi.rfi);
        if (selectedIndex < 25) {
          allClosedRfis = allClosedRfis.slice(0, 50);
        } else if (selectedIndex > allClosedRfis.length - 25) {
          allClosedRfis = allClosedRfis.slice(allClosedRfis.length - 50);
        } else {
          allClosedRfis = allClosedRfis.slice(allClosedRfis.indexOf(selectedHistoricalRfi.rfi) - 24, allClosedRfis.indexOf(selectedHistoricalRfi.rfi) + 25);
        }
      }
      dispatch(fetchRfiSuccess(allClosedRfis));
      dispatch(loadTgtPage(selectedHistoricalRfi.rfi, true));
    }
  };

  return (
    <div className={props.className}>
      <div className={'rfi-history-dash--header'}>
        <div className={'back-button'} onClick={handleBackClick}>
          <StyledBackButtonVector/>
        </div>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
      </div>
      <div className={'rfi-history-dash--body'}>
        <StyledHistoricalRfiTable
          historicalRfis={historicalRfis}
          selectedHistoricalRfiId={selectedHistoricalRfiId}
          handleSelectHistoricalRfi={handleSelectHistoricalRfi}
        />
        <div className={'divider-bar'}/>
        {viewRfiInfo ?
          <StyledRfiDescriptionContainer
            rfi={selectedHistoricalRfi ? selectedHistoricalRfi.rfi : undefined}
            loadTgtPage={handleLoadTgtPage}
            postGetsClick={() => {
            }}
            handlePostProductUpload={() => {
            }}
            handleDeleteProduct={() => {
            }}
            rfiIsHistorical
            viewFeedback={() => setViewRfiInfo(false)}
          />
          :
          <StyledRfiFeedbackContainer
            rfi={selectedHistoricalRfi ? selectedHistoricalRfi.rfi : undefined}
            feedback={selectedHistoricalRfi ? selectedHistoricalRfi.feedback : undefined}
            viewRfiInfo={() => setViewRfiInfo(true)}
          />
        }
      </div>
    </div>
  );
};

export const StyledRfiHistoryDashboard = styled(RfiHistoryDashboard)`
  height: 100vh;
  width: 100%;
  word-break: break-word;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  
  .back-button {
    cursor: pointer;
  }
  
  .rfi-history-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${theme.color.backgroundInformation};
    margin-bottom: 17px;
    padding: 0 18px;
  }
  
  .rfi-history-dash--body {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 129px);
    padding-left: 44px;
  }
  
  .divider-bar {
    background: ${theme.color.backgroundInformation};
    box-shadow: 2px 2px 4px #000000;
    border-radius: 8px;
    width: 4px;
    height: 100%;
    margin: 0 25px;
    flex-shrink: 0;
  }
`;
