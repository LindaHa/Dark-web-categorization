import { combineReducers } from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';
import { isFetchingNodesReducer } from '../../content/reducers/isFetchingNodesReducer';
import { errorMessageReducer } from './errorMessageReducer';
import { selectedNodeReducer } from './selectedNodeReducer';
import { nodesReducer } from '../../content/reducers/nodesReducer';
import { levelReducer } from './levelReducer';
import { detailsReducer } from '../../content/reducers/detailsReducer';

// This reducer manages all reducers throughout the application
export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  errorMessage: errorMessageReducer,
  nodes: nodesReducer,
  isFetchingNodes: isFetchingNodesReducer,
  selectedNodeId: selectedNodeReducer,
  currentLevel: levelReducer,
  details: detailsReducer,
});

