import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScoreBoardMetricModel } from '../../store/metrics/ScoreBoardMetricModel';
import { fetchMetric } from '../../store/metrics';
import classNames from 'classnames';

interface MyProps {
  className?: string;
}

export const ScoreBoardContainer: React.FC<MyProps> = (props) => {
  const [scoreBoardMetrics, setScoreBoardMetrics] = useState([] as ScoreBoardMetricModel[]);

  function sortByAscendingRating(ratings: ScoreBoardMetricModel[]) {
    return ratings.sort(function (a, b) {
      return a.approvalRating > b.approvalRating ? -1 : 1;
    });
  }

  useEffect(() => {
    fetchMetric('approval-ratings')
      .then(response => response.json())
      .then(ratings => setScoreBoardMetrics(ratings))
      .catch((reason) => {
        console.log('Failed to fetch approval Ratings: ' + reason);
      });
  });

  return (
    <div itemType={'container'} className={classNames('scoreboard', props.className)}>
      <header className={'scoreboard-header'}>
        <div className={'rank-column-title'}>
          <h4>
            Rank
          </h4>
        </div>
        <div className={'rating-column-title'}>
          <h4>
            Approval Rating
          </h4>
        </div>
      </header>
      <div className={'scoreboard-body'}>
        {scoreBoardMetrics.length > 0 ? sortByAscendingRating(scoreBoardMetrics)
          .map((row: any, index: number) =>
                 <div className={'scoreboard-row'}
                      key={index}>
                   <div
                     className={'row-background'}>
                     <div
                       className={'rank-background'}>
                       <div
                         className={'user-rank'}>{index +
                       1}</div>
                     </div>
                     <div
                       className={'user-name'}> {row.userName}</div>
                     <div
                       className={'approval-rating'}>{row.approvalRating}%
                     </div>
                   </div>
                 </div>) : ''}
      </div>
      <div className={'bottom-cap'}/>
    </div>
  );
};
