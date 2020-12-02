// @ts-ignore
import Enzyme from 'enzyme';
//@ts-ignore
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { ApplicationState } from './src/store';
import { ixnInitState } from './src/store/ixn/Reducer';
import { rfiInitState } from './src/store/rfi';
import { tgtInitState } from './src/store/tgt';
import { RouterState } from 'connected-react-router';
import { scoiInitState } from './src/store/scoi/Reducer';
import { historicalRfiInitState } from './src/store/rfiHistory/Reducer';

Enzyme.configure({adapter: new EnzymeAdapter()});

const initRouter: RouterState =
  {
    location: {
      pathname: 'Pathname',
      search: 'Search',
      state: 'S',
      hash: 'Hash',
    },
    action: 'PUSH',
  };

export const initStore: ApplicationState = {
  rfiState: rfiInitState,
  tgtState: tgtInitState,
  ixnState: ixnInitState,
  scoiState: scoiInitState,
  historicalRfiState: historicalRfiInitState,
  router: initRouter,
};
