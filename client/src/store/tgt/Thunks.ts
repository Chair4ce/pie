import RfiModel from '../rfi/RfiModel';
import { ExploitDateModel } from './ExploitDateModel';
import { ExploitDateDeserializer } from './ExploitDateDeserializer';
import { ExploitDatePostModel } from './ExploitDatePostModel';

import { TargetPostModel } from './TargetPostModel';
import { fetchDatesAndTargetsSuccess, updateExploitDateSuccess, updateTgtSuccess } from './Actions';
import { postExploitDateDelete, postExploitDatesUpdate, postTarget, postTargetDelete, postTargetsDelete } from './Api';

export const fetchRfiTargets = (rfi: RfiModel, dates: ExploitDateModel[], firstLoad: boolean,
                                newExploitDateId: number) => {
  return (dispatch: any) => {
    return fetch('/api/targets?rfiId=' + rfi.id)
      .then(response => response.json())
      .then(targets => dispatch(fetchDatesAndTargetsSuccess(rfi, dates, targets, firstLoad, newExploitDateId)))
      .catch((reason => {
        console.log('Failed to fetch Targets: ' + reason);
      }));
  };
};

export const deleteExploitDate = (exploitDateId: number) => {
  return (dispatch: any) => {
    postExploitDateDelete(exploitDateId)
      .then(response => response.json())
      .then(dates => dispatch(updateExploitDateSuccess(ExploitDateDeserializer.deserialize(dates))))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const deleteTargets = (targets: TargetPostModel[], userName: string) => {
  return (dispatch: any) => {
    postTargetsDelete(targets, userName)
      .then(response => response.json())
      .then(tgts => dispatch(updateTgtSuccess(tgts)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const postExploitDate = (rfi: RfiModel, exploitDate: ExploitDatePostModel) => {
  if (exploitDate.exploitDateId === null) {
    return (dispatch: any) => {
      postExploitDatesUpdate(exploitDate)
        .then(response => response.json())
        .then(json => dispatch(loadTgtPage(rfi, false, json)))
        .catch((reason) => {
          console.log(reason);
        });
    };
  }
  return (dispatch: any) => {
    postExploitDatesUpdate(exploitDate)
      .then(response => dispatch(loadTgtPage(rfi, false)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const submitPostTargets = (targets: TargetPostModel[], rfi: RfiModel, userName: string, isCopy: boolean) => {
  return (dispatch: any) => {
    postTarget(targets, userName, isCopy)
      .then(response => dispatch(loadTgtPage(rfi, true)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const deleteTgt = (tgtId: number) => {
  return (dispatch: any) => {
    postTargetDelete(tgtId)
      .then(response => response.json())
      .then(tgts => dispatch(updateTgtSuccess(tgts)))
      .catch((reason) => {
        console.log('Error deleting target: ' + reason);
      });
  };
};

export const loadTgtPage = (rfi: RfiModel, firstLoad: boolean, newExploitDateId?: number) => {
  return (dispatch: any) => {
    return fetch('/api/targets/dates?rfiId=' + rfi.id)
      .then(response => response.json())
      .then(exploitDates => dispatch(
        fetchRfiTargets(
          rfi,
          ExploitDateDeserializer.deserialize(exploitDates),
          firstLoad,
          newExploitDateId ? newExploitDateId : -1,
        ),
      ))
      .catch(reason => {
        console.log('Failed to fetch exploit dates: ' + reason);
      });
  };
};
