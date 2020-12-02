import RfiModel from '../rfi/RfiModel';
import { TgtActionTypes } from './Types';
import 'isomorphic-fetch';
import { TargetModel } from './TargetModel';
import { ExploitDateModel } from './ExploitDateModel';
import { ExploitDateSorter } from './ExploitDateSorter';

export const exitTgtPage = () => {
  return {
    type: TgtActionTypes.EXIT_TGT_PAGE,
    viewTgtPage: false,
  };
};

export const updateTgtSuccess = (targets: TargetModel[]) => {
  return {
    type: TgtActionTypes.UPDATE_TGT_SUCCESS,
    targets: targets,
  };
};

export const updateTgtsLocal = (targets: TargetModel[], isCopy: boolean) => {
  return {
    type: TgtActionTypes.UPDATE_TGT_LOCAL,
    targets: targets,
    isCopy: isCopy,
  };
};

export const  addTgt = (exploitDateId: number) => {
  return {
    type: TgtActionTypes.ADD_TGT,
    addTgt: exploitDateId,
  };
};

export const editTgt = (targetId: number) => {
  return {
    type: TgtActionTypes.EDIT_TGT,
    editTgt: targetId,
  };
};

export const resetAddEditTgt = () => {
  return {
    type: TgtActionTypes.RESET_ADD_EDIT_TGT,
  };
};

export const fetchDatesAndTargetsSuccess = (rfi: RfiModel, exploitDates: ExploitDateModel[], targets: TargetModel[],
                                            firstLoad: boolean, newExploitDateId: number) => {
  if (firstLoad) {
    return {
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
      rfi: rfi,
      exploitDates: exploitDates,
      targets: targets,
    };
  }
  return {
    type: TgtActionTypes.RELOAD_TGT_PAGE,
    exploitDates: exploitDates,
    targets: targets,
    newExploitDateId: newExploitDateId,
  };
};

export const updateExploitDateSuccess = (exploitDates: ExploitDateModel[]) => {
  return {
    type: TgtActionTypes.UPDATE_EXPLOIT_DATE,
    exploitDates: ExploitDateSorter.sort(exploitDates),
  };
};

export const setDatePlaceholder = (show: boolean) => {
  return {
    type: TgtActionTypes.SHOW_DATE_PLACEHOLDER,
    showDatePlaceholder: show,
  };
};
