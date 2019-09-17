import {combineReducers} from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';
import { isFetchingNodesReducer } from '../../content/reducers/isFetchingNodesReducer';
import { isErrorReducer } from './isErrorReducer';
import { selectedComponentReducer } from './selectedCommunityReducer';
import { componentsReducer } from '../../content/reducers/componentsReducer';
import { levelReducer } from './levelReducer';

export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  isError: isErrorReducer,
  nodes: componentsReducer,
  isFetchingNodes: isFetchingNodesReducer,
  selectedNodeId: selectedComponentReducer,
  currentLevel: levelReducer,
});
