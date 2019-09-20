import {
  Nodes_GetAll_Failure,
  Nodes_GetAll_Success,
  Nodes_GetNodes_Success,
  Nodes_GetFiltered_Failure,
  Nodes_GetFiltered_Success
} from '../../content/actionTypes/nodesActionTypes';

export const isErrorReducer = (prevState: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case Nodes_GetFiltered_Failure:
    case Nodes_GetAll_Failure: {
      return true;
    }

    case Nodes_GetAll_Success:
    case Nodes_GetFiltered_Success:
    case Nodes_GetNodes_Success: {
      return false;
    }

    default:
      return prevState;
  }
};
