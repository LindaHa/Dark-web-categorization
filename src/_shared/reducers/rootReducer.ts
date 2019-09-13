import {combineReducers} from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';
import { isFetchingNodesReducer } from '../../content/reducers/isFetchingNodesReducer';
import { nodeReducers } from '../../content/reducers/nodesReducers';
import { isErrorReducer } from './isErrorReducer';
import { selectedNodeReducers } from '../../content/reducers/selectedNodeReducers';

export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  isError: isErrorReducer,
  nodes: nodeReducers,
  isFetchingNodes: isFetchingNodesReducer,
  selectedNode: selectedNodeReducers,
});
