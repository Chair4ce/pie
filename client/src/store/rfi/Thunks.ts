import RfiModel from './RfiModel';
import RfiPriorityPostModel from './RfiPriorityPostModel';
import { RfiSorter } from './RfiSorter';
import { Field, SortKeyModel } from '../sort/SortKeyModel';
import {
  fetchRfiPending, fetchRfiSuccess, fetchRfiUpdating, reprioritizeRfis, updateTgtRfiSuccess,
} from './Actions';
import { postProductDelete, postProductUndoDelete, postRfiPriorityUpdate } from './Api';

export const fetchRfis = () => {
  return (dispatch: any) => {
    return fetch('/api/rfi')
      .then(dispatch(fetchRfiPending()))
      .then(response => response.json())
      .then(rfis => dispatch(fetchRfiSuccess(rfis)))
      .catch((reason => console.log('Failed to fetch RFIs: ' + reason)));
  };
};

export const fetchLocalUpdate = () => {
  return (dispatch: any) => {
    return fetch('/api/rfi')
      .then(response => response.json())
      .then(rfis => dispatch(fetchRfiUpdating(rfis)))
      .catch((reason => console.log('Failed to fetch RFIs: ' + reason)));
  };
};

export const reorderRfis = (rfiList: RfiModel[], rfiId: string, newIndex: number, userName: string) => {
  //clone rfiList
  let reprioritizedList: RfiModel[] = Object.assign([], rfiList);

  //find the rfi by rfiNum
  let changingRfi = rfiList.find((rfi) => {
    return rfi.rfiNum === rfiId;
  });

  let originalPriority = changingRfi!.priority;
  let postRfis: RfiPriorityPostModel[] = [];

  //change everything after it
  if (newIndex + 1 < originalPriority) { //moving up
    for (let i = newIndex; i < originalPriority - 1; i++) {
      reprioritizedList[i].priority = reprioritizedList[i].priority + 1;
      postRfis.push(new RfiPriorityPostModel(reprioritizedList[i].rfiNum, reprioritizedList[i].priority));
    }
  } else { //moving down
    for (let i = originalPriority; i <= newIndex; i++) {
      reprioritizedList[i].priority = reprioritizedList[i].priority - 1;
      postRfis.push(new RfiPriorityPostModel(reprioritizedList[i].rfiNum, reprioritizedList[i].priority));
    }
  }

  //change its prio
  changingRfi!.priority = newIndex + 1;
  postRfis.push(new RfiPriorityPostModel(changingRfi!.rfiNum, changingRfi!.priority));

  //resort by new priority
  reprioritizedList = RfiSorter.sort(reprioritizedList, new SortKeyModel(Field.PRIORITY, true));

  //Try to post updates; if they are invalid, reload page instead
  return (dispatch: any) => {
    dispatch(reprioritizeRfis(reprioritizedList));
    postRfiPriorityUpdate(postRfis, `?userName=${userName}`)
      .then(response => response.json()).catch((reason) => {
      console.log(reason);
    })
      .then(success => {
        if (!success) {
          dispatch(fetchLocalUpdate());
        }
      });
  };
};

export const postProductUploadRfiPage = (data: FormData, rfiId: number, userName: string) => {
  return (dispatch: any) => {
    fetch(`api/product?rfiId=${rfiId}&userName=${userName}`,
          {
            method: 'post',
            body: data,
          })
      .then(response => dispatch(fetchLocalUpdate()))
      .catch(reason => console.log(`Upload failed: ${reason}`));
  };
};

export const postProductUpload = (data: FormData, rfiId: number, userName: string) => {
  return (dispatch: any) => {
    fetch(`api/product?rfiId=${rfiId}&userName=${userName}`,
          {
            method: 'post',
            body: data,
          })
      .then(response => dispatch(updateTgtRfi(rfiId)))
      .catch(reason => console.log(`Upload failed: ${reason}`));
  };
};


export const updateTgtRfi = (rfiId: number) => {
  return (dispatch: any) => {
    return fetch('/api/rfi')
      .then(response => response.json())
      .then(rfis => dispatch(updateTgtRfiSuccess(rfis, rfiId)))
      .catch((reason => console.log('Failed to fetch RFIs: ' + reason)))
      ;
  };
};

export const deleteProduct = (rfiId: number, userName: string) => {
  return (dispatch: any) => {
    return postProductDelete(rfiId, userName)
      .then(dispatch(fetchLocalUpdate()))
      .catch(reason => console.log('failed to delete product: ' + reason));
  };
};

export const undoDeleteProduct = (rfiId: number, userName: string) => {
  return (dispatch: any) => {
    return postProductUndoDelete(rfiId, userName)
      .then(dispatch(fetchLocalUpdate()))
      .catch(reason => console.log('failed to undo delete product: ' + reason));
  };
};
