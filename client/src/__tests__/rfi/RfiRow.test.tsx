import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiRow } from '../../dashboard/rfi/region/RfiRow';
import ExceedsLTIOVIcon from '../../resources/icons/ExceedsLTIOVIcon';

describe('RFIRow', () => {
  let subject: ShallowWrapper;
  const moment = require('moment');
  let rfi = new RfiModel(1, '2020-00123', 'google.com', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '',
                         '', moment('2019-11-20')
                           .utc(), 'CAN', 'hi', 'Just a fiction', 1, 12, 345, undefined, false, false, null);
  let selectSpy: jest.Mock;

  beforeEach(() => {
    selectSpy = jest.fn();
    subject = shallow(
      <RfiRow
        scrollRegionRef={React.createRef()}
        rfi={rfi}
        prioritizing={false}
        selected={false}
        selectRfi={selectSpy}
      />,
    );
  });

  it('should format an RFINUM to shorthand format', () => {
    expect(subject.find('.cell--rfi-num').text()).toBe('20-123');
  });

  it('should contain the RFI customerUnit', () => {
    expect(subject.find('.cell--customerUnit').text()).toBe('1 FW');
  });

  it('should contain the RFI LTIOV or dash', () => {
    expect(subject.find('.cell--ltiov').text()).toBe('20 NOV 19');

    let newRfi = {...rfi, ltiov: undefined};
    subject = shallow(
      <RfiRow
        scrollRegionRef={React.createRef()}
        rfi={newRfi}
        prioritizing={false}
        selected={false}
        selectRfi={selectSpy}
      />,
    );
    expect(subject.find('.cell--ltiov').text()).toBe('-');
  });

  it('should contain the RFI country code', () => {
    expect(subject.find('.cell--country').text()).toBe('CAN');
  });

  it('should display a hamburger only when prioritizing', () => {
    expect(subject.find('.cell--pri').at(0).hasClass('not-prioritizing')).toBeTruthy();
    subject = shallow(
      <RfiRow
        rfi={rfi}
        scrollRegionRef={{}}
        prioritizing={true}
        selected={false}
        selectRfi={selectSpy}
      />,
    );
    expect(subject.find('.cell--pri').at(0).hasClass('not-prioritizing')).toBeFalsy();
  });

  it('should display the number of tgts and ixns on open rows', () => {
    expect(subject.find('.cell--count').at(0).text()).toBe('12');
    expect(subject.find('.cell--count').at(1).text()).toBe('345');

    let newRfi = {...rfi, status: RfiStatus.PENDING};
    subject = shallow(
      <RfiRow
        rfi={newRfi}
        scrollRegionRef={jest.fn()}
        prioritizing
        selected={false}
        selectRfi={selectSpy}
      />,
    );

    expect(subject.find('.cell--count').at(0).text()).toBe('-');
    expect(subject.find('.cell--count').at(1).text()).toBe('-');
  });

  it('should call the given select RFI function on click', () => {
    subject.find('.rfi-row').simulate('click');
    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledWith(rfi.id);
  });

  it('should display a popover when the projected completion date exceeds the LTIOV and is not closed', () => {
    let exceedRfi = {...rfi, completionDate: rfi.ltiov + moment(1)};
    let closedRfi = {...rfi, status: RfiStatus.CLOSED};

    expect(subject.find('.popover--LTIOV').exists()).toBeFalsy();
    expect(subject.find(ExceedsLTIOVIcon).exists()).toBeFalsy();

    subject = shallow(
      <RfiRow
        rfi={closedRfi}
        scrollRegionRef={jest.fn()}
        prioritizing
        selected={false}
        selectRfi={selectSpy}
      />,
    );

    expect(subject.find('.popover--LTIOV').exists()).toBeFalsy();
    expect(subject.find(ExceedsLTIOVIcon).exists()).toBeFalsy();

    subject = shallow(
      <RfiRow
        rfi={exceedRfi}
        scrollRegionRef={jest.fn()}
        prioritizing
        selected={false}
        selectRfi={selectSpy}
      />,
    );

    expect(subject.find('.popover--LTIOV').exists()).toBeTruthy();
    expect(subject.find(ExceedsLTIOVIcon).exists()).toBeTruthy();
  });
});
