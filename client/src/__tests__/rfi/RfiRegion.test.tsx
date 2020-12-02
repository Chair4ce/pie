import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiRegion } from '../../dashboard/rfi/region/RfiRegion';
import { StyledRfiRegionDivider } from '../../dashboard/rfi/region/RfiRegionDivider';
import { RfiRow } from '../../dashboard/rfi/region/RfiRow';

describe('Region', () => {
  let rows: any[];
  let subject: ShallowWrapper;

  beforeEach(() => {
    const moment = require('moment');
    rows = [
      <RfiRow
        rfi={new RfiModel(1, '19-001', 'url', undefined, RfiStatus.OPEN, '', '', '', '1 FW', '', '', '', '', '',
                          moment('2019-12-01')
                            .utc(), 'USA', 'hi', 'Just a fiction', -1, 0, 0, undefined, false, false, null)}
        key={'1'}
        scrollRegionRef={{}}
        index={0}
        selected={false}
        selectRfi={jest.fn()}
      />,
      <RfiRow
        rfi={new RfiModel(2, '19-004', 'url', undefined, RfiStatus.OPEN, '', '', '', '633 ABW', '', '', '', '', '',
                          moment('2019-12-02')
                            .utc(), 'CAN', 'hi', 'Just a fiction', -1, 0, 0, undefined, false, false, null)}
        key={'2'}
        scrollRegionRef={{}}
        index={1}
        selected={false}
        selectRfi={jest.fn()}
      />,
      <RfiRow
        rfi={new RfiModel(3, '19-003', 'url', undefined, RfiStatus.OPEN, '', '', '', 'HQ ACC', '', '', '', '', '',
                          undefined, 'MEX', 'hi', 'Just a fiction', -1, 0, 0, undefined, false, false, null)}
        key={'3'}
        scrollRegionRef={{}}
        index={2}
        selected={false}
        selectRfi={jest.fn()}
      />,
    ];
    subject = shallow(
      <RfiRegion
        title={'title'}
        emptyMessage={'empty'}
        provided={{innerRef: 0}}
      >
        {rows}
      </RfiRegion>,
    );
  });

  it('should display a divider', () => {
    expect(subject.find(StyledRfiRegionDivider).exists()).toBeTruthy();
  });

  it('should present all given rows', () => {
    expect(subject.find(RfiRow).length).toBe(3);
  });

  it('should display a message when there are no rows', () => {
    let emptyMessage = 'Congratulations! Your team opened all the new RFIs in GETS.';
    expect(subject.text()).not.toContain(emptyMessage);

    subject = shallow(
      <RfiRegion
        title={'title'}
        emptyMessage={emptyMessage}
        provided={{innerRef: 0}}
      />,
    );
    expect(subject.text()).toContain(emptyMessage);
  });
});
