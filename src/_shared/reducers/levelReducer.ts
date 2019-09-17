import {
  Nodes_GetSubComponents_Request
} from '../../content/actionTypes/nodesActionTypes';

export const levelReducer = (prevState: number = 0, action: Action): number => {
  switch (action.type) {
    case Nodes_GetSubComponents_Request: {
      const nodeId = action.payload.nodeId;
      const ids = nodeId.split('.');
      return ids.length;
    }

    default:
      return prevState;
  }
};
