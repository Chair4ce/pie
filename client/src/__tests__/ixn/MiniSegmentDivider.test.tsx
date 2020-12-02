import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import { MiniSegmentDivider } from '../../dashboard/ixn/rollup/MiniSegmentDivider';

describe('Mini Segment Divider', () => {
  const moment = require('moment');
  let subject: ShallowWrapper;
  let segment: SegmentModel = new SegmentModel(
    1, 1, 1, 1,
    moment.unix(
      12 * 3600 + //HH
      34 * 60 + //MM
      56, //SS
    ).utc(),
    moment.unix(
      13 * 3600 + //HH
      2 * 60 //MM
      , //SS
    ).utc(),
  );

  beforeEach(() => {
    subject = shallow(
      <MiniSegmentDivider
        segment={segment}
      />,
    );
  });

  it('should display the segments given to it', () => {
    expect(subject.find('.segment-start').text()).toContain('12:34:56Z');
    expect(subject.find('.segment-end').text()).toContain('13:02:00Z');
  });
});
