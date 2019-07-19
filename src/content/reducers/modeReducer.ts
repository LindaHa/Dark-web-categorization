import { NodeMode } from '../../models/stateModels';
import { Nodes_Mode_Updated } from '../actionTypes/nodesActionTypes';

export const modeReducer = (prevState: NodeMode = NodeMode.Empty, action: Action): NodeMode => {
  switch (action.type) {
    case Nodes_Mode_Updated: {
      return action.payload;
    }

    default:
      return prevState;
  }
};
