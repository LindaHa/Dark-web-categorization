import { SelectedNode_Id_Updated } from '../../content/actionTypes/selectedNodeActionTypes';

export const selectedPageReducer = (prevState: Uuid = '', action: Action): Uuid => {
  switch (action.type) {
    case SelectedNode_Id_Updated: {
      return action.payload;
    }

    default:
      return prevState;
  }
};