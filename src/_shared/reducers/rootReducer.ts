import {combineReducers} from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';
import { isFetchingNodesReducer } from '../../content/reducers/isFetchingNodesReducer';
import { selectedNodeReducer } from './selectedNodeReducer';
import { nodeReducers } from '../../content/reducers/nodesReducers';
import { isErrorReducer } from './isErrorReducer';
import { selectedComponentReducer } from './selectedCommunityReducer';

export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  isError: isErrorReducer,
  nodes: nodeReducers,
  isFetchingNodes: isFetchingNodesReducer,
  selectedComponent: selectedComponentReducer,
  selectedNode: selectedNodeReducer,
});
