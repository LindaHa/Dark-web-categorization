import { Nodes_GetSubComponents_Request } from '../../content/actionTypes/nodesActionTypes';

export const selectedComponentReducer = (prevState: Uuid = '', action: Action): Uuid => {
  switch (action.type) {
    case Nodes_GetSubComponents_Request: {
      return action.payload.componentId;
    }

    default:
      return prevState;
  }
};
