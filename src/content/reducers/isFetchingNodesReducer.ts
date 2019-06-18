import {
  Nodes_GetAll_Failure,
  Nodes_GetAll_Request,
  Nodes_GetAll_Success,
  Nodes_GetFiltered_Failure,
  Nodes_GetFiltered_Success
} from '../actionTypes/nodesActionTypes';

export const isFetchingNodesReducer = (prevState: boolean = false, action: Action): boolean => {
  switch (action.type) {
    // case Nodes_GetFiltered_Request:
    case Nodes_GetAll_Request: {
      return true;
    }

    case Nodes_GetFiltered_Failure:
    case Nodes_GetFiltered_Success:
    case Nodes_GetAll_Failure:
    case Nodes_GetAll_Success: {
      return false;
    }

    default:
      return prevState;
  }
};
