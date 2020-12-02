import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { TgtDateRegion } from '../../dashboard/tgt/table/TgtDateRegion';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';
import { StyledTgtRow } from '../../dashboard/tgt/table/TgtRow';
import { Status } from '../../dashboard/tgt/TgtDashboard';
import { StyledTgtInputRow } from '../../dashboard/tgt/table/TgtInputRow';

describe('Target Date Region', () => {
  const moment = require('moment');
  let subject: ShallowWrapper;
  let rfi = new RfiModel(1, 'DGS-SPC-2035-02335', 'www.spacejam.com', undefined, RfiStatus.OPEN, '', '', '',
                         'space forse', '', '', '', '', '', moment(
      '2019-11-20')
                           .utc(), 'USLT', 'Good morning starshine, the earth says hello', 'Just a fiction', 42, 0, 0, undefined, false, false,
                         null);
  let exploitDate = new ExploitDateModel(1, 1, moment(new Date));
  let targets: TargetModel[] =
    [
      new TargetModel(1, 1, 1, 'ASD12-123', '12QWE1231231231', '', '', TargetStatus.NOT_STARTED, '', '', false),
      new TargetModel(1, 1, 1, 'ASD12-124', '12QWE1231231232', '', '', TargetStatus.NOT_STARTED, '', '', false),
      new TargetModel(1, 1, 1, 'ASD12-125', '12QWE1231231233', '', '', TargetStatus.NOT_STARTED, '', '', false),
    ];
  let addEditSpy: jest.Mock;

  beforeEach(() => {
    addEditSpy = jest.fn();
    subject = shallow(
      <TgtDateRegion
        rfi={rfi}
        exploitDate={exploitDate}
        targets={targets}
        exploitDateDisplay={'MM/DD/YYYY'}
        addDate={false}
        setAddDate={(addDate: boolean) => {
        }}
        editTarget={-1}
        addTgt={-1}
        setAddEditTarget={addEditSpy}
        index={1}
        addingOrEditing={false}
        postTarget={jest.fn()}
        postExploitDate={jest.fn()}
        navigateToIxnPage={jest.fn()}
        deleteExploitDate={jest.fn()}
        deleteTgt={jest.fn()}
        disabled={false}
        highlight={false}
        setEditingElement={jest.fn()}
      />,
    );
  });

  it('should render the targets that are given to it', () => {
    expect(subject.find(StyledTgtRow).length).toBe(3);
  });

  it('should render an add target row appropriately', () => {
    subject = shallow(
      <TgtDateRegion
        rfi={rfi}
        exploitDate={exploitDate}
        targets={targets}
        exploitDateDisplay={'MM/DD/YYYY'}
        addDate={false}
        setAddDate={(addDate: boolean) => {
        }}
        editTarget={-1}
        addTgt={exploitDate.id} //adding target to this date region
        setAddEditTarget={addEditSpy}
        index={1}
        addingOrEditing={true}
        postTarget={jest.fn()}
        postExploitDate={jest.fn()}
        navigateToIxnPage={jest.fn()}
        deleteExploitDate={jest.fn()}
        deleteTgt={jest.fn()}
        disabled={false}
        highlight={false}
        setEditingElement={jest.fn()}
      />,
    );
    expect(subject.find(StyledTgtRow).length).toBe(3);
    expect(subject.find(StyledTgtInputRow).length).toBe(1);
  });

  it('should have an add target button that calls the add target function on click', () => {
    expect(subject.find('.add-tgt-button').exists()).toBeTruthy();
    expect(subject.find('.add-tgt-button-disabled').exists()).toBeFalsy();
    subject.find('.add-tgt-button').simulate('click');
    expect(addEditSpy).toHaveBeenCalledWith(Status.ADD, exploitDate.id);
  });

  it('should hide the add target button properly', () => {
    subject = shallow(
      <TgtDateRegion
        rfi={rfi}
        exploitDate={exploitDate}
        targets={targets}
        exploitDateDisplay={'MM/DD/YYYY'}
        addDate={false}
        setAddDate={(addDate: boolean) => {
        }}
        editTarget={-1}
        addTgt={exploitDate.id} //adding target to this date region
        setAddEditTarget={addEditSpy}
        index={1}
        addingOrEditing={true}
        postTarget={jest.fn()}
        postExploitDate={jest.fn()}
        navigateToIxnPage={jest.fn()}
        deleteExploitDate={jest.fn()}
        deleteTgt={jest.fn()}
        disabled={false}
        highlight={false}
        setEditingElement={jest.fn()}
      />,
    );
    expect(subject.find('.add-tgt-button').exists()).toBeFalsy();

    subject = shallow(
      <TgtDateRegion
        rfi={rfi}
        exploitDate={exploitDate}
        targets={targets}
        exploitDateDisplay={'MM/DD/YYYY'}
        addDate={false}
        setAddDate={(addDate: boolean) => {
        }}
        editTarget={5}
        addTgt={-1}
        setAddEditTarget={addEditSpy}
        index={1}
        addingOrEditing={true}
        postTarget={jest.fn()}
        postExploitDate={jest.fn()}
        navigateToIxnPage={jest.fn()}
        deleteExploitDate={jest.fn()}
        deleteTgt={jest.fn()}
        disabled={false}
        highlight={false}
        setEditingElement={jest.fn()}
      />,
    );
    subject.find('.add-tgt-button').simulate('.click');

    expect(addEditSpy).not.toHaveBeenCalled();
  });
});
