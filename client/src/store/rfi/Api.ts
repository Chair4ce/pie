import RfiPriorityPostModel from './RfiPriorityPostModel';
import RfiFeedbackModel from './RfiFeedbackModel';

export const postRfiPriorityUpdate = (rfis: RfiPriorityPostModel[], pathVars: string) => {
  return fetch('/api/rfi/update-priority' + pathVars,
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(rfis),
               },
  );
};

export const postRfiFeedback = (feedback: RfiFeedbackModel) => {
  return fetch('/api/rfi/feedback',
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(feedback),
               },
  )
    .then(response => response.status)
    .catch(reason => console.log(`Post feedback failed: ${reason}`))
    ;
};

export const postProductDelete = (rfiId: number, userName: string) => {
  return fetch(
    `/api/product/delete?rfiId=${rfiId}&userName=${userName}`,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const postProductUndoDelete = (rfiId: number, userName: string) => {
  return fetch(
    `/api/product/undo-delete?rfiId=${rfiId}&userName=${userName}`,
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};
