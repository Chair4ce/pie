import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../../store/ixn/IxnModel';
import { StyledIxnInputRow } from '../../dashboard/ixn/table/IxnInputRow';
import { StyledMiniSegmentDivider } from '../../dashboard/ixn/rollup/MiniSegmentDivider';
import { StyledMiniIxnRow } from '../../dashboard/ixn/rollup/MiniIxnRow';
import { MiniSegmentRegion } from '../../dashboard/ixn/rollup/MiniSegmentRegion';
import { RollupMode } from '../../dashboard/ixn/RollupView';

describe("Mini Segment Region", () => {
  const moment = require('moment');
  let subject: ShallowWrapper;
  let segment: SegmentModel = new SegmentModel(1, 1, 1, 1, moment(0), moment(1));
  let interactions: IxnModel[] = [
    new IxnModel(1, 1, 1, 1, 1, 'Bob', moment(
      0), 'Bob did stuff', '123-123', '', IxnStatus.NOT_STARTED, '', '', '', IxnApprovalStatus.NOT_REVIEWED),
    new IxnModel(2, 1, 1, 1, 1, 'Bob', moment(
      0), 'Bob did stuff', '123-123', '', IxnStatus.NOT_STARTED, '', '', '', IxnApprovalStatus.NOT_REVIEWED),
  ];
  subject = shallow(
    <MiniSegmentRegion
      segment={segment}
      ixns={interactions}
      rollupMode={RollupMode.ALL_CALLOUTS}
      selectedIxns={[]}
      select={jest.fn()}
      readOnly={false}
    />
  );

  it('should display the segment divider', () => {
    expect(subject.find(StyledMiniSegmentDivider).exists()).toBeTruthy();
    expect(subject.find(StyledMiniSegmentDivider).props().segment).toEqual(segment);
  });

  it('should display a ixn input row', () => {
    expect(subject.find(StyledMiniIxnRow).exists()).toBeTruthy();
  });

  it('should display the ixns given to it and an input row', () => {
    expect(subject.find(StyledMiniIxnRow).length).toEqual(2);
    expect(subject.find(StyledIxnInputRow).length).toEqual(0);
  });
});
