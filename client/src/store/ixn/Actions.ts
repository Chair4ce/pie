import { TargetModel } from '../tgt/TargetModel';
import { IxnActionTypes } from './Types';
import { SegmentModel } from './SegmentModel';
import IxnModel from './IxnModel';

export const loadIxnPage = (target: TargetModel|null, dateString: string|null, segments: SegmentModel[],
                            ixns: IxnModel[], isLocalUpdate: boolean, newSegment?: SegmentModel,
                            isNewIxn?: boolean) => {
  if (target) {
    return {
      type: IxnActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      segments: segments,
      ixns: ixns,
      dateString: dateString,
    };
  } else {
    return {
      type: IxnActionTypes.RELOAD_IXN_PAGE,
      segments: segments,
      ixns: ixns,
      isLocalUpdate: isLocalUpdate,
      newSegment: newSegment,
      isNewIxn: isNewIxn,
    };
  }
};

export const exitIxnPage = () => {

  return {
    type: IxnActionTypes.EXIT_IXN_PAGE,
  };
};

export const setAddSegment = (addSegment: boolean) => {
  return {
    type: IxnActionTypes.ADD_SEGMENT,
    addSegment: addSegment,
  };
};

export const setEditSegment = (segmentId: number) => {
  return {
    type: IxnActionTypes.EDIT_SEGMENT,
    editSegment: segmentId,
  };
};

export const setEditIxn = (ixnId: number) => {
  return {
    type: IxnActionTypes.EDIT_IXN,
    editIxn: ixnId,
  };
};

export const setAddNote = (ixnId: number) => {
  return {
    type: IxnActionTypes.ADD_NOTE,
    addNote: ixnId,
  };
};
