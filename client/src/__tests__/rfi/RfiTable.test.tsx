import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import { StyledRfiTableHeader } from '../../dashboard/rfi/rfiDashboardTableHeader/RfiTableHeader';
import { RfiTable } from '../../dashboard/rfi/RfiTable';

describe('RFI table', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RfiTable
        pendingRfis={[]}
        openRfis={[]}
        closedRfis={[]}
        reorderRfis={jest.fn()}
        sortKey={new SortKeyModel(Field.RFINUM, true)}
        selectRfi={jest.fn()}
        selectedRfiId={1}
        sortRfis={jest.fn()}
      />
    );
  });

  it('should display a header', () => {
    expect(subject.find(StyledRfiTableHeader).exists()).toBeTruthy();
  });

  it('should contain three droppable regions for RFIs', () => {
    expect(subject.find(Droppable).length).toBe(3);
  });
});
