import { HistoricalRfiModel } from './HistoricalRfiModel';

export enum HistoricalRfiActionTypes {
  NAVIGATE_RFI_HISTORY_PAGE = 'NAVIGATE_RFI_HISTORY_PAGE',
  EXIT_RFI_HISTORY_PAGE = 'EXIT_RFI_HISTORY_PAGE',
  SELECT_HISTORICAL_RFI = 'SELECT_HISTORICAL_RFI'
}

export interface HistoricalRfiState {
  readonly viewRfiHistoryPage: boolean;
  readonly historicalRfis: HistoricalRfiModel[];
  readonly selectedHistoricalRfi: HistoricalRfiModel;
}
