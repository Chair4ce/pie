import RfiModel from '../rfi/RfiModel';
import { ExploitDateModel } from './ExploitDateModel';
import { TargetModel } from './TargetModel';

export enum TgtActionTypes {
  NAVIGATE_TO_TGT_PAGE = 'NAVIGATE_TO_TGT_PAGE',
  RELOAD_TGT_PAGE = 'RELOAD_TGT_PAGE',
  EXIT_TGT_PAGE = 'EXIT_TGT_PAGE',
  SHOW_DATE_PLACEHOLDER = 'SHOW_DATE_PLACEHOLDER',
  UPDATE_EXPLOIT_DATE = 'UPDATE_EXPLOIT_DATE',
  UPDATE_TGT_SUCCESS = 'UPDATE_TGT_SUCCESS',
  UPDATE_TGT_LOCAL = 'UPDATE_TGT_LOCAL',
  ADD_TGT = 'ADD_TGT',
  EDIT_TGT = 'EDIT_TGT',
  RESET_ADD_EDIT_TGT = 'RESET_ADD_EDIT_TGT',
  UPDATE_RFI = 'UPDATE_TGT_RFI'
}

export interface TgtState {
  readonly  viewTgtPage: boolean;
  readonly  rfi: RfiModel;
  readonly  exploitDates: ExploitDateModel[];
  readonly  showDatePlaceholder: boolean;
  readonly  targets: TargetModel[];
  readonly  addTgt: number;
  readonly  editTgt: number;
  readonly  newExploitDate: undefined|ExploitDateModel;
  readonly  highlight: boolean;
}
