import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ScoreBoardContainer } from '../../dashboard/userMetrics/ScoreBoardContainer';

describe('UserMetricsDashboard', () => {
  console.log = jest.fn();

  it('should display user table', function () {
    let subject: ShallowWrapper = shallow(
      <ScoreBoardContainer/>
    );

    expect(subject.find('.scoreboard-body').exists()).toBeTruthy();
  });
});
