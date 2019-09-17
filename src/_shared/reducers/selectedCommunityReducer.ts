import {
  Nodes_GetAll_Request,
  Nodes_GetSubComponents_Request
} from '../../content/actionTypes/nodesActionTypes';
import { SelectedNode_Id_Updated } from '../../content/actionTypes/selectedNodeActionTypes';

export const selectedComponentReducer = (prevState: Uuid = '', action: Action): Uuid => {
  switch (action.type) {
    case SelectedNode_Id_Updated: {
      return action.payload;
    }

    case Nodes_GetAll_Request:
    case Nodes_GetSubComponents_Request: {
      return '';
    }

    default:
      return prevState;
  }
};
