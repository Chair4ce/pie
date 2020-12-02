import { TargetModel, TargetStatus } from './TargetModel';

export class TargetPostModel {
  constructor(
    public targetId: number|null,
    public rfiId: number,
    public exploitDateId: number,
    public mgrs: string,
    public notes: string|null,
    public description: string|null,
    public status: TargetStatus = TargetStatus.NOT_STARTED,
    public hourlyRollup: string,
    public allCallouts: string,
  ) {
  }
}

export const convertToPostModel = (target: TargetModel): TargetPostModel => {
  return new TargetPostModel(target.id, target.rfiId, target.exploitDateId, target.mgrs, target.notes,
                             target.description, target.status, target.hourlyRollup, target.allCallouts);
};
