import * as moment from 'moment';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiSorter } from '../../store/rfi/RfiSorter';


describe('RFISorter', () => {
  let rfiList: RfiModel[];
  let rfi1: RfiModel = new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '',
                                    moment.utc(
                                      '2019-12-01'), 'USA', 'hi', 'just', 3, 1, 3, undefined, false, false, null);
  let rfi2: RfiModel = new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '',
                                    '', undefined, 'MEX', 'hi', 'just', 1, 2, 1, undefined, false, false, null);
  let rfi3: RfiModel = new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '',
                                    '', moment.utc(
      '2019-12-02'), 'CAN', 'hi', 'just', 2, 3, 2, undefined, false, false, null);

  beforeEach(() => {
    rfiList = [
      rfi1,
      rfi3,
      rfi2,
    ];
  });

  it('should sort by RFI RFINUM ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, true))).toEqual(
      [
        rfi1,
        rfi2,
        rfi3,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, false))).toEqual(
      [
        rfi3,
        rfi2,
        rfi1,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, true))).toEqual(
      [
        rfi1,
        rfi3,
        rfi2,
      ]);
  });

  it('should sort by RFI customerUnit ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, true))).toEqual(
      [
        rfi1,
        rfi3,
        rfi2,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, false))).toEqual(
      [
        rfi2,
        rfi3,
        rfi1,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, true))).toEqual(
      [
        rfi1,
        rfi2,
        rfi3,
      ]);
  });

  it('should sort by Country ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.COUNTRY, true))).toEqual(
      [
        rfi3,
        rfi2,
        rfi1,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.COUNTRY, false))).toEqual(
      [
        rfi1,
        rfi2,
        rfi3,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, false))).toEqual(
      [
        rfi3,
        rfi2,
        rfi1,
      ]);
  });

  it('should sort by priority ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, true))).toEqual(
      [
        rfi2,
        rfi3,
        rfi1,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, false))).toEqual(
      [
        rfi1,
        rfi3,
        rfi2,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, false))).toEqual(
      [
        rfi3,
        rfi2,
        rfi1,
      ]);
  });

  it('should sort by Ltiov ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, true))).toEqual(
      [
        rfi1,
        rfi3,
        rfi2,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, false))).toEqual(
      [
        rfi2,
        rfi3,
        rfi1,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, true))).toEqual(
      [
        rfi1,
        rfi2,
        rfi3,
      ]);
  });

  it('should not sort closed', () => {
    rfiList = [
      new RfiModel(1, '19-001', '', undefined, RfiStatus.CLOSED, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'just', 3, 0, 0, undefined, false, false, null),
      new RfiModel(2, '19-004', '', undefined, RfiStatus.CLOSED, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'just', 2, 0, 0, undefined, false, false, null),
      new RfiModel(3, '19-003', '', undefined, RfiStatus.CLOSED, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'just', 1, 0, 0, undefined, false, false, null),
    ];
    let rfiListOriginal: RfiModel[] = Array.from(rfiList);

    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, false))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, true))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, false))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, true))).toEqual(rfiListOriginal);
  });

  it('should sort by tgt and ixn counts', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.TGTS, true))).toEqual(
      [
        rfi1,
        rfi2,
        rfi3,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.TGTS, false))).toEqual(
      [
        rfi3,
        rfi2,
        rfi1,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.IXNS, true))).toEqual(
      [
        rfi2,
        rfi3,
        rfi1,
      ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.IXNS, false))).toEqual(
      [
        rfi1,
        rfi3,
        rfi2,
      ]);
  });
});
