import {
  Nodes_GetAll_Failure,
  Nodes_GetAll_Request,
  Nodes_GetAll_Success,
  Nodes_GetNodes_Success,
  Nodes_GetFiltered_Failure,
  Nodes_GetFiltered_Request,
  Nodes_GetFiltered_Success,
  Nodes_GetSubNodes_Request,
} from '../actionTypes/nodesActionTypes';

export const requestNodes = (): Action => ({
  type: Nodes_GetAll_Request,
  payload: {},
});

export const succeedToFetchAllNodes = (json: object): Action => ({
  type: Nodes_GetAll_Success,
  payload: { nodes: json },
});

export const succeedToFetchNodes = (json: object): Action => ({
  type: Nodes_GetNodes_Success,
  payload: { nodes: json },
});

export const requestSubNodes = (nodeId: Uuid): Action => ({
  type: Nodes_GetSubNodes_Request,
  payload: { nodeId },
});

export const failToFetchNodes = (id: string, error: Error): Action => ({
  type: Nodes_GetAll_Failure,
  payload: { id, errorMessage: error.message || 'Nodes were not fetched' },
});

export const requestFilteredNodes = (searchPhrase: string): Action => ({
  type: Nodes_GetFiltered_Request,
  payload: { searchPhrase },
});

export const succeedToFetchFilteredNodes = (json: object): Action => ({
  type: Nodes_GetFiltered_Success,
  payload: { nodes: json },
});

export const failToFetchFilteredNodes = (id: string, error: Error): Action => ({
  type: Nodes_GetFiltered_Failure,
  payload: { id, errorMessage: error.message || 'Nodes were not fetched' },
});
