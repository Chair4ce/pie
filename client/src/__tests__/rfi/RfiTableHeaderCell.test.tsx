import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import { RfiTableHeaderCell } from '../../dashboard/rfi/rfiDashboardTableHeader/RfiTableHeaderCell';
import SortButtonVector from '../../resources/icons/SortButtonVector';

describe('HeaderCell', () => {
  let subject: ShallowWrapper;
  let sortSpy: jest.Mock;

  beforeEach(() => {
    sortSpy = jest.fn();
    subject = shallow(
      <RfiTableHeaderCell
        text={'title'}
        sort={sortSpy}
        sortKey={new SortKeyModel(Field.PRIORITY, true)}
        field={Field.PRIORITY}
      />
    );
  });

  it('should display given text', () => {
    expect(subject.text()).toContain('title');
  });

  it('should call the given sorting function on click', () => {
    subject.simulate('click');
    expect(sortSpy).toHaveBeenCalled();
  });

  it('should display appropriate sort icons when order is different', () => {
    expect(subject.find(SortButtonVector).at(0).prop('ascending')).toBe(true);
    expect(subject.find(SortButtonVector).at(0).prop('active')).toBe(true);
    expect(subject.find(SortButtonVector).at(1).prop('ascending')).toBe(false);
    expect(subject.find(SortButtonVector).at(1).prop('active')).toBe(false);
    subject = shallow(
      <RfiTableHeaderCell
        text={'title'}
        sort={sortSpy}
        sortKey={new SortKeyModel(Field.PRIORITY, false)}
        field={Field.PRIORITY}
      />
    );
    expect(subject.find(SortButtonVector).at(0).prop('ascending')).toBe(true);
    expect(subject.find(SortButtonVector).at(0).prop('active')).toBe(false);
    expect(subject.find(SortButtonVector).at(1).prop('ascending')).toBe(false);
    expect(subject.find(SortButtonVector).at(1).prop('active')).toBe(true);
  });
});
