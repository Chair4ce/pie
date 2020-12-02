import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import { SegmentRegion } from '../../dashboard/ixn/table/SegmentRegion';
import { StyledSegmentDivider } from '../../dashboard/ixn/table/SegmentDivider';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../../store/ixn/IxnModel';
import { StyledIxnRow } from '../../dashboard/ixn/table/IxnRow';
import { StyledIxnInputRow } from '../../dashboard/ixn/table/IxnInputRow';

describe("Segment Region", () => {
  const moment = require('moment');
  let subject: ShallowWrapper;
  let target: TargetModel = new TargetModel(1, 1, 1, 'WER19-123', '19XCV1234567890', '', '', TargetStatus.NOT_STARTED,
                                            '', '', false);
  let segment: SegmentModel = new SegmentModel(1, 1, 1, 1, moment(0), moment(1));
  let interactions: IxnModel[] = [
    new IxnModel(1, 1, 1, 1, 1, 'Bob', moment(
      0), 'Bob did stuff', '123-123', '', IxnStatus.NOT_STARTED, '', '', '', IxnApprovalStatus.NOT_REVIEWED),
    new IxnModel(2, 1, 1, 1, 1, 'Bob', moment(
      0), 'Bob did stuff', '123-123', '', IxnStatus.NOT_STARTED, '', '', '', IxnApprovalStatus.NOT_REVIEWED),
  ];
  subject = shallow(
    <SegmentRegion
      target={target}
      segment={segment}
      ixns={interactions}
      postSegment={jest.fn()}
      postIxn={jest.fn()}
      deleteIxn={jest.fn()}
      tgtAnalyst={''}
      setTgtAnalyst={jest.fn()}
      deleteSegment={jest.fn()}
      cancelAddSegment={jest.fn()}
      editSegment={-1}
      setEditSegment={jest.fn()}
      editIxn={-1}
      setEditIxn={jest.fn()}
      addingOrEditing={false}
      autofocus={false}
      collapsed={false}
      setCollapsed={jest.fn()}
      dateString={'12DEC12'}
      userName={'billy'}
      addNote={-1}
      setAddNote={jest.fn()}
      readOnly={false}
      setEditingElement={jest.fn()}
      setSegmentChanged={jest.fn()}
      setIxnChanged={jest.fn()}
      highlight={-1}
    />
  );

  it('should display the segment divider', () => {
    expect(subject.find(StyledSegmentDivider).exists()).toBeTruthy();
    expect(subject.find(StyledSegmentDivider).props().segment).toEqual(segment);
  });

  it('should display a ixn input row', () => {
    expect(subject.find(StyledIxnRow).exists()).toBeTruthy();
  });

  it('should display the ixns given to it and an input row', () => {
    expect(subject.find(StyledIxnRow).length).toEqual(2);
    expect(subject.find(StyledIxnInputRow).length).toEqual(1);
  });
});
