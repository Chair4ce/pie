import RfiModel, { RfiStatus } from './RfiModel';
import { Field, SortKeyModel } from '../sort/SortKeyModel';

export class RfiSorter {
  static sort = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
      let open: RfiModel[] = rfis.filter(rfi => rfi.status === RfiStatus.OPEN);
      let pending: RfiModel[] = rfis.filter(rfi => rfi.status === RfiStatus.PENDING);
      let closed: RfiModel[] = rfis.filter(rfi => rfi.status === RfiStatus.CLOSED);
      let newOpen: RfiModel[];
      let newPending: RfiModel[];
      switch (sortKey.field) {
        case Field.RFINUM:
          newOpen = sortNum(open);
          newPending = sortNum(pending);
          break;
        case Field.CUSTOMER:
          newOpen = sortCustomer(open);
          newPending = sortCustomer(pending);
          break;
        case Field.LTIOV:
          newOpen = sortLtiov(open);
          newPending = sortLtiov(pending);
          break;
        case Field.START:
          newOpen = sortStartDate(open);
          newPending = sortStartDate(pending);
          break;
        case Field.COUNTRY:
          newOpen = sortCountry(open);
          newPending = sortCountry(pending);
          break;
        case Field.TGTS:
          newOpen = sortTgts(open);
          newPending = sortTgts(pending);
          break;
        case Field.IXNS:
          newOpen = sortIxns(open);
          newPending = sortIxns(pending);
          break;
        default:
          newOpen = sortPriority(open);
          newPending = sortPriority(pending);
          break;
      }
      if (!sortKey.defaultOrder) {
        newOpen = newOpen.reverse();
        newPending = newPending.reverse();
      }
      return newOpen.concat(newPending).concat(closed);
    }
    return [];
  };
}

function sortPriority(rfis: RfiModel[]) {
  return rfis.sort((a, b) => {
    return a.priority === b.priority ? 0 : a.priority < b.priority ? -1 : 1;
  });
}

function sortNum(rfis: RfiModel[]) {
  return rfis.sort((a, b) => {
    return a.rfiNum === b.rfiNum ? 0 : a.rfiNum < b.rfiNum ? -1 : 1;
  });
}

function sortCustomer(rfis: RfiModel[]) {
  return rfis.sort((a, b) => {
    return a.customerUnit === b.customerUnit ? 0 : a.customerUnit < b.customerUnit ? -1 : 1;
  });
}

function sortCountry(rfis: RfiModel[]) {
  return rfis.sort((a, b) => {
    return a.country === b.country ? 0 : a.country < b.country ? -1 : 1;
  });
}

function sortTgts(rfis: RfiModel[]) {
  return rfis.sort((a, b) => {
    return a.tgtCount === b.tgtCount ? 0 : a.tgtCount < b.tgtCount ? -1 : 1;
  });
}

function sortIxns(rfis: RfiModel[]) {
  return rfis.sort((a, b) => {
    return a.ixnCount === b.ixnCount ? 0 : a.ixnCount < b.ixnCount ? -1 : 1;
  });
}

function sortLtiov(rfis: RfiModel[]) {
  return rfis.sort((a, b) => {
    if (a.ltiov === b.ltiov) {
      return 0;
    }
    if (a.ltiov === undefined) {
      return 1;
    }
    if (b.ltiov === undefined) {
      return -1;
    }
    return a.ltiov.valueOf() < b.ltiov.valueOf() ? -1 : 1;
  });
}

function sortStartDate(rfis: RfiModel[]) {
  return rfis.sort((a, b) => {
    if (a.startDate === b.startDate) {
      return 0;
    }
    if (a.startDate === undefined) {
      return 1;
    }
    if (b.startDate === undefined) {
      return -1;
    }
    return a.startDate.valueOf() < b.startDate.valueOf() ? -1 : 1;
  });
}
