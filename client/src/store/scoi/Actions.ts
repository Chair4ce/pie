import { ScoiActionTypes } from './Types';
import { ScoiModel } from './ScoiModel';

const loadScoiPageSuccess = (scois: ScoiModel[]) => {
  return {
    type: ScoiActionTypes.NAVIGATE_TO_SCOI_PAGE,
    scois: scois,

  };
};

export const exitScoiPage = () => {
  return {
    type: ScoiActionTypes.EXIT_SCOI_PAGE,
  };
};

export const editScoi = (scoiId: number) => {
  return {
    type: ScoiActionTypes.EDIT_SCOI,
    scoiId: scoiId,
  };
};

export const postScoi = (scoi: ScoiModel, userName: string) => {
  return fetch('/api/scoi?userName=' + userName,
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(scoi),
               },
  );
};

export const loadScoiPage = () => {
  return (dispatch: any) =>
    fetch('/api/scoi/all', {method: 'get'})
      .then(response => response.json())
      .then(resJson => dispatch(loadScoiPageSuccess(resJson)))
      .catch(error => console.log('Error loading Scoi page: ' + error));
};

export const postScoiUpdate = (scoi: ScoiModel, userName: string) => {
  return (dispatch: any) =>
    postScoi(scoi, userName)
      .then(response => dispatch(loadScoiPage()));
};
