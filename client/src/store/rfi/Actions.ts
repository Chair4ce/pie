import { RfiActionTypes } from './Types';
import { RfiDeserializer } from './RfiDeserializer';
import RfiModel from './RfiModel';
import { Field } from '../sort/SortKeyModel';
import { TgtActionTypes } from '../tgt';

export const loadSuccess = () => {
  return {type: RfiActionTypes.LOAD_SUCCESS};
};

export const sortRfis = (field: Field) => {
  return {type: RfiActionTypes.SORT_RFIS, field: field};
};

export const reprioritizeRfis = (reprioritizedList: RfiModel[]) => {
  return {
    type: RfiActionTypes.REPRIORITIZE_RFIS,
    reprioritizedList: reprioritizedList,
  };
};

export const fetchRfiPending = () => {
  return {
    type: RfiActionTypes.FETCH_RFI_PENDING,
  };
};

export const fetchRfiSuccess = (rfis: any) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  return {
    type: RfiActionTypes.FETCH_RFI_SUCCESS,
    rfis: rfiList,
  };
};

export const fetchRfiUpdating = (rfis: any) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  return {
    type: RfiActionTypes.FETCH_RFI_UPDATE,
    rfis: rfiList,
  };
};

export const loadUserMetricsPage = () => {
  return {
    type: RfiActionTypes.NAVIGATE_USER_METRICS_PAGE,
  };
};

export const exitUserMetricsPage = () => {
  return {
    type: RfiActionTypes.EXIT_USER_METRICS_PAGE,
  };
};

export const updateTgtRfiSuccess = (rfis: any, rfiId: number) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  let rfi = rfiList.find((rfi) => rfi.id === rfiId);
  if (rfi) {
    return {
      type: TgtActionTypes.UPDATE_RFI,
      rfi: rfi
    };
  } else {
    console.error(`Rfi with id ${rfiId} not found`);
    return {}
  }
};
