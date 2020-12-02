import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TgtAssociationBullet } from '../../dashboard/scoi/bullets/TgtAssociationBullet';
import { TgtAssociationModel } from '../../store/scoi/AssociationModels';

describe('Tgt Association Bullet', () => {

  it('should display the info properly with the emails separated by commas', () => {
    let subject: ShallowWrapper = shallow(
      <TgtAssociationBullet
        tgtAssociation={new TgtAssociationModel('20-0001', '12WQE1234567890',
                                                [])}
      />,
    );
    expect(subject.text()).toContain('20-0001');
    expect(subject.text()).toContain('12WQE1234567890');
    expect(subject.text()).not.toContain('POC:');

    subject = shallow(
      <TgtAssociationBullet
        tgtAssociation={new TgtAssociationModel('20-0001', '12WQE1234567890',
                                                ['billy.bob.joe'])}
      />,
    );
    expect(subject.text()).toContain('20-0001');
    expect(subject.text()).toContain('12WQE1234567890');
    expect(subject.text()).toContain('POC: billy.bob.joe@mail.smil.mil');


    subject = shallow(
      <TgtAssociationBullet
        tgtAssociation={new TgtAssociationModel('20-0001', '12WQE1234567890',
                                                ['billy.bob.joe', 'william.robert.joseph'])}
      />,
    );
    expect(subject.text()).toContain('20-0001');
    expect(subject.text()).toContain('12WQE1234567890');
    expect(subject.text()).toContain('POC: billy.bob.joe@mail.smil.mil, william.robert.joseph@mail.smil.mil');



  });
});
