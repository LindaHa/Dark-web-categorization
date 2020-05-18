import { combineReducers } from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';
import { isFetchingNodesReducer } from '../../content/reducers/isFetchingNodesReducer';
import { errorMessageReducer } from './errorMessageReducer';
import { selectedNodeReducer } from './selectedNodeReducer';
import { nodesReducer } from '../../content/reducers/nodesReducer';
import { levelReducer } from './levelReducer';
import { isFetchingDetailsReducer } from '../../content/reducers/isFetchingDetailsReducer';

// This reducer manages all reducers throughout the application
export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  errorMessage: errorMessageReducer,
  nodes: nodesReducer,
  isFetchingNodes: isFetchingNodesReducer,
  selectedNodeId: selectedNodeReducer,
  currentLevel: levelReducer,
  isFetchingDetails: isFetchingDetailsReducer,
});

