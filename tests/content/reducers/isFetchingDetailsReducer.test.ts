import {
  DetailsOfCommunity_Get_Failure,
  DetailsOfCommunity_Get_Request,
  DetailsOfCommunity_Get_Success,
  DetailsOfPage_Get_Failure,
  DetailsOfPage_Get_Request,
  DetailsOfPage_Get_Success
} from '../../../src/content/actionTypes/detailsActionTypes';
import {
  Nodes_GetAll_Request,
  Nodes_GetFiltered_Failure,
  Nodes_GetSubNodes_Request
} from '../../../src/content/actionTypes/nodesActionTypes';
import { isFetchingDetailsReducer } from '../../../src/content/reducers/isFetchingDetailsReducer';


describe('isFetchingDetailsReducer correctly changes the is fetching details status', () => {
  it('changes the is fetching details status to true when requesting community details', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Request };

    const tested = isFetchingDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the is fetching details status to true when requesting page details', () => {
    const requestAction = { type: DetailsOfPage_Get_Request };

    const tested = isFetchingDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the is fetching details status to false if requesting filtered nodes fails', () => {
    const requestAction = { type: Nodes_GetFiltered_Failure };

    const tested = isFetchingDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the is fetching details status to false if requesting all nodes', () => {
    const requestAction = { type: Nodes_GetAll_Request };

    const tested = isFetchingDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the is fetching details status to false if sub-communities are requested', () => {
    const requestAction = { type: Nodes_GetSubNodes_Request };

    const tested = isFetchingDetailsReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the is fetching details status to false if community details are received', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Success };

    const tested = isFetchingDetailsReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the is fetching details status to false if fetching community details failed', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Failure };

    const tested = isFetchingDetailsReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the is fetching details status to false if page details are received', () => {
    const requestAction = { type: DetailsOfPage_Get_Success };

    const tested = isFetchingDetailsReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the is fetching details status to false if fetching page details failed', () => {
    const requestAction = { type: DetailsOfPage_Get_Failure };

    const tested = isFetchingDetailsReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = isFetchingDetailsReducer(false, requestAction);

    expect(tested).toEqual(false);
  });
});
