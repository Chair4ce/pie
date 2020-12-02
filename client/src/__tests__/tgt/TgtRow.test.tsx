import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { TgtRow } from '../../dashboard/tgt/table/TgtRow';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { Status } from '../../dashboard/tgt/TgtDashboard';
import { SnackbarProvider } from 'notistack';

describe('Target Row', () => {
  let subject: ReactWrapper;
  const moment = require('moment');
  let target: TargetModel = new TargetModel(1, 1, 3, '12-0001', '12QWE1231231231', 'These are the notes',
                                            'This is a description', TargetStatus.NOT_STARTED, '', '', false);
  let rfiTest = new RfiModel(1, 'DGS-SPC-2035-02335', 'www.spacejam.com', undefined, RfiStatus.OPEN, '', '', '',
                             'space forse', '', '', '', '', '', moment(
      '2019-11-20')
                               .utc(), 'USLT', 'Good morning starshine, the earth says hello', 'Just a fiction', 42, 0, 0, undefined, false, false,
                             null);
  let exploitDate = new ExploitDateModel(1, 1, moment('2019-11-20').utc());
  let deleteSpy: jest.Mock;
  let navToIxnPageSpy: jest.Mock;
  let setAddEditTargetSpy: jest.Mock;

  beforeEach(() => {
    deleteSpy = jest.fn();
    navToIxnPageSpy = jest.fn();
    setAddEditTargetSpy = jest.fn();

    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <TgtRow
          target={target}
          key={1}
          className={'class'}
          postTarget={jest.fn()}
          exploitDate={exploitDate}
          rfi={rfiTest}
          navigateToIxnPage={navToIxnPageSpy}
          deleteTgt={deleteSpy}
          setAddEditTarget={setAddEditTargetSpy}
          addingOrEditing={false}
          highlight={false}
        />
      </SnackbarProvider>,
    );
  });

  it('should display the data it is given', () => {
    expect(subject.find('.notes').at(0).text()).toContain('These are the notes');
    expect(subject.find('.description').at(0).text()).toContain('This is a description');
  });

  it('should call a navigate to interaction page test when the exploitation log button is clicked except in add mode',
     () => {
       subject.find('.exploitation').simulate('click');
       expect(navToIxnPageSpy).toBeCalledWith(target, '11/20/2019');
     });

  it('should make target row editable after double clicking them', () => {
    subject.find('.tgt-form').at(0).simulate('dblclick');
    expect(setAddEditTargetSpy).toHaveBeenCalledWith(Status.EDIT, target.id);
  });
});
