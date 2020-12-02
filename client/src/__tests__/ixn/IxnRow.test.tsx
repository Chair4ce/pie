import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { IxnRow } from '../../dashboard/ixn/table/IxnRow';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../../store/ixn/IxnModel';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import { SnackbarProvider } from 'notistack';
import { Cookies } from 'react-cookie';

describe('IxnRow', () => {
  const moment = require('moment');
  console.log = jest.fn();
  console.error = jest.fn();
  const cookies = new Cookies();
  cookies.set('magpie', {username: 'Billy.B.Bob', segments: []});
  let subject: ReactWrapper;
  let ixn = new IxnModel(1, 1, 1, 1, 1, 'Billy Bob', moment(
    (5 * 3600 +
      30 * 60 +
      15) * 1000), 'Dudes did stuff', '123-234', '', IxnStatus.NOT_STARTED, '', '', '', IxnApprovalStatus.NOT_REVIEWED);

  let segment = new SegmentModel(1, 1, 1, 1,
                                 moment(
                                   (4 * 3600 +
                                     30 * 60 +
                                     15) * 1000),
                                 moment(
                                   (6 * 3600 +
                                     30 * 60 +
                                     15) * 1000),
  );
  let setInputNoteSpy: jest.Mock;

  beforeEach(() => {
    setInputNoteSpy = jest.fn();
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <IxnRow
          ixn={ixn}
          highlight={-1}
          segment={segment}
          postIxn={jest.fn()}
          deleteIxn={jest.fn()}
          tgtAnalyst={''}
          setTgtAnalyst={jest.fn()}
          setEditIxn={jest.fn()}
          addingOrEditing={false}
          dateString={'12DEC12'}
          userName={'billy'}
          setAddNote={setInputNoteSpy}
          disabled={false}
          readOnly={false}
        />
      </SnackbarProvider>,
    );
  });

  it('should display the info given to it', () => {
    expect(subject.find('.exploit-analyst').text()).toContain('Billy Bob');
    expect(subject.find('.time').text()).toContain('05:30:15Z');
    expect(subject.find('.activity').text()).toContain('Dudes did stuff');
    expect(subject.find('.track').text()).toContain('123-234');
  });

  it('should call the add ixn notes function', () => {
    expect(subject.find('.note-input').exists()).toBeFalsy();
    subject.find('.note-button').simulate('click');
    expect(setInputNoteSpy).toHaveBeenCalledWith(ixn.id);
  });

  it('should display accept / reject buttons and icons appropriately', () => {
    expect(subject.find('.approve-button').exists()).toBeFalsy();
    expect(subject.find('.reject-button').exists()).toBeFalsy();
    expect(subject.find('.approved-button').exists()).toBeFalsy();
    expect(subject.find('.reject-icon').exists()).toBeFalsy();

    ixn = {...ixn, status: IxnStatus.COMPLETED};
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <IxnRow
          ixn={ixn}
          segment={segment}
          postIxn={jest.fn()}
          deleteIxn={jest.fn()}
          tgtAnalyst={''}
          setTgtAnalyst={jest.fn()}
          setEditIxn={jest.fn()}
          addingOrEditing={false}
          dateString={'12DEC12'}
          userName={'billy'}
          setAddNote={setInputNoteSpy}
          disabled={false}
          readOnly={false}
          highlight={-1}
        />
      </SnackbarProvider>,
    );
    expect(subject.find('.approve-button').exists()).toBeTruthy();
    expect(subject.find('.reject-button').exists()).toBeTruthy();
    expect(subject.find('.approved-button').exists()).toBeFalsy();
    expect(subject.find('.reject-icon').exists()).toBeFalsy();

    ixn = {...ixn, approvalStatus: IxnApprovalStatus.APPROVED};
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <IxnRow
          ixn={ixn}
          segment={segment}
          postIxn={jest.fn()}
          deleteIxn={jest.fn()}
          tgtAnalyst={''}
          setTgtAnalyst={jest.fn()}
          setEditIxn={jest.fn()}
          addingOrEditing={false}
          dateString={'12DEC12'}
          userName={'billy'}
          setAddNote={setInputNoteSpy}
          disabled={false}
          readOnly={false}
          highlight={-1}
        />
      </SnackbarProvider>,
    );
    expect(subject.find('.approve-button').exists()).toBeFalsy();
    expect(subject.find('.reject-button').exists()).toBeFalsy();
    expect(subject.find('.approved-button').exists()).toBeTruthy();
    expect(subject.find('.reject-icon').exists()).toBeFalsy();

    ixn = {...ixn, status: IxnStatus.IN_PROGRESS, approvalStatus: IxnApprovalStatus.REJECTED};
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <IxnRow
          ixn={ixn}
          segment={segment}
          postIxn={jest.fn()}
          deleteIxn={jest.fn()}
          tgtAnalyst={''}
          setTgtAnalyst={jest.fn()}
          setEditIxn={jest.fn()}
          addingOrEditing={false}
          dateString={'12DEC12'}
          userName={'billy'}
          setAddNote={setInputNoteSpy}
          disabled={false}
          highlight={-1}
          readOnly={false}
        />
      </SnackbarProvider>,
    );
    expect(subject.find('.approve-button').exists()).toBeFalsy();
    expect(subject.find('.reject-button').exists()).toBeFalsy();
    expect(subject.find('.approved-button').exists()).toBeFalsy();
    expect(subject.find('.reject-icon').exists()).toBeTruthy();
  });
});
