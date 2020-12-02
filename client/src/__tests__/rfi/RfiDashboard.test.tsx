import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { RfiDashboard } from '../../dashboard/rfi/RfiDashboard';
import { StyledRfiTable } from '../../dashboard/rfi/RfiTable';
import { StyledRfiDescriptionContainer } from '../../dashboard/rfi/RfiDescriptionContainer';
import { Provider } from 'react-redux';
import { initStore } from '../../../setupTests';
import configureStore from '../../configureStore';
import { SnackbarProvider } from 'notistack';

//@ts-ignore
const mockStore = configureStore(history, initStore);

describe('RFI table', () => {
  let subject: ReactWrapper;

  beforeEach(() => {
    subject = mount(
      <Provider store={mockStore}>
        <SnackbarProvider>
          <RfiDashboard/>
        </SnackbarProvider>
      </Provider>,
    );
  });

  it('should display a table and description section', () => {
    expect(subject.find(StyledRfiTable).exists()).toBeTruthy();
    expect(subject.find(StyledRfiDescriptionContainer).exists()).toBeTruthy();
  });

  it('should display the header', () => {
    expect(subject.find('img').prop('src')).toBe('smallbord.png');
    expect(subject.find('.metrics-button').exists()).toBeTruthy();
    expect(subject.find('.refresh-button').exists()).toBeTruthy();
  });
});
