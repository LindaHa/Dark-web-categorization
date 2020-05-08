import * as Immutable from 'immutable';
import { makeCommunityDetails } from '../../helpers/detailsMakers';
import {
  DetailsOfCommunity_Get_Request,
  DetailsOfCommunity_Get_Success,
  DetailsOfPage_Get_Request
} from '../../../src/content/actionTypes/detailsActionTypes';
import { communityDetailsReducer } from '../../../src/content/reducers/communityDetailsReducer';
import {
  Nodes_GetAll_Request,
  Nodes_GetFiltered_Request,
  Nodes_GetSubNodes_Request
} from '../../../src/content/actionTypes/nodesActionTypes';
import { IPageDetails } from '../../../src/models/pageDetails';

const urlOne = 'www.oneUrl.page';
const urlTwo = 'www.twoUrl.page';
const communityDetails = makeCommunityDetails(Immutable.List([urlOne, urlTwo]));
const initState = Immutable.List<IPageDetails>();

describe('communityDetailsReducer fetches community details', () => {
  it('returns the details when fetching succeeds', () => {
    const requestAction = {
      type: DetailsOfCommunity_Get_Success,
      payload: { details: communityDetails },
    };

    const tested = communityDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(communityDetails);
  });

  it('returns the initial state if all nodes are requested', () => {
    const requestAction = { type: Nodes_GetAll_Request };

    const tested = communityDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the initial state if filtered nodes are requested', () => {
    const requestAction = { type: Nodes_GetFiltered_Request };

    const tested = communityDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the initial state if sub-communities are requested', () => {
    const requestAction = { type: Nodes_GetSubNodes_Request };

    const tested = communityDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the initial state if page details are requested', () => {
    const requestAction = { type: DetailsOfPage_Get_Request };

    const tested = communityDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the initial state if community details are requested', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Request };

    const tested = communityDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = communityDetailsReducer(initState, requestAction);

    expect(tested).toEqual(initState);
  });
});
