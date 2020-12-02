import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import IxnModel, { IxnApprovalStatus, IxnStatus } from '../../store/ixn/IxnModel';
import { MiniIxnRow } from '../../dashboard/ixn/rollup/MiniIxnRow';
import { RollupMode } from '../../dashboard/ixn/RollupView';

describe('Mini Ixn Row', () => {
  const moment = require('moment');
  let subject: ShallowWrapper;
  let ixn = new IxnModel(23, 1, 1, 1, 1, 'Billy Bob', moment(
    (5 * 3600 +
      30 * 60 +
      15) * 1000), 'Dudes did stuff', '123-234', '', IxnStatus.NOT_STARTED, '', '', '', IxnApprovalStatus.NOT_REVIEWED);

  beforeEach(() => {
    subject = shallow(
      <MiniIxnRow
        ixn={ixn}
        selected={false}
        select={jest.fn()}
        rollupMode={RollupMode.HOURLY_ROLLUP}
        readOnly={false}
      />,
    );
  });

  it('should display the info given to it', () => {
    expect(subject.find('.time').text()).toContain('05:30:15Z');
    expect(subject.find('.mini-activity').text()).toContain('Dudes did stuff');
  });

  it('should display a checkbox in all callouts mode', () => {
    expect(subject.find('.import-checkbox').exists()).toBeFalsy();
    subject = shallow(
      <MiniIxnRow
        ixn={ixn}
        selected={false}
        select={jest.fn()}
        rollupMode={RollupMode.ALL_CALLOUTS}
        readOnly={false}
      />,
    );
    expect(subject.find('.import-checkbox').exists()).toBeTruthy();
  });
});
