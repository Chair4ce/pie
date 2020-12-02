import * as moment from 'moment';
import { RfiDeserializer } from '../../store/rfi/RfiDeserializer';
import { RfiStatus } from '../../store/rfi/RfiModel';

describe('RFIDeserializer', () => {
  it('should turn backend response into RfiModel', () => {
    let json = [
      {
        rfiNum: 'id',
        getsUrl: 'getsUrl',
        status: 'NEW',
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
        priority: -1,
        tgtCount: 50,
        ixnCount: 5462789,
        completionDate: '2020-11-19T00:00:00.000+0000',
        containsRejectedTracks: false,
        productName: "product.kml",
      },
      {
        rfiNum: 'id',
        getsUrl: 'getsUrl',
        status: 'OPEN',
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
        priority: 7,
        tgtCount: 2,
        ixnCount: 0,
        completionDate: null,
        containsRejectedTracks: true,
        productName: null,
      }];

    let rfis = RfiDeserializer.deserialize(json);
    expect(rfis[0].ltiov!.isSame(moment.utc('2020-11-20'), 'second')).toBeTruthy();
    expect(rfis[0].rfiNum).toBe('id');
    expect(rfis[0].getsUrl).toBe('getsUrl');
    expect(rfis[0].status).toBe(RfiStatus.PENDING);
    expect(rfis[0].customerTitle).toBe('customerTitle');
    expect(rfis[0].customerGivenName).toBe('customerGivenName');
    expect(rfis[0].customerSurname).toBe('customerSurname');
    expect(rfis[0].customerEmail).toBe('customerEmail');
    expect(rfis[0].customerUnit).toBe('customerUnit');
    expect(rfis[0].customerCommPhone).toBe('customerCommPhone');
    expect(rfis[0].customerDsnPhone).toBe('customerDsnPhone');
    expect(rfis[0].customerSvoip).toBe('customerSvoip');
    expect(rfis[0].customerTsvoip).toBe('customerTsvoip');
    expect(rfis[0].description).toBe('A description');
    expect(rfis[0].justification).toBe('A wild justification appears!');
    expect(rfis[0].country).toBe('country');
    expect(rfis[0].priority).toBe(-1);
    expect(rfis[0].tgtCount).toBe(50);
    expect(rfis[0].ixnCount).toBe(5462789);
    expect(rfis[0].startDate).toBe(undefined);
    expect(rfis[0].completionDate!.isSame(moment.utc('2020-11-19'), 'second')).toBeTruthy();
    expect(rfis[0].containsRejectedTracks).toBeFalsy()
    expect(rfis[0].productName).toBe('product.kml')

    expect(rfis[1].ltiov).toBe(undefined);
    expect(rfis[1].priority).toBe(7);
    expect(rfis[1].startDate!.isSame(moment.utc('2020-12-13'), 'day')).toBeTruthy();
    expect(rfis[1].completionDate).toBe(undefined);
    expect(rfis[1].containsRejectedTracks).toBeTruthy()
    expect(rfis[1].productName).toBeNull()
  });
});

