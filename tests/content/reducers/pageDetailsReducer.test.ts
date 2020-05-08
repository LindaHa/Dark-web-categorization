import { makePageDetails } from '../../helpers/detailsMakers';
import {
  DetailsOfPage_Get_Request,
  DetailsOfPage_Get_Success
} from '../../../src/content/actionTypes/detailsActionTypes';
import { pageDetailsReducer } from '../../../src/content/reducers/pageDetailsReducer';
import {
  Nodes_GetAll_Request,
  Nodes_GetFiltered_Request,
  Nodes_GetSubNodes_Request
} from '../../../src/content/actionTypes/nodesActionTypes';
import { PageDetails } from '../../../src/models/pageDetails';

const url = 'www.url.page';
const pageDetails = makePageDetails(url);
const initState = new PageDetails();

describe('pageDetailsReducer fetches page details', () => {
  it('returns the details when fetching succeeds', () => {
    const requestAction = {
      type: DetailsOfPage_Get_Success,
      payload: { details: pageDetails },
    };

    const tested = pageDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(pageDetails);
  });

  it('returns the initial state if all nodes are requested', () => {
    const requestAction = { type: Nodes_GetAll_Request };

    const tested = pageDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the initial state if filtered nodes are requested', () => {
    const requestAction = { type: Nodes_GetFiltered_Request };

    const tested = pageDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the initial state if sub-communities are requested', () => {
    const requestAction = { type: Nodes_GetSubNodes_Request };

    const tested = pageDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the initial state if page details are requested', () => {
    const requestAction = { type: DetailsOfPage_Get_Request };

    const tested = pageDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the initial state if page details are requested', () => {
    const requestAction = { type: DetailsOfPage_Get_Request };

    const tested = pageDetailsReducer(undefined, requestAction);

    expect(tested).toEqual(initState);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = pageDetailsReducer(initState, requestAction);

    expect(tested).toEqual(initState);
  });
});
