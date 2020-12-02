import { HistoricalRfiState, HistoricalRfiActionTypes } from './Types';
import { Reducer } from 'redux';
import { HistoricalRfiModel } from './HistoricalRfiModel';

const initState: HistoricalRfiState = {
  viewRfiHistoryPage: false,
  historicalRfis: [],
  selectedHistoricalRfi: {} as HistoricalRfiModel,
};

const reducer: Reducer<HistoricalRfiState> = (state = initState, action: any) => {

  switch (action.type) {
    case HistoricalRfiActionTypes.NAVIGATE_RFI_HISTORY_PAGE:
      return {
        ...state,
        viewRfiHistoryPage: true,
        historicalRfis: action.historicalRfis,
        selectedHistoricalRfi: action.historicalRfis[0],
      };
    case HistoricalRfiActionTypes.EXIT_RFI_HISTORY_PAGE:
      return {
        ...state,
        viewRfiHistoryPage: false,
      };
    case HistoricalRfiActionTypes.SELECT_HISTORICAL_RFI:
      return {
        ...state,
        selectedHistoricalRfi: action.selectedHistoricalRfi,
      };
    default:
      return {...state};
  }
};

export { reducer as historicalRfiReducer };
export { initState as historicalRfiInitState };
