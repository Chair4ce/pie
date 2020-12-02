import { ExploitDatePostModel } from './ExploitDatePostModel';
import { TargetPostModel } from './TargetPostModel';

export const postExploitDateDelete = (exploitDateId: number) => {
  return fetch(
    '/api/targets/dates/delete?exploitDateId=' + exploitDateId,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const postExploitDatesUpdate = (exploitDate: ExploitDatePostModel) => {
  return fetch(
    '/api/targets/dates/post',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exploitDate),
    },
  );
};

export const postTargetDelete = (tgtId: number) => {
  return fetch(
    '/api/targets/delete?targetId=' + tgtId,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const postTargetsDelete = (targets: TargetPostModel[], userName: string) => {
  return fetch(
    '/api/targets/delete-targets?userName=' + userName,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(targets),
    },
  );
};

export const postTarget = (targets: TargetPostModel[], userName: string, isCopy?: boolean) => {
  return fetch(
    '/api/targets/post?userName=' + userName + (isCopy ? '&isCopy=true' : ''),
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(targets),
    },
  ).catch((reason) => {
    console.log('Failed to post target: ' + reason);
  });
};
