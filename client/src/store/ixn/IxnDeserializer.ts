import IxnModel from './IxnModel';

const moment = require('moment');

export class IxnDeserializer {
  static deserialize(items: any): IxnModel[] {
    if (items.map) {
      return items.map((json: any) => {
        return new IxnModel(
          json.id,
          json.rfiId,
          json.exploitDateId,
          json.targetId,
          json.segmentId,
          json.exploitAnalyst,
          moment(json.time, moment.ISO_8601).utc(),
          json.activity,
          json.track,
          json.trackAnalyst,
          json.status,
          json.checker,
          json.trackNarrative,
          json.note,
          json.approvalStatus,
        );
      });
    }
    return [];
  }
}
