import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { RangeMetricsContainer } from '../../dashboard/userMetrics/RangeMetricsContainer';
import { initStore } from '../../../setupTests';
import configureStore from '../../configureStore';

const initState = {
  ...initStore,
};
//@ts-ignore
const mockStore = configureStore(history, initState);

describe('UserMetricsDashboard', () => {
  let subject: ReactWrapper;
  console.log = jest.fn();

  beforeEach(() => {
    subject = mount(
      <Provider store={mockStore}>
        <RangeMetricsContainer/>
      </Provider>,
    );
  });

  it('should display metric cards', function () {
    expect(subject.find('.card-container').exists()).toBeTruthy();
  });
});
