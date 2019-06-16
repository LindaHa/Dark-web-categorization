import {combineReducers} from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';
import { nodesReducer } from '../../content/reducers/nodesReducer';
import { linksReducer } from '../../content/reducers/linksReducer';
import { isFetchingNodesReducer } from '../../content/reducers/isFetchingNodesReducer';

export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  links: linksReducer,
  nodes: nodesReducer,
  isFetchingNodes: isFetchingNodesReducer
});
