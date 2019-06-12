import {combineReducers} from 'redux';
import { groupByReducer } from './groupByReducer';
import { IState } from '../models/IState';

export const rootReducer = combineReducers<IState>({
  groupBy: groupByReducer,
  // links: null,
  // nodes: null,
  // page: null,
});
