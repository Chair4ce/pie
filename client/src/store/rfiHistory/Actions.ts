import { HistoricalRfiModel } from './HistoricalRfiModel';
import { HistoricalRfiDeserializer } from './HistoricalRfiDeserializer';
import { HistoricalRfiActionTypes } from './Types';

export const loadRfiHistorySuccess = (historicalRfis: HistoricalRfiModel[]) => {
  return {
    type: HistoricalRfiActionTypes.NAVIGATE_RFI_HISTORY_PAGE,
    historicalRfis: historicalRfis,
  };
};

export const exitRfiHistoryPage = () => {
  return {
    type: HistoricalRfiActionTypes.EXIT_RFI_HISTORY_PAGE,
  };
};

export const selectHistoricalRfi = (historicalRfi: HistoricalRfiModel) => {
  return {
    type: HistoricalRfiActionTypes.SELECT_HISTORICAL_RFI,
    selectedHistoricalRfi: historicalRfi,
  };
};

export const loadRfiHistoryPage = () => {
  return (dispatch: any) => {
    fetch('/api/rfi/closed', {method: 'get'})
      .then(response => response.json())
      .then(jsons => dispatch(loadRfiHistorySuccess(HistoricalRfiDeserializer.deserialize(jsons))))
      .catch((reason) => console.log('Failed to fetch historical RFIs: ' + reason));
  };
};
