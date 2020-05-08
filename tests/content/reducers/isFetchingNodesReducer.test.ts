import {
  Nodes_GetAll_Failure,
  Nodes_GetAll_Request,
  Nodes_GetAll_Success,
  Nodes_GetFiltered_Failure,
  Nodes_GetFiltered_Request,
  Nodes_GetFiltered_Success,
  Nodes_GetNodes_Success,
  Nodes_GetSubNodes_Request
} from '../../../src/content/actionTypes/nodesActionTypes';
import { isFetchingNodesReducer } from '../../../src/content/reducers/isFetchingNodesReducer';
import { isFetchingDetailsReducer } from '../../../src/content/reducers/isFetchingDetailsReducer';


describe('isFetchingNodesReducer correctly changes the is loading status', () => {
  it('changes the loading status to true when requesting all nodes', () => {
    const requestAction = { type: Nodes_GetAll_Request };

    const tested = isFetchingNodesReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the loading status to true when requesting filtered nodes', () => {
    const requestAction = { type: Nodes_GetFiltered_Request };

    const tested = isFetchingNodesReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the loading status to false if requesting sub-communities', () => {
    const requestAction = { type: Nodes_GetSubNodes_Request };

    const tested = isFetchingNodesReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the loading status to false if fetching filtered nodes succeeds', () => {
    const requestAction = { type: Nodes_GetFiltered_Success };

    const tested = isFetchingNodesReducer(undefined, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the loading status to false if fetching filtered nodes fails', () => {
    const requestAction = { type: Nodes_GetFiltered_Failure };

    const tested = isFetchingNodesReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the loading status to false if fetching all nodes fails', () => {
    const requestAction = { type: Nodes_GetAll_Failure };

    const tested = isFetchingNodesReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the loading status to false if fetching all nodes succeeds', () => {
    const requestAction = { type: Nodes_GetAll_Success };

    const tested = isFetchingNodesReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the loading status to false if nodes are received', () => {
    const requestAction = { type: Nodes_GetNodes_Success };

    const tested = isFetchingNodesReducer(false, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = isFetchingDetailsReducer(false, requestAction);

    expect(tested).toEqual(false);
  });
});
