import { SegmentModel } from './SegmentModel';
import IxnModel from './IxnModel';

export const postIxnDelete = (ixnId: number) => {
  return fetch('/api/ixn/' + ixnId,
               {
                 method: 'delete',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
               },
  ).catch((reason) => {
    console.log('Failed to delete ixn: ' + reason);
  });
};

export const postSegmentDelete = (segmentId: number) => {
  return fetch('/api/ixn/segment/' + segmentId,
               {
                 method: 'delete',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
               },
  ).catch((reason) => {
    console.log('Failed to delete segment: ' + reason);
  });
};

export const postSegment = (segment: SegmentModel) => {
  return fetch('/api/ixn/segment/post',
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(segment),
               },
  );
};

export const postIxn = (ixn: IxnModel, userName: string) => {
  return fetch('/api/ixn/post?userName=' + userName,
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(ixn),
               },
  ).catch((reason) => {
    console.log('Failed to post ixn: ' + reason);
  });
};

export const postCancelAddSegment = (targetId: number) => {
  return fetch('/api/metrics/cancel-add-segment/' + targetId,
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
               },
  ).catch((reason) => {
    console.log('Failed to cancel-add-segment metric: ' + reason);
  });
};
