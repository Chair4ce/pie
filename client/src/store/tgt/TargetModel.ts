export enum TargetStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export class TargetModel {
  constructor(
    public id: number,
    public rfiId: number,
    public exploitDateId: number,
    public name: string,
    public mgrs: string,
    public notes: string|null,
    public description: string|null,
    public status: TargetStatus = TargetStatus.NOT_STARTED,
    public hourlyRollup: string,
    public allCallouts: string,
    public containsRejectedTracks: boolean,
  ) {
  }
}
