import { Moment } from 'moment';

export enum IxnStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DOES_NOT_MEET_EEI = 'DOES_NOT_MEET_EEI',
}

export enum IxnApprovalStatus {
  NOT_REVIEWED = 'NOT_REVIEWED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export default class IxnModel {
  constructor(
    public id: number|null,
    public rfiId: number,
    public exploitDateId: number,
    public targetId: number,
    public segmentId: number,
    public exploitAnalyst: string,
    public time: Moment,
    public activity: string,
    public track: string,
    public trackAnalyst: string,
    public status: IxnStatus,
    public checker: string,
    public trackNarrative: string,
    public note: string,
    public approvalStatus: IxnApprovalStatus,
  ) {
  }
}
