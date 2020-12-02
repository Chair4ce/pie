import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as moment from 'moment';
import { exitUserMetricsPage, loadUserMetricsPage, reorderRfis, RfiActionTypes } from '../../store/rfi';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiSorter } from '../../store/rfi/RfiSorter';

const fetch = require('jest-fetch-mock');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('RfiActions', () => {
  //Ignore .catch() logs
  console.log = jest.fn();

  let rfi1 = new RfiModel(1, '19-001', '', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '', moment.utc(
    '2019-12-01'), 'USA', 'hi', 'Just a fiction', 1, 0, 0, undefined, false, false, null);
  let rfi2 = new RfiModel(2, '19-004', '', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '', moment.utc(
    '2019-12-02'), 'CAN', 'hi', 'Just a fiction', 2, 0, 0, undefined, false, false, null);
  let rfi3 = new RfiModel(3, '19-003', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '',
                          undefined, 'MEX', 'hi', 'Just a fiction', 3, 0, 0, undefined, false, false, null);
  let rfi4 = new RfiModel(4, '19-007', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '',
                          undefined, 'MEX', 'hi', 'Just a fiction', 4, 0, 0, undefined, false, false, null);
  let rfi5 = new RfiModel(5, '19-009', '', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '',
                          undefined, 'MEX', 'hi', 'Just a fiction', 5, 0, 0, undefined, false, false, null);

  let rfiList = [rfi1, rfi2, rfi3, rfi4, rfi5];

  let reprioritizedList;

  const store = mockStore({openRfis: rfiList});

  it('should re-prioritize RFIs based on a drag and drop priority change', () => {
    //Mock response from backend as successful reprioritization
    // @ts-ignore
    fetch.mockResponse(JSON.stringify({PromiseValue: true})).resolves;

    // @ts-ignore
    store.dispatch(reorderRfis(rfiList, '19-004', 2));
    // @ts-ignore
    reprioritizedList = RfiSorter.sort(store.getState().openRfis, new SortKeyModel(Field.PRIORITY, true));
    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi2, rfi4, rfi5]);

    // @ts-ignore
    store.dispatch(reorderRfis(reprioritizedList, '19-007', 2));

    // @ts-ignore
    reprioritizedList = RfiSorter.sort(store.getState().openRfis, new SortKeyModel(Field.PRIORITY, true));
    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi4, rfi2, rfi5]);

    // @ts-ignore
    store.dispatch(reorderRfis(reprioritizedList, '19-009', 2));
    // @ts-ignore
    reprioritizedList = RfiSorter.sort(store.getState().openRfis, new SortKeyModel(Field.PRIORITY, true));
    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi5, rfi4, rfi2]);

    // @ts-ignore
    store.dispatch(reorderRfis(reprioritizedList, '19-001', 2));
    // @ts-ignore
    reprioritizedList = RfiSorter.sort(store.getState().openRfis, new SortKeyModel(Field.PRIORITY, true));
    expect(reprioritizedList).toEqual([rfi3, rfi5, rfi1, rfi4, rfi2]);
  });

  it('should return a proper navigate user metrics page object', () => {
    let action: any = loadUserMetricsPage();
    expect(action.type).toEqual(RfiActionTypes.NAVIGATE_USER_METRICS_PAGE);
  });

  it('should return a proper exit user metrics page object', () => {
    let action: any = exitUserMetricsPage();
    expect(action.type).toEqual(RfiActionTypes.EXIT_USER_METRICS_PAGE);
  });
});
