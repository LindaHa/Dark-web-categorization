import {
  Nodes_GetAll_Request,
  Nodes_GetNodes_Success,
  Nodes_GetSubNodes_Request
} from '../../content/actionTypes/nodesActionTypes';
import { SelectedNode_Id_Updated } from '../../content/actionTypes/selectedNodeActionTypes';
import { ICommunityServerModel } from '../../models/node';

export const selectedNodeReducer = (prevState: Uuid = '', action: Action): Uuid => {
  switch (action.type) {
    case SelectedNode_Id_Updated: {
      return action.payload.nodeId;
    }

    case Nodes_GetNodes_Success: {
      const firstNode: ICommunityServerModel = action.payload.nodes[0];
      if (!firstNode) {
        return prevState;
      }

      const childId = firstNode.id;
      const lastDotIndex = childId.lastIndexOf('.');
      const parentId = (childId.slice(0, lastDotIndex));

      return parentId;
    }

    case Nodes_GetAll_Request:
    case Nodes_GetSubNodes_Request: {
      return '';
    }


    default:
      return prevState;
  }
};
