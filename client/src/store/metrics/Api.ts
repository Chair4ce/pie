import GetsClickRequestModel from './GetsClickRequestModel';
import SortClickRequestModel from './SortClickRequestModel';
import { TrackNarrativeClickModel } from './TrackNarrativeClickModel';
import { RollupClickModel } from './RollupClickModel';
import { ImportClickModel } from './ImportClickModel';

export const postSiteVisit = () => {
  return () => {
    return fetch('/api/metrics/visit-site',
                 {
                   method: 'post',
                 },
    ).catch((reason) => {
      console.log('Failed to post visit site metrics: ' + reason);
    });
  };
};

export const postGetsClick = (getsClickRequestModel: GetsClickRequestModel) => {
  return () => {
    return fetch('/api/metrics/click-gets',
                 {
                   method: 'post',
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                   },
                   body: JSON.stringify(getsClickRequestModel),
                 },
    ).catch((reason) => {
      console.log('Failed to post GETS click metrics: ' + reason);
    });
  };
};

export const postSortClick = (sortClickRequestModel: SortClickRequestModel) => {
  fetch('/api/metrics/click-sort',
        {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sortClickRequestModel),
        },
  ).catch((reason) => {
    console.log('Failed to post sort click metrics: ' + reason);
  });
};

export const postRefreshClick = () => {
  return () => {
    return fetch('/api/metrics/click-refresh',
                 {
                   method: 'post',
                 },
    ).catch((reason) => {
      console.log('Failed to post refresh click metrics: ' + reason);
    });
  };
};

export const postTrackNarrativeClick = (metric: TrackNarrativeClickModel) => {
  fetch('/api/metrics/click-track-narrative',
        {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metric),
        },
  ).catch((reason) => {
    console.log('Failed to post track narrative click: ' + reason);
  });
};

export const postRollupClick = (metric: RollupClickModel) => {
  fetch('/api/metrics/click-rollup',
        {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metric),
        },
  ).catch((reason) => {
    console.log('Failed to post rollup click: ' + reason);
  });
};

export const postImportClick = (metric: ImportClickModel) => {
  fetch('/api/metrics/click-import',
        {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metric),
        },
  ).catch((reason) => {
    console.log('Failed to post import click: ' + reason);
  });
};

export const postCollapseClick = (userName: string) => {
  return fetch(
    '/api/metrics/click-collapse',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: userName,
    },
  ).catch((reason) => {
    console.log('Failed to post collapse click: ' + reason);
  });
};

export const fetchMetric = (uri: string) => {
  return fetch('/api/metrics/' + uri,
               {
                 method: 'get',
               },
  );
};

export const fetchUserMetric = (uri: string, startDate: Date|null, endDate: Date|null) => {
  const moment = require('moment');
  return fetch('/api/metrics/' + uri + '?startDate=' + moment(startDate).format('MM/DD/YYYY') + '&endDate=' +
                 moment(endDate).format('MM/DD/YYYY'),
               {
                 method: 'get',
               },
  );
};
