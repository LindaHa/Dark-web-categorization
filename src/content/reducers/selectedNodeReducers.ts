import {combineReducers} from 'redux';
import { ISelectedNode } from '../../models/stateModels';
import { selectedComponentReducer } from '../../_shared/reducers/selectedCommunityReducer';
import { selectedPageReducer } from '../../_shared/reducers/selectedPageReducer';


export const selectedNodeReducers = combineReducers<ISelectedNode>({
  selectedComponent: selectedComponentReducer,
  selectedPage: selectedPageReducer,
});
