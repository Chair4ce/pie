import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { FeedbackDashboard } from '../../dashboard/feedback/FeedbackDashboard';
import { MemoryRouter } from 'react-router';

describe('FeedbackDashboard', () => {
  let subject: ReactWrapper;

  beforeEach(() => {
    subject = mount(
      <MemoryRouter initialEntries={['/DGS-1-SDT-2020-00321']}>
        <FeedbackDashboard/>
      </MemoryRouter>,
    );
  });

  it('should display the rfi star feedback information', () => {
    expect(subject.find('.rfi-title').text()).toContain('Error: Bad Link');
    expect(subject.find('.star-container').exists()).toBeTruthy();
    expect(subject.find('.star').children().length).toEqual(5);
    expect(subject.find('.rfi-description').text()).toContain('RFI Description');
    expect(subject.find('.rfi-description').text()).toContain('You have navigated to an invalid link.');
  });

});
