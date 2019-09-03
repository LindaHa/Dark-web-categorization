import {
  Nodes_GetAll_Request,
  Nodes_GetSubComponents_Request
} from '../../content/actionTypes/nodesActionTypes';

export const selectedComponentReducer = (prevState: Uuid = '', action: Action): Uuid => {
  switch (action.type) {
    case Nodes_GetSubComponents_Request: {
      return action.payload.componentId;
    }

    case Nodes_GetAll_Request: {
      return '';
    }

    default:
      return prevState;
  }
};
