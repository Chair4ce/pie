import { TargetModel } from '../tgt/TargetModel';
import { Reducer } from 'redux';
import { IxnActionTypes, IxnState } from './Types';
import { TgtActionTypes } from '../tgt';


const initState: IxnState = {
  viewIxnPage: false,
  target: {} as TargetModel,
  dateString: '',
  segments: [],
  ixns: [],
  autofocus: false,
  addSegment: false,
  editSegment: -1,
  editIxn: -1,
  addNote: -1,
  newSegment: undefined,
  highlight: -1,
};

const reducer: Reducer<IxnState> = (state = initState, action: any) => {
  switch (action.type) {
    case IxnActionTypes.NAVIGATE_TO_IXN_PAGE:
      return {
        ...state,
        viewIxnPage: true,
        target: action.target,
        dateString: action.dateString,
        segments: action.segments,
        ixns: action.ixns,
        addSegment: action.segments.length === 0,
        newSegment: undefined,
        editSegment: -1,
        editIxn: -1,
        addNote: -1,
        highlight: -1,
      };
    case IxnActionTypes.RELOAD_IXN_PAGE:
      if (!action.isLocalUpdate) {
        if (action.newSegment) {
          return {
            ...state,
            segments: action.segments,
            ixns: action.ixns,
            autofocus: true,
            addSegment: action.segments.length === 0,
            editSegment: -1,
            editIxn: -1,
            addNote: -1,
            newSegment: action.newSegment,
          };
        }
        return {
          ...state,
          segments: action.segments,
          ixns: action.ixns,
          autofocus: true,
          addSegment: action.segments.length === 0,
          editSegment: -1,
          editIxn: -1,
          addNote: -1,
          highlight: action.isNewIxn ? action.ixns.reduce((prev: any, current: any) => {
            return (prev!.id > current!.id) ? prev : current;
          }).id : -1,
        };
      } else {
        return {
          ...state,
          segments: action.segments,
          ixns: action.ixns,
          autofocus: action.autofocus,
        };
      }
    case TgtActionTypes.NAVIGATE_TO_TGT_PAGE:
      return {
        ...state,
        viewIxnPage: false,
      };
    case IxnActionTypes.ADD_SEGMENT:
      return {
        ...state,
        addSegment: action.addSegment,
      };
    case IxnActionTypes.EDIT_SEGMENT:
      return {
        ...state,
        editSegment: action.editSegment,
      };
    case IxnActionTypes.EDIT_IXN:
      return {
        ...state,
        editIxn: action.editIxn,
      };
    case IxnActionTypes.ADD_NOTE:
      return {
        ...state,
        addNote: action.addNote,
      };
    default:
      return {...state};
  }
};

export { reducer as ixnReducer };
export { initState as ixnInitState };
