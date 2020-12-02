import { applyMiddleware, createStore, Store } from 'redux';
// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
import { routerMiddleware } from 'connected-react-router';
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension';
// If you use react-router, don't forget to pass in your history type.
import { History } from 'history';

// Import the state interface and our combined reducers/sagas.
import { ApplicationState, createRootReducer } from './store';
import thunk from 'redux-thunk';

export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools(
    applyMiddleware(routerMiddleware(history), thunk),

  );

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  // Don't forget to run the root saga, and return the store object.

  return createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers,
  );
}
