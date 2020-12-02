import { Moment } from 'moment';

export enum RfiStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export default class RfiModel {
  constructor(
    public id: number,
    public rfiNum: string,
    public getsUrl: string,
    public startDate: Moment|undefined,
    public status: RfiStatus = RfiStatus.PENDING,
    public customerTitle: string,
    public customerGivenName: string,
    public customerSurname: string,
    public customerUnit: string,
    public customerEmail: string,
    public customerCommPhone: string,
    public customerDsnPhone: string,
    public customerSvoip: string,
    public customerTsvoip: string,
    public ltiov: Moment|undefined,
    public country: string,
    public description: string,
    public justification: string,
    public priority: number,
    public tgtCount: number,
    public ixnCount: number,
    public completionDate: Moment|undefined,
    public containsRejectedTracks: boolean,
    public areAllTracksComplete: boolean,
    public productName: string|null,
  ) {
  }
}
