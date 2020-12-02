import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { LoadingScreen } from '../dashboard/components/loading/LoadingScreen';

describe('LoadingScreen', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
        <LoadingScreen />
    );
  });

  it('should display pacman react spinner', () => {
    expect(subject.find('.pacmanSpinner').exists).toBeTruthy();
  });

  it('should display loading text', () => {
    expect(subject.find('.loading--message').text()).toContain('LOADING');
  });

});
