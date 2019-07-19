import {combineReducers} from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';
import { linksReducer } from '../../content/reducers/linksReducer';
import { isFetchingNodesReducer } from '../../content/reducers/isFetchingNodesReducer';
import { selectedNodeReducer } from './selectedNodeReducer';
import { nodeReducers } from '../../content/reducers/nodesReducers';

export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  links: linksReducer,
  nodes: nodeReducers,
  isFetchingNodes: isFetchingNodesReducer,
  selectedNode: selectedNodeReducer,
});
