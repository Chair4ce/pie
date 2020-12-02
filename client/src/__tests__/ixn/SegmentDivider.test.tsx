import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';
import { SegmentDivider } from '../../dashboard/ixn/table/SegmentDivider';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import { SnackbarProvider } from 'notistack';

describe('Segment Divider', () => {
  const moment = require('moment');
  let subject: ReactWrapper;
  let submitSegmentSpy: jest.Mock = jest.fn();
  let target: TargetModel = new TargetModel(1, 1, 1, 'SDT12-123', '12QWE1231231231', 'These are the notes',
                                            'This is a description', TargetStatus.NOT_STARTED, '', '', false);
  let segment: SegmentModel = new SegmentModel(1, 1, 1, 1,
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
  let deleteSegmentSpy: jest.Mock = jest.fn();
  console.log = jest.fn();

  beforeEach(() => {
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <SegmentDivider
          target={target}
          segment={segment}
          postSegment={submitSegmentSpy}
          postIxn={jest.fn()}
          deleteSegment={deleteSegmentSpy}
          cancelAddSegment={jest.fn()}
          hasIxns={false}
          editing={false}
          setEdit={jest.fn()}
          disabled={false}
          disableCancel={false}
          setEditingElement={jest.fn()}
          setSegmentChanged={jest.fn()}
        />
      </SnackbarProvider>,
    );
  });

  it('should display the segments given to it', () => {
    expect(subject.find('.segment-start').text()).toContain('12:34:56Z');
    expect(subject.find('.segment-end').text()).toContain('13:02:00Z');
  });

  it('should contain a delete and edit button that call functions appropriately', () => {
    expect(subject.find('.delete-segment').exists()).toBeTruthy();
    expect(subject.find('.edit-segment').exists()).toBeTruthy();
    subject.find('.delete-segment').at(0).simulate('click');
    expect(deleteSegmentSpy).toHaveBeenCalledWith(segment);
  });

  it('should contain a cancel button that calls a cancel function', () => {
    let editSpy: jest.Mock;
    editSpy = jest.fn();
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <SegmentDivider
          target={target}
          segment={segment}
          postSegment={submitSegmentSpy}
          postIxn={jest.fn()}
          deleteSegment={deleteSegmentSpy}
          cancelAddSegment={jest.fn()}
          hasIxns={false}
          editing={true}
          setEdit={editSpy}
          disabled={false}
          disableCancel={false}
          setEditingElement={jest.fn()}
          setSegmentChanged={jest.fn()}
        />
      </SnackbarProvider>,
    );

    subject.find('.cancel-add-segment').simulate('click');
    expect(editSpy).toHaveBeenCalledWith(-1);

    editSpy = jest.fn();
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <SegmentDivider
          target={target}
          segment={null}
          postSegment={submitSegmentSpy}
          postIxn={jest.fn()}
          deleteSegment={deleteSegmentSpy}
          cancelAddSegment={editSpy}
          hasIxns={false}
          editing={true}
          setEdit={jest.fn()}
          disabled={false}
          disableCancel={false}
          setEditingElement={jest.fn()}
          setSegmentChanged={jest.fn()}
        />
      </SnackbarProvider>,
    );

    subject.find('.cancel-add-segment').simulate('click');
    expect(editSpy).toHaveBeenCalled();
  });
});
