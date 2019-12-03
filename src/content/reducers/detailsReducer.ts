import { combineReducers } from 'redux';
import { pageDetailsReducer } from './pageDetailsReducer';
import { communityDetailsReducer } from './communityDetailsReducer';
import { IDetails } from '../../_shared/models/IDetails';

export const detailsReducer = combineReducers<IDetails>({
  pageDetails: pageDetailsReducer,
  communityDetails: communityDetailsReducer,
});