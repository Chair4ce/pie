import { SegmentModel } from './SegmentModel';

const moment = require('moment');

export class SegmentDeserializer {
  static deserialize(items: any): SegmentModel[] {
    if (items.map) {
      return items.map((item: any) => {
        return new SegmentModel(item.id, item.rfiId, item.exploitDateId, item.targetId,
                                moment(item.startTime, moment.ISO_8601).utc(),
                                moment(item.endTime, moment.ISO_8601).utc());
      });
    } else if (+items.id > 0) {
      return [new SegmentModel(items.id, items.rfiId, items.exploitDateId, items.targetId,
                               moment(items.startTime, moment.ISO_8601).utc(),
                               moment(items.endTime, moment.ISO_8601).utc())];
    }
    return [] as SegmentModel[];
  }
}
