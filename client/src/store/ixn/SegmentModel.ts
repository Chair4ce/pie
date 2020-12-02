import { Moment } from 'moment';

export class SegmentModel {
  constructor(
    public id: number | null,
    public rfiId: number,
    public exploitDateId: number,
    public targetId: number,
    public startTime: Moment,
    public endTime: Moment,
  ){}
}