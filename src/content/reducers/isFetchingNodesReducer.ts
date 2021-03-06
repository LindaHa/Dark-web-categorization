import {
  Nodes_GetAll_Failure,
  Nodes_GetAll_Request,
  Nodes_GetAll_Success,
  Nodes_GetNodes_Success,
  Nodes_GetFiltered_Failure,
  Nodes_GetFiltered_Success,
  Nodes_GetSubNodes_Request,
  Nodes_GetFiltered_Request
} from '../actionTypes/nodesActionTypes';

// This reducer informs whether the client is fetching nodes or not
export const isFetchingNodesReducer = (prevState: boolean = true, action: Action): boolean => {
  switch (action.type) {
    case Nodes_GetAll_Request:
    case Nodes_GetFiltered_Request:
    case Nodes_GetSubNodes_Request: {
      return true;
    }

    case Nodes_GetFiltered_Failure:
    case Nodes_GetFiltered_Success:
    case Nodes_GetAll_Failure:
    case Nodes_GetAll_Success:
    case Nodes_GetNodes_Success: {
      return false;
    }

    default:
      return prevState;
  }
};
