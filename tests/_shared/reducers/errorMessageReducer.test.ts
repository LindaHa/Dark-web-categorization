import { errorMessageReducer } from '../../../src/_shared/reducers/errorMessageReducer';
import {
  DetailsOfCommunity_Get_Failure,
  DetailsOfCommunity_Get_Request,
  DetailsOfCommunity_Get_Success,
  DetailsOfPage_Get_Failure,
  DetailsOfPage_Get_Request,
  DetailsOfPage_Get_Success
} from '../../../src/content/actionTypes/detailsActionTypes';
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


describe('errorMessageReducer correctly sets the error message', () => {
  it('sets the error message if requesting community details fails', () => {
    const errorMessage = 'Something went wrong.';
    const requestAction = { type: DetailsOfCommunity_Get_Failure, payload: {errorMessage} };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual(errorMessage);
  });

  it('sets the error message if requesting page details fails', () => {
    const errorMessage = 'Something went wrong.';
    const requestAction = { type: DetailsOfPage_Get_Failure, payload: {errorMessage} };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual(errorMessage);
  });

  it('sets the error message if requesting filtered nodes fails', () => {
    const errorMessage = 'Something went wrong.';
    const requestAction = { type: Nodes_GetFiltered_Failure, payload: {errorMessage} };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual(errorMessage);
  });

  it('sets the error message if requesting all nodes fails', () => {
    const errorMessage = 'Something went wrong.';
    const requestAction = { type: Nodes_GetAll_Failure, payload: {errorMessage} };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual(errorMessage);
  });

  it('sets the error message to "" if community details are requested', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Request };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if community details are received', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Success };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if page details are requested', () => {
    const requestAction = { type: DetailsOfPage_Get_Request };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if page details are received', () => {
    const requestAction = { type: DetailsOfPage_Get_Success };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if all nodes are requested', () => {
    const requestAction = { type: Nodes_GetAll_Request };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if all nodes are received', () => {
    const requestAction = { type: Nodes_GetAll_Success };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if filtered nodes are requested', () => {
    const requestAction = { type: Nodes_GetFiltered_Request };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if filtered nodes are received', () => {
    const requestAction = { type: Nodes_GetFiltered_Success };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if sub-communities are requested', () => {
    const requestAction = { type: Nodes_GetSubNodes_Request };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('sets the error message to "" if sub-communities are received', () => {
    const requestAction = { type: Nodes_GetNodes_Success };

    const tested = errorMessageReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = errorMessageReducer('', requestAction);

    expect(tested).toEqual('');
  });
});
