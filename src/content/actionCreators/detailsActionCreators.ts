import {
  DetailsOfCommunity_Get_Failure,
  DetailsOfCommunity_Get_Request,
  DetailsOfCommunity_Get_Success,
  DetailsOfPage_Get_Failure,
  DetailsOfPage_Get_Request,
  DetailsOfPage_Get_Success
} from '../actionTypes/detailsActionTypes';

export const requestCommunityDetails = (searchPhrase: string): Action => ({
  type: DetailsOfCommunity_Get_Request,
  payload: { searchPhrase },
});

export const succeedToFetchCommunityDetails = (json: object): Action => ({
  type: DetailsOfCommunity_Get_Success,
  payload: { details: json },
});

export const failToFetchCommunityDetails = (id: string, error: Error): Action => ({
  type: DetailsOfCommunity_Get_Failure,
  payload: { id, errorMessage: error.message || 'Community details were not fetched' },
});

export const requestPageDetails = (searchPhrase: string): Action => ({
  type: DetailsOfPage_Get_Request,
  payload: { searchPhrase },
});

export const succeedToFetchPageDetails = (json: object): Action => ({
  type: DetailsOfPage_Get_Success,
  payload: { details: json },
});

export const failToFetchPageDetails = (id: string, error: Error): Action => ({
  type: DetailsOfPage_Get_Failure,
  payload: { id, errorMessage: error.message || 'Page details were not fetched' },
});
