import {
  Nodes_GetAll_Request,
  Nodes_GetComponents_Success,
  Nodes_GetSubComponents_Request
} from '../../content/actionTypes/nodesActionTypes';
import { SelectedNode_Id_Updated } from '../../content/actionTypes/selectedNodeActionTypes';
import { IComponentServerModel } from '../../models/component';

export const selectedComponentReducer = (prevState: Uuid = '', action: Action): Uuid => {
  switch (action.type) {
    case SelectedNode_Id_Updated: {
      return action.payload.nodeId;
    }

    case Nodes_GetComponents_Success: {
      const firstComponent: IComponentServerModel = action.payload.nodes[0];
      if (!firstComponent) {
        return prevState;
      }

      const childId = firstComponent.id;
      const lastDotIndex = childId.lastIndexOf('.');
      const parentId = (childId.slice(0, lastDotIndex));

      return parentId;
    }

    case Nodes_GetAll_Request:
    case Nodes_GetSubComponents_Request: {
      return '';
    }


    default:
      return prevState;
  }
};
