import { isErrorReducer } from '../../../src/_shared/reducers/isErrorReducer';
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


describe('isErrorReducer correctly changes the error status', () => {
  it('changes the error status to true if requesting community details fails', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Failure };

    const tested = isErrorReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the error status  to true if requesting page details fails', () => {
    const requestAction = { type: DetailsOfPage_Get_Failure };

    const tested = isErrorReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the error status  to true if requesting filtered nodes fails', () => {
    const requestAction = { type: Nodes_GetFiltered_Failure };

    const tested = isErrorReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the error status  to true if requesting all nodes fails', () => {
    const requestAction = { type: Nodes_GetAll_Failure };

    const tested = isErrorReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the error status  to false if community details are requested', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Request };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if community details are received', () => {
    const requestAction = { type: DetailsOfCommunity_Get_Success };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if page details are requested', () => {
    const requestAction = { type: DetailsOfPage_Get_Request };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if page details are received', () => {
    const requestAction = { type: DetailsOfPage_Get_Success };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if all nodes are requested', () => {
    const requestAction = { type: Nodes_GetAll_Request };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if all nodes are received', () => {
    const requestAction = { type: Nodes_GetAll_Success };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if filtered nodes are requested', () => {
    const requestAction = { type: Nodes_GetFiltered_Request };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if filtered nodes are received', () => {
    const requestAction = { type: Nodes_GetFiltered_Success };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if sub-communities are requested', () => {
    const requestAction = { type: Nodes_GetSubNodes_Request };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the error status to false if sub-communities are received', () => {
    const requestAction = { type: Nodes_GetNodes_Success };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = isErrorReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
