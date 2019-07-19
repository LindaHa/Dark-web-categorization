import {combineReducers} from 'redux';
import { pagesReducer } from '../../content/reducers/pagesReducer';
import { componentsReducer } from '../../content/reducers/componentsReducer';
import { modeReducer } from './modeReducer';
import { INodes } from '../../models/stateModels';

export const nodeReducers = combineReducers<INodes>({
  pages: pagesReducer,
  components: componentsReducer,
  mode: modeReducer,
});
