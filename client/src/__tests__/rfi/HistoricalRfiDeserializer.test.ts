import * as moment from 'moment';
import { RfiStatus } from '../../store/rfi/RfiModel';
import { HistoricalRfiDeserializer } from '../../store/rfiHistory/HistoricalRfiDeserializer';

describe('Historical RFI deserializer', () => {
  it('should turn backend response into HistoricalRfiModel', () => {
    let json = [
      {
        rfi: {
          rfiNum: 'id',
          getsUrl: 'getsUrl',
          status: 'CLOSED',
          lastUpdate: '2020-11-10T14:21:21.000+0000',
          startDate: null,
          customerTitle: 'customerTitle',
          customerGivenName: 'customerGivenName',
          customerSurname: 'customerSurname',
          customerEmail: 'customerEmail',
          customerUnit: 'customerUnit',
          customerCommPhone: 'customerCommPhone',
          customerDsnPhone: 'customerDsnPhone',
          customerSvoip: 'customerSvoip',
          customerTsvoip: 'customerTsvoip',
          ltiov: '2020-11-20T00:00:00.000+0000',
          country: 'country',
          description: 'A description',
          justification: 'A wild justification appears!',
        },
        completionDate: '2020-11-19T00:00:00.000+0000',
        productName: 'product.kml',
        feedback: null,
      },
      {
        rfi: {
          rfiNum: 'id2',
          getsUrl: 'getsUrl',
          status: 'CLOSED',
          lastUpdate: '2020-11-10T14:21:21.000+0000',
          startDate: '2020-12-13T14:21:21.000+0000',
          customerTitle: 'customerTitle',
          customerGivenName: 'customerGivenName',
          customerSurname: 'customerSurname',
          customerEmail: 'customerEmail',
          customerUnit: 'customerUnit',
          customerCommPhone: 'customerCommPhone',
          customerDsnPhone: 'customerDsnPhone',
          customerSvoip: 'customerSvoip',
          customerTsvoip: 'customerTsvoip',
          ltiov: null,
          country: 'country',
          description: 'A description',
          justification: 'A wild justification appears!',
        },
        productName: null,
        completionDate: null,
        feedback: {
          rfiNum: 'id2',
          stars: 4,
          timeliness: 'Delivered On Time',
          quality: 'High Quality',
          missionImpact: 'Low Impact',
          comments: 'it sure was a product!',
        },
      }];

    let historicalRfis = HistoricalRfiDeserializer.deserialize(json);
    expect(historicalRfis[0].rfi.ltiov!.isSame(moment.utc('2020-11-20'), 'second')).toBeTruthy();
    expect(historicalRfis[0].rfi.rfiNum).toBe('id');
    expect(historicalRfis[0].rfi.getsUrl).toBe('getsUrl');
    expect(historicalRfis[0].rfi.status).toBe(RfiStatus.CLOSED);
    expect(historicalRfis[0].rfi.customerTitle).toBe('customerTitle');
    expect(historicalRfis[0].rfi.customerGivenName).toBe('customerGivenName');
    expect(historicalRfis[0].rfi.customerSurname).toBe('customerSurname');
    expect(historicalRfis[0].rfi.customerEmail).toBe('customerEmail');
    expect(historicalRfis[0].rfi.customerUnit).toBe('customerUnit');
    expect(historicalRfis[0].rfi.customerCommPhone).toBe('customerCommPhone');
    expect(historicalRfis[0].rfi.customerDsnPhone).toBe('customerDsnPhone');
    expect(historicalRfis[0].rfi.customerSvoip).toBe('customerSvoip');
    expect(historicalRfis[0].rfi.customerTsvoip).toBe('customerTsvoip');
    expect(historicalRfis[0].rfi.description).toBe('A description');
    expect(historicalRfis[0].rfi.justification).toBe('A wild justification appears!');
    expect(historicalRfis[0].rfi.country).toBe('country');
    expect(historicalRfis[0].rfi.priority).toBe(-1);
    expect(historicalRfis[0].rfi.tgtCount).toBe(-1);
    expect(historicalRfis[0].rfi.ixnCount).toBe(-1);
    expect(historicalRfis[0].rfi.startDate).toBe(undefined);
    expect(historicalRfis[0].rfi.completionDate!.isSame(moment.utc('2020-11-19'), 'second')).toBeTruthy();
    expect(historicalRfis[0].rfi.containsRejectedTracks).toBeFalsy();
    expect(historicalRfis[0].rfi.productName).toBe('product.kml');
    expect(historicalRfis[0].feedback).toBeNull();

    expect(historicalRfis[1].rfi.ltiov).toBe(undefined);
    expect(historicalRfis[1].rfi.priority).toBe(-1);
    expect(historicalRfis[1].rfi.startDate!.isSame(moment.utc('2020-12-13'), 'day')).toBeTruthy();
    expect(historicalRfis[1].rfi.completionDate).toBe(undefined);
    expect(historicalRfis[1].rfi.containsRejectedTracks).toBeFalsy();
    expect(historicalRfis[1].rfi.productName).toBeNull();
    expect(historicalRfis[1].feedback.stars).toBe(4);
    expect(historicalRfis[1].feedback.timeliness).toBe('Delivered On Time');
    expect(historicalRfis[1].feedback.quality).toBe('High Quality');
    expect(historicalRfis[1].feedback.missionImpact).toBe('Low Impact');
    expect(historicalRfis[1].feedback.comments).toBe('it sure was a product!');
  });
});

