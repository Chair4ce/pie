import { ScoiActionTypes, ScoiState } from './Types';
import { Reducer } from 'redux';

const initState: ScoiState = {
  viewScoiPage: false,
  scois: [],
  editingScoiId: -1,
};

const reducer: Reducer<ScoiState> = (state = initState, action: any) => {
  switch (action.type) {
    case ScoiActionTypes.NAVIGATE_TO_SCOI_PAGE:
      return {
        ...state,
        scois: action.scois,
        viewScoiPage: true,
        editingScoiId: -1,
      };
    case ScoiActionTypes.EXIT_SCOI_PAGE:
      return {
        ...state,
        viewScoiPage: false,
        editingScoiId: -1,
      };
    case ScoiActionTypes.EDIT_SCOI:
      return {
        ...state,
        editingScoiId: action.scoiId,
      };
    default:
      return {...state};
  }
};

export { reducer as scoiReducer };
export { initState as scoiInitState };
