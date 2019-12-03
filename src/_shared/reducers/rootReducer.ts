import {combineReducers} from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';
import { isFetchingNodesReducer } from '../../content/reducers/isFetchingNodesReducer';
import { isErrorReducer } from './isErrorReducer';
import { selectedNodeReducer } from './selectedCommunityReducer';
import { nodesReducer } from '../../content/reducers/nodesReducer';
import { levelReducer } from './levelReducer';
import { detailsReducer } from '../../content/reducers/detailsReducer';

export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  isError: isErrorReducer,
  nodes: nodesReducer,
  isFetchingNodes: isFetchingNodesReducer,
  selectedNodeId: selectedNodeReducer,
  currentLevel: levelReducer,
  details: detailsReducer,
});

