import {
  Nodes_GetAll_Request,
  Nodes_GetSubNodes_Request
} from '../../content/actionTypes/nodesActionTypes';

// This reducer manages the current zoom level
export const levelReducer = (prevState: number = 0, action: Action): number => {
  switch (action.type) {
    case Nodes_GetSubNodes_Request: {
      const nodeId = action.payload.nodeId;
      const ids = nodeId.split('.');
      return ids.length;
    }

    case Nodes_GetAll_Request: {
      return 0;
    }

    default:
      return prevState;
  }
};
