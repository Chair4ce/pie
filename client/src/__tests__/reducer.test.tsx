import 'isomorphic-fetch';
import { Field, SortKeyModel } from '../store/sort/SortKeyModel';
import { TargetModel, TargetStatus } from '../store/tgt/TargetModel';
import { ExploitDateModel } from '../store/tgt/ExploitDateModel';
import RfiModel, { RfiStatus } from '../store/rfi/RfiModel';
import { RfiActionTypes, rfiReducer } from '../store/rfi';
import { TgtActionTypes, tgtReducer } from '../store/tgt';
import { ixnReducer } from '../store/ixn/Reducer';
import { IxnActionTypes } from '../store/ixn';
import { SegmentModel } from '../store/ixn/SegmentModel';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../store/ixn/IxnModel';

const moment = require('moment');


describe('reducer', () => {
  let singleStatusRfiList: RfiModel[];
  let multiStatusRfiList: RfiModel[];
  let sortedById: RfiModel[];
  let reverseById: RfiModel[];
  let sortedByCustomer: RfiModel[];
  let reverseByCustomer: RfiModel[];
  let sortedByCountry: RfiModel[];
  let reverseByCountry: RfiModel[];
  let sortedByLtiov: RfiModel[];
  let reverseByLtiov: RfiModel[];

  let pendingRfi1: RfiModel;
  let pendingRfi2: RfiModel;
  let openRfi1: RfiModel;
  let openRfi2: RfiModel;
  let closedRfi1: RfiModel;

  //Ignore .catch() logs
  console.log = jest.fn();

  beforeEach(() => {
    pendingRfi1 =
      new RfiModel(1, '19-003', '', undefined, RfiStatus.PENDING, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'Just a fiction', -1, 0, 0, undefined, false, false, null);
    pendingRfi2 = new RfiModel(2, '19-004', '', undefined, RfiStatus.PENDING, '', '', '', '633 ABW', '', '', '', '', '',
                               moment.utc(
                                 '2019-12-02'), 'ALB', 'hi', 'Just a fiction', -1, 0, 0, undefined, false, false, null);
    openRfi1 =
      new RfiModel(3, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'Just a fiction', -1, 0, 0, undefined, false, false, null);
    openRfi2 =
      new RfiModel(4, '19-002', '', undefined, RfiStatus.OPEN, '', '', '', '2 FW', '', '', '', '', '', moment.utc(
        '2019-12-03'), 'JAP', 'hi', 'Just a fiction', -1, 0, 0, undefined, false, false, null);
    closedRfi1 = new RfiModel(5, '19-005', '', undefined, RfiStatus.CLOSED, '', '', '', '733 ABW', '', '', '', '', '',
                              moment.utc(
                                '2019-12-04'), 'CAN', 'hi', 'Just a fiction', -1, 0, 0, undefined, false, false, null);

    sortedById = [openRfi1, openRfi2, pendingRfi1, pendingRfi2, closedRfi1];
    reverseById = [openRfi2, openRfi1, pendingRfi2, pendingRfi1, closedRfi1];
    sortedByCustomer = [openRfi1, openRfi2, pendingRfi2, pendingRfi1, closedRfi1];
    reverseByCustomer = [openRfi2, openRfi1, pendingRfi1, pendingRfi2, closedRfi1];
    sortedByCountry = [openRfi2, openRfi1, pendingRfi2, pendingRfi1, closedRfi1];
    reverseByCountry = [openRfi1, openRfi2, pendingRfi1, pendingRfi2, closedRfi1];
    sortedByLtiov = [openRfi1, openRfi2, pendingRfi2, pendingRfi1, closedRfi1];
    reverseByLtiov = [openRfi2, openRfi1, pendingRfi1, pendingRfi2, closedRfi1];

    singleStatusRfiList = [
      new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'Just a fiction', 2, 0, 0, undefined, false, false, null),
      new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null),
      new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'Just a fiction', 3, 0, 0, undefined, false, false, null),
    ];
    multiStatusRfiList = [openRfi2, openRfi1, pendingRfi2, closedRfi1, pendingRfi1];
  });

  afterEach(() => {
    const check = () => {
      setTimeout(check, 2000); // check again in a second
    };
    check();
  });

  it('should handle FETCH_PENDING', () => {
    let mockAction = {
      type: RfiActionTypes.FETCH_RFI_PENDING,
    };

    expect(
      rfiReducer(undefined, mockAction),
    ).toEqual({
                rfis: [],
                sortKey: new SortKeyModel(Field.PRIORITY, true),
                pendingRfis: [],
                openRfis: [],
                closedRfis: [],
                loading: true,
                viewUserMetricsPage: false,
              });
  });

  it('should handle FETCH_SUCCESS', () => {
    let mockAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList,
    };

    let sortedRfis = [
      new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null),
      new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'Just a fiction', 2, 0, 0, undefined, false, false, null),
      new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'Just a fiction', 3, 0, 0, undefined, false, false, null),
    ];

    expect(
      rfiReducer(undefined, mockAction),
    ).toEqual({
                rfis: sortedRfis,
                sortKey: new SortKeyModel(Field.PRIORITY, true),
                pendingRfis: [],
                openRfis: sortedRfis,
                closedRfis: [],
                loading: true,
                viewUserMetricsPage: false,
              });
  });

  it('should handle NAVIGATE_TO_TGT_PAGE', () => {
    let rfi: RfiModel = new RfiModel(1, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '',
                                     '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null);
    let mockAction = {
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
      rfi: rfi,
      exploitDates: [],
      targets: [],
    };

    expect(tgtReducer(undefined, mockAction)).toEqual(
      {
        viewTgtPage: true,
        showDatePlaceholder: false,
        rfi: rfi,
        exploitDates: [],
        targets: [],
        addTgt: -1,
        editTgt: -1,
        highlight: false,
      });
  });

  it('should sort by rfiNum and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList,
    };
    let state = rfiReducer(undefined, setupRfis);
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.RFINUM};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(sortedById);
    expect(state.pendingRfis).toEqual([pendingRfi1, pendingRfi2]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.RFINUM, true));

    state = rfiReducer(state, sortAction);
    expect(state.rfis).toEqual(reverseById);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.RFINUM, false));
  });

  it('should sort by customer(Unit) and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList,
    };
    let state = rfiReducer(undefined, setupRfis);
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.CUSTOMER};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(sortedByCustomer);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.CUSTOMER, true));

    state = rfiReducer(state, sortAction);
    expect(state.rfis).toEqual(reverseByCustomer);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.CUSTOMER, false));
  });

  it('should sort by country and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList,
    };
    let state = rfiReducer(undefined, setupRfis);
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.COUNTRY};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(sortedByCountry);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi2, openRfi1]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.COUNTRY, true));

    state = rfiReducer(state, sortAction);
    expect(state.rfis).toEqual(reverseByCountry);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.COUNTRY, false));
  });

  it('should sort by ltiov and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList,
    };

    let state = rfiReducer(undefined, setupRfis);
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.LTIOV};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(sortedByLtiov);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.LTIOV, true));

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(reverseByLtiov);
    expect(state.pendingRfis).toEqual([pendingRfi1, pendingRfi2]);
    expect(state.openRfis).toEqual([openRfi2, openRfi1]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.LTIOV, false));
  });

  it('should sort by priority and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList,
    };

    let sortedRfis = [
      new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null),
      new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'Just a fiction', 2, 0, 0, undefined, false, false, null),
      new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'Just a fiction', 3, 0, 0, undefined, false, false, null),
    ];

    let reverseRfis = [
      new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'Just a fiction', 3, 0, 0, undefined, false, false, null),
      new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'Just a fiction', 2, 0, 0, undefined, false, false, null),
      new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null),
    ];

    let state = rfiReducer(undefined, setupRfis);
    expect(state.rfis).toEqual(sortedRfis);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.PRIORITY, true));

    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.PRIORITY};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(reverseRfis);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.PRIORITY, false));

  });

  it('should filter pending RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList,
    };

    let pendingRfis = rfiReducer(undefined, fetchRfisAction).pendingRfis;

    expect(pendingRfis.length).toBe(2);
    expect(pendingRfis).toContain(pendingRfi1);
    expect(pendingRfis).toContain(pendingRfi2);
  });

  it('should filter open RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList,
    };

    let openRfis = rfiReducer(undefined, fetchRfisAction).openRfis;

    expect(openRfis.length).toBe(2);
    expect(openRfis).toContain(openRfi1);
    expect(openRfis).toContain(openRfi2);
  });

  it('should filter closed RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList,
    };

    let closedRfis = rfiReducer(undefined, fetchRfisAction).closedRfis;

    expect(closedRfis.length).toBe(1);
    expect(closedRfis).toContain(closedRfi1);
  });

  it('should handle FETCH_UPDATE', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList,
    };
    let state = rfiReducer(undefined, setupRfis);

    //Priority update
    let newSingleStatusRfis = [
      new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'Just a fiction', 2, 0, 0, undefined, false, false, null),
      new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 3, 0, 0, undefined, false, false, null),
      new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null),
    ];

    //Sort by LTIOV; should stay sorted after update
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.LTIOV};
    state = rfiReducer(state, sortAction);

    let refreshRfis = {
      type: RfiActionTypes.FETCH_RFI_UPDATE,
      rfis: newSingleStatusRfis,
    };

    let sortedRfis = [
      new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'Just a fiction', 2, 0, 0, undefined, false, false, null),
      new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 3, 0, 0, undefined, false, false, null),
      new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null),
    ];

    expect(
      rfiReducer(state, refreshRfis),
    ).toEqual({
                rfis: sortedRfis,
                sortKey: new SortKeyModel(Field.LTIOV, true),
                pendingRfis: [],
                openRfis: sortedRfis,
                closedRfis: [],
                loading: true, viewUserMetricsPage: false,
              });
  });

  it('should handle LOAD_SUCCESS', () => {
    let mockAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList,
    };

    let sortedRfis = [
      new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null),
      new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
        '2019-12-01'), 'USA', 'hi', 'Just a fiction', 2, 0, 0, undefined, false, false, null),
      new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '', undefined,
                   'MEX', 'hi', 'Just a fiction', 3, 0, 0, undefined, false, false, null),
    ];

    let state = rfiReducer(undefined, mockAction);

    let mockAction2 = {
      type: RfiActionTypes.LOAD_SUCCESS,
    };

    expect(
      rfiReducer(state, mockAction2),
    ).toEqual(
      {
        rfis: sortedRfis,
        sortKey: new SortKeyModel(Field.PRIORITY, true),
        pendingRfis: [],
        openRfis: sortedRfis,
        closedRfis: [],
        loading: false,
        viewUserMetricsPage: false,
      });
  });

  it('should handle loadIxnPage', () => {
    let target = new TargetModel(1, 1, 1, 'TGT20-123', '00ABC1234567890', '', '', TargetStatus.NOT_STARTED, '', '',
                                 false);
    let segments = [
      new SegmentModel(1, 1, 1, 1, moment(123), moment(456)),
      new SegmentModel(2, 1, 1, 1, moment(567), moment(678)),
    ];
    let ixns = [
      new IxnModel(1, 1, 1, 1, 1, 'Billy Bob', moment(
        124), 'People have done a thing', '123-234', '', IxnStatus.NOT_STARTED, '', '', '',
                   IxnApprovalStatus.NOT_REVIEWED),
      new IxnModel(1, 1, 1, 1, 2, 'Billy Bob', moment(
        568), 'People have done another thing', '123-456', '', IxnStatus.NOT_STARTED, '', '', '',
                   IxnApprovalStatus.NOT_REVIEWED),
    ];

    let navToIxnPage = {
      type: IxnActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      segments: segments,
      dateString: '11/14/2020',
      ixns: ixns,
    };

    let state = ixnReducer(undefined, navToIxnPage);

    expect(state)
      .toEqual({
                 viewIxnPage: true,
                 target: target,
                 segments: segments,
                 dateString: '11/14/2020',
                 ixns: ixns,
                 autofocus: false,
                 addNote: -1,
                 addSegment: false,
                 editIxn: -1,
                 editSegment: -1,
                 highlight: -1,
               });

    let newSegments = [
      new SegmentModel(1, 1, 1, 1, moment(123), moment(456)),
      new SegmentModel(2, 1, 1, 1, moment(567), moment(789)),
    ];

    let newIxns = [
      new IxnModel(1, 1, 1, 1, 1, 'Billy Bob', moment(
        124), 'People have done a thing', '123-234', '', IxnStatus.NOT_STARTED, '', '', '',
                   IxnApprovalStatus.NOT_REVIEWED),
      new IxnModel(1, 1, 1, 1, 2, 'Billy Bob', moment(
        568), 'People have done another thing', '123-456', '', IxnStatus.NOT_STARTED, '', '', '',
                   IxnApprovalStatus.NOT_REVIEWED),
      new IxnModel(1, 1, 1, 1, 2, 'Billy Bob', moment(
        569), 'People have done a different thing', '123-456', '', IxnStatus.NOT_STARTED, '', '', '',
                   IxnApprovalStatus.NOT_REVIEWED),
    ];

    let reloadIxnPage = {
      type: IxnActionTypes.RELOAD_IXN_PAGE,
      segments: newSegments,
      ixns: newIxns,
    };

    state = ixnReducer(state, reloadIxnPage);

    expect(state)
      .toEqual({
                 viewIxnPage: true,
                 target: target,
                 segments: newSegments,
                 dateString: '11/14/2020',
                 ixns: newIxns,
                 addNote: -1,
                 addSegment: false,
                 autofocus: true,
                 editIxn: -1,
                 editSegment: -1,
                 highlight: -1,
                 newSegment: undefined,
               });
  });

  it('should handle EXIT_IXN_PAGE', () => {
    let target = new TargetModel(1, 1, 1, 'TGT20-123', '00ABC1234567890', '', '', TargetStatus.NOT_STARTED, '', '',
                                 false);
    let navToIxnPage = {
      type: IxnActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      dateString: '11/11/2011',
      segments: [],
      ixns: [],
    };

    let state = ixnReducer(undefined, navToIxnPage);
    let exitIxnPage = {
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
    };

    state = ixnReducer(state, exitIxnPage);

    expect(state).toEqual(
      {
        viewIxnPage: false,
        target: target,
        dateString: '11/11/2011',
        segments: [],
        ixns: [],
        autofocus: false,
        addNote: -1,
        addSegment: true,
        editIxn: -1,
        editSegment: -1,
        highlight: -1,
        newSegment: undefined,
      });
  });

  it('should handle UPDATE_TGT_SUCCESS', () => {
    let rfi: RfiModel = new RfiModel(1, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '',
                                     '', moment.utc(
        '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null);
    let exploitDate: ExploitDateModel = new ExploitDateModel(1, 1, moment.utc('2019-11-02'));
    let target = new TargetModel(1, 1, 1, 'TGT20-123', '00ABC1234567890', '', '', TargetStatus.NOT_STARTED, '', '',
                                 false);
    let navToTgtPage = {
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
      viewTgtPage: true,
      rfi: rfi,
      exploitDates: [exploitDate],
      targets: [target],
    };
    let state = tgtReducer(undefined, navToTgtPage);

    let deleteTgt = {
      type: TgtActionTypes.UPDATE_TGT_SUCCESS,
      targets: [],
    };

    state = tgtReducer(state, deleteTgt);

    expect(state).toEqual(
      {
        viewTgtPage: true,
        showDatePlaceholder: false,
        rfi: rfi,
        exploitDates: [exploitDate],
        targets: [],
        addTgt: -1,
        editTgt: -1,
        highlight: false,
      },
    );
  });

  it('should handle NAVIGATE_USER_METRICS_PAGE and EXIT_USER_METRICS_PAGE', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList,
    };
    let state = rfiReducer(undefined, setupRfis);

    let navToUserMetricsPage = {
      type: RfiActionTypes.NAVIGATE_USER_METRICS_PAGE,
    };
    state = rfiReducer(state, navToUserMetricsPage);

    expect(state.viewUserMetricsPage).toBeTruthy();

    let exitUserMetricsPage = {
      type: RfiActionTypes.EXIT_USER_METRICS_PAGE,
    };
    state = rfiReducer(state, exitUserMetricsPage);

    expect(state.viewUserMetricsPage).toBeFalsy();
  });
});
