import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { IxnAssociationModel } from '../../store/scoi/AssociationModels';
import { TrackAssociationBullet } from '../../dashboard/scoi/bullets/TrackAssociationBullet';


describe('Track Association Bullet', () => {

  it('should display the info properly with the emails separated by commas', () => {
    let subject: ShallowWrapper = shallow(
      <TrackAssociationBullet
        ixnAssociation={new IxnAssociationModel('Person entered SCOI', 'START\n\n12:00:00Z - Person entered SCOI\n\nSTOP')}
      />,
    );
    expect(subject.text()).toContain('Person entered SCOI');
    expect(subject.text()).not.toContain('START\n\n12:00:00Z - Person entered SCOI\n\nSTOP');
    subject.find('.callout').simulate('click');
    expect(subject.text()).toContain('START\n\n12:00:00Z - Person entered SCOI\n\nSTOP');
  });
});
