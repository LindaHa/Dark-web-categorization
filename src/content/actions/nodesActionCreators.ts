import {
  Nodes_GetAll_Failure,
  Nodes_GetAll_Request,
  Nodes_GetAll_Success
} from '../actionTypes/nodesActionTypes';

export const requestNodes = (): Action => ({
  type: Nodes_GetAll_Request,
  payload: {},
});

export const succeedToFetchNodes = (json: object): Action => ({
  type: Nodes_GetAll_Success,
  payload: { nodes: json },
});

export const failToFetchNodes = (id: string, error: Error): Action => ({
  type: Nodes_GetAll_Failure,
  payload: { id, errorMessage: error.message || 'Nodes were not fetched' },
});
