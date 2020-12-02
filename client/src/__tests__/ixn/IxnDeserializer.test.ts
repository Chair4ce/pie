import IxnModel, { IxnApprovalStatus } from '../../store/ixn/IxnModel';
import { IxnDeserializer } from '../../store/ixn/IxnDeserializer';

const moment = require('moment');

describe('IxnDeserializer', () => {
  it('should turn backend response into IxnModel', () => {
    let json = [
      {
        id: 1,
        rfiId: 1,
        exploitDateId: 1,
        targetId: 1,
        segmentId: 1,
        exploitAnalyst: 'Billy Bob',
        time: '1970-01-01T12:15:10.000+0000',
        activity: 'Person entered vehicle',
        track: '',
        approvalStatus: 'NOT_REVIEWED',
      },
      {
        id: 2,
        rfiId: 1,
        exploitDateId: 1,
        targetId: 1,
        segmentId: 1,
        exploitAnalyst: 'Billy Bob',
        time: '1970-01-01T12:15:55.000+0000',
        activity: '',
        track: '123-234',
        trackNarrative: 'Some things have happened',
        note: 'these are some notes',
        approvalStatus: 'REJECTED',
      },
    ];

    let ixns: IxnModel[] = IxnDeserializer.deserialize(json);
    expect(ixns[0].id).toEqual(1);
    expect(ixns[0].rfiId).toEqual(1);
    expect(ixns[0].exploitDateId).toEqual(1);
    expect(ixns[0].targetId).toEqual(1);
    expect(ixns[0].segmentId).toEqual(1);
    expect(ixns[0].exploitAnalyst).toEqual('Billy Bob');
    expect(ixns[0].time.isSame(moment(
      (12 * 3600 +
        15 * 60 +
        10
      ) * 1000,
    ).utc())).toBeTruthy();
    expect(ixns[0].activity).toEqual('Person entered vehicle');
    expect(ixns[0].track).toEqual('');
    expect(ixns[0].approvalStatus).toEqual(IxnApprovalStatus.NOT_REVIEWED);

    expect(ixns[1].id).toEqual(2);
    expect(ixns[1].rfiId).toEqual(1);
    expect(ixns[1].exploitDateId).toEqual(1);
    expect(ixns[1].targetId).toEqual(1);
    expect(ixns[1].segmentId).toEqual(1);
    expect(ixns[1].exploitAnalyst).toEqual('Billy Bob');
    expect(ixns[1].time.isSame(moment(
      (12 * 3600 +
        15 * 60 +
        55
      ) * 1000,
    ).utc())).toBeTruthy();
    expect(ixns[1].activity).toEqual('');
    expect(ixns[1].track).toEqual('123-234');
    expect(ixns[1].trackNarrative).toEqual('Some things have happened');
    expect(ixns[1].note).toEqual('these are some notes');
    expect(ixns[1].approvalStatus).toEqual(IxnApprovalStatus.REJECTED);
  });
});
