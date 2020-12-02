import { TargetModel } from '../tgt/TargetModel';
import { SegmentModel } from './SegmentModel';
import IxnModel from './IxnModel';

export enum IxnActionTypes {
  NAVIGATE_TO_IXN_PAGE = 'NAVIGATE_TO_IXN_PAGE',
  RELOAD_IXN_PAGE = 'RELOAD_IXN_PAGE',
  EXIT_IXN_PAGE = 'EXIT_IXN_PAGE',
  ADD_SEGMENT = 'ADD_SEGMENT',
  EDIT_SEGMENT = 'EDIT_SEGMENT',
  EDIT_IXN = 'EDIT_IXN',
  ADD_NOTE = 'ADD_NOTE',
}

export interface IxnState {
  readonly viewIxnPage: boolean;
  readonly target: TargetModel;
  readonly dateString: string;
  readonly segments: SegmentModel[];
  readonly ixns: IxnModel[];
  readonly autofocus: boolean;
  readonly addSegment: boolean;
  readonly editSegment: number;
  readonly editIxn: number;
  readonly addNote: number;
  readonly newSegment: SegmentModel | undefined;
  readonly highlight: number;
}
