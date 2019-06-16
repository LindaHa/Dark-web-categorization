import { SelectedNode_Id_Updated } from '../actionTypes/selectedNodeActionTypes';

export const selectedNodeReducer = (prevState: Uuid = '', action: Action): Uuid => {
  switch (action.type) {
    case SelectedNode_Id_Updated: {
      return action.payload;
    }

    default:
      return prevState;
  }
};
