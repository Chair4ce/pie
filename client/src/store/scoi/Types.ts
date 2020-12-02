import { ScoiModel } from './ScoiModel';

export enum ScoiActionTypes {
  NAVIGATE_TO_SCOI_PAGE = 'NAVIGATE_SCOI_PAGE',
  EXIT_SCOI_PAGE = 'EXIT_SCOI_PAGE',
  EDIT_SCOI = 'EDIT_SCOI'
}

export interface ScoiState {
  readonly viewScoiPage: boolean;
  readonly scois: ScoiModel[];
  readonly editingScoiId: number;
}
