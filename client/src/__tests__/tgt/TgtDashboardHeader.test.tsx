import { mount, ReactWrapper } from 'enzyme';
import { TgtDashboardHeader } from '../../dashboard/tgt/TgtDashboardHeader';
import * as React from 'react';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { SnackbarProvider } from 'notistack';

describe('TgtDashboardHeader', () => {
  const moment = require('moment');
  let exitSpy: jest.Mock = jest.fn();
  let rfiTest: RfiModel = new RfiModel(1, 'DGS-SPC-2035-02335', 'www.spacejam.com', undefined, RfiStatus.OPEN, '', '',
                                       '', 'space forse', '', '', '', '', '', moment(
      '2019-11-20')
                                         .utc(), 'USLT', 'Good morning starshine, the earth says hello', 'Just a fiction', 42, 0, 0, undefined, false, false,
                                       null);
  let addDateSpy: jest.Mock;
  let subject: ReactWrapper;

  beforeEach(() => {
    addDateSpy = jest.fn();
    subject = mount(
      <SnackbarProvider>
        <TgtDashboardHeader
          exitTgtPage={exitSpy}
          rfi={rfiTest}
          editing={false}
          addDate={addDateSpy}
          disabled={false}
          displayHelperText={false}
          displayExploitDateHelper={false}
          displayCopyTargets={() => {
          }}
          handleShowProductModal={jest.fn}
        />
      </SnackbarProvider>);
  });

  it('should contain a clickable back button', () => {
    subject.find('.tgt-dash--header--back-button').simulate('click');
    expect(exitSpy).toHaveBeenCalled();
  });

  it('should have a clickable add date button except when disabled', () => {
    subject.find('.add-date-button').simulate('click');
    subject = mount(
      <SnackbarProvider>
        <TgtDashboardHeader
          exitTgtPage={exitSpy}
          rfi={rfiTest}
          editing={false}
          addDate={addDateSpy}
          disabled={true}
          displayHelperText={false}
          displayExploitDateHelper={false}
          displayCopyTargets={() => {
          }}
          handleShowProductModal={jest.fn}
        />
      </SnackbarProvider>);
    subject.find('.add-date-button').simulate('click');
    expect(addDateSpy).toHaveBeenCalledTimes(1);
  });

  it('should display helper text appropriately', () => {
    expect(subject.text()).not.toContain('Add additional coverage dates');
    subject = mount(
      <SnackbarProvider>
        <TgtDashboardHeader
          exitTgtPage={exitSpy}
          rfi={rfiTest}
          editing={false}
          addDate={addDateSpy}
          disabled={false}
          displayHelperText={true}
          displayExploitDateHelper={false}
          displayCopyTargets={() => {
          }}
          handleShowProductModal={jest.fn}
        />
      </SnackbarProvider>);
    expect(subject.find('.header-helper-text').text()).toContain('Add additional coverage dates');
  });
});
