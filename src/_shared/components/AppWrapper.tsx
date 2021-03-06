import * as React from 'react';
import {
  applyMiddleware,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { rootReducer } from '../reducers/rootReducer';
import { App } from './App';

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
);

export const AppWrappper: React.SFC = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);
