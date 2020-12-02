import { TargetPostModel } from '../tgt/TargetPostModel';
import { postTarget } from '../tgt';
import { TargetModel } from '../tgt/TargetModel';
import { SegmentDeserializer } from './SegmentDeserializer';
import { SegmentModel } from './SegmentModel';
import IxnModel from './IxnModel';
import { IxnDeserializer } from './IxnDeserializer';
import { loadIxnPage } from './Actions';
import { postIxn, postIxnDelete, postSegment, postSegmentDelete } from './Api';

export const saveRollup = (newTarget: TargetPostModel, dateString: string, userName: string) => {
  return (dispatch: any) => {
    postTarget([newTarget], userName)
      .then(response => fetch('/api/targets?rfiId=' + newTarget.rfiId))
      .then(response => response.json())
      .then((targets: TargetModel[]) => dispatch(navigateToIxnPage(targets.find((target) => target.id ===
        newTarget.targetId)!, dateString)))
      .catch((reason => {
        console.log(reason);
      }));
  };
};

export const navigateToIxnPage = (target: TargetModel, dateString: string) => {
  return (dispatch: any) => {
    fetchSegments(target.id)
      .then(segments => dispatch(
        fetchIxns(target.id, target, dateString, SegmentDeserializer.deserialize(segments), false)))
      .catch((reason => {
        console.log(reason);
      }));
  };
};

export const updateSegment = (segment: SegmentModel) => {
  let newSegment: SegmentModel|undefined;
  return (dispatch: any) => {
    postSegment(segment)
      .then(response => response.json())
      .then(newSegmentResponse => {
        if (newSegmentResponse) {
          newSegment = SegmentDeserializer.deserialize(newSegmentResponse)[0];
          return fetchSegments(segment.targetId);
        } else {
          return fetchSegments(segment.targetId);
        }
      })
      .then(
        segments => dispatch(fetchIxns(segment.targetId, null, null, SegmentDeserializer.deserialize(segments), false,
                                       newSegment)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const updateIxn = (ixn: IxnModel, userName: string, isNewIxn?: boolean) => {
  return (dispatch: any) => {
    postIxn(ixn, userName)
      .then(response => fetchSegments(ixn.targetId))
      .then(
        segments => dispatch(
          fetchIxns(ixn.targetId, null, null, SegmentDeserializer.deserialize(segments), false, undefined, isNewIxn)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const fetchSegments = (targetId: number) => {
  return fetch('/api/ixn/segment/' + targetId)
    .then(response => response.json())
    .catch((reason => {
      console.log(reason);
    }));
};

export const fetchIxns = (targetId: number, target: TargetModel|null, dateString: string|null, segments: SegmentModel[],
                          isLocalUpdate: boolean, newSegment?: SegmentModel, isNewIxn?: boolean) => {
  return (dispatch: any) => {
    return fetch('/api/ixn/' + targetId)
      .then(response => response.json())
      .then(ixns => dispatch(loadIxnPage(target, dateString, segments, IxnDeserializer.deserialize(ixns), isLocalUpdate,
                                         newSegment, isNewIxn)))
      .catch((reason => {
        console.log(reason);
      }));
  };
};

export const deleteIxn = (ixn: IxnModel) => {
  return (dispatch: any) => {
    return postIxnDelete(ixn.id!)
      .then(response => fetchSegments(ixn.targetId))
      .then(segments => dispatch(fetchIxns(ixn.targetId, null, null, SegmentDeserializer.deserialize(segments), false)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const deleteSegment = (segment: SegmentModel) => {
  return (dispatch: any) => {
    return postSegmentDelete(segment.id!)
      .then(response => fetchSegments(segment.targetId))
      .then(
        segments => dispatch(fetchIxns(segment.targetId, null, null, SegmentDeserializer.deserialize(segments), false)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};
