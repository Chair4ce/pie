import RfiModel, { RfiStatus } from '../rfi/RfiModel';
import { HistoricalRfiModel } from './HistoricalRfiModel';

const moment = require('moment');

export class HistoricalRfiDeserializer {
  static deserialize(items: any): HistoricalRfiModel[] {
    if (items.map) {
      return items.map((item: any) => {
        return new HistoricalRfiModel(
          new RfiModel(item.rfi.id,
                       item.rfi.rfiNum,
                       item.rfi.getsUrl,
                       item.rfi.startDate === null ? undefined : moment(item.rfi.startDate, moment.ISO_8601).utc(),
                       RfiStatus.CLOSED,
                       item.rfi.customerTitle,
                       item.rfi.customerGivenName,
                       item.rfi.customerSurname,
                       item.rfi.customerUnit,
                       item.rfi.customerEmail,
                       item.rfi.customerCommPhone,
                       item.rfi.customerDsnPhone,
                       item.rfi.customerSvoip,
                       item.rfi.customerTsvoip,
                       item.rfi.ltiov === null ? undefined : moment(item.rfi.ltiov, moment.ISO_8601).utc(),
                       item.rfi.country,
                       item.rfi.description,
                       item.rfi.justification,
                       -1,
                       -1,
                       -1,
                       item.completionDate === null ? undefined :
                         moment(item.completionDate, moment.ISO_8601).utc(),
                       false,
                       false,
                       item.productName,
          ),
          item.feedback ? {...item.feedback} : null
        )
      });
    }
    return [];
  }
}
