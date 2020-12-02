import RfiModel, { RfiStatus } from './RfiModel';

const moment = require('moment');

function matchEnum(status: any) {
  switch (status) {
    case 'new' || 'NEW':
      return RfiStatus.PENDING;
    case RfiStatus.PENDING:
      return RfiStatus.PENDING;
    case RfiStatus.OPEN:
      return RfiStatus.OPEN;
    case RfiStatus.CLOSED:
      return RfiStatus.CLOSED;
    default:
      return RfiStatus.PENDING;
  }
}

export class RfiDeserializer {
  static deserialize(items: any): RfiModel[] {
    if (items.map) {
      return items.map((item: any) => {
        return new RfiModel(item.id,
                            item.rfiNum,
                            item.getsUrl,
                            item.startDate === null ? undefined : moment(item.startDate, moment.ISO_8601).utc(),
                            matchEnum(item.status),
                            item.customerTitle,
                            item.customerGivenName,
                            item.customerSurname,
                            item.customerUnit,
                            item.customerEmail,
                            item.customerCommPhone,
                            item.customerDsnPhone,
                            item.customerSvoip,
                            item.customerTsvoip,
                            item.ltiov === null ? undefined : moment(item.ltiov, moment.ISO_8601).utc(),
                            item.country,
                            item.description,
                            item.justification,
                            item.priority,
                            item.tgtCount,
                            item.ixnCount,
                            item.completionDate === null ? undefined :
                              moment(item.completionDate, moment.ISO_8601).utc(),
                            item.containsRejectedTracks,
                            item.areAllTracksComplete,
                            item.productName,
        );
      });
    }
    return [];
  }
}

