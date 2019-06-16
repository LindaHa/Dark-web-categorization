import { SelectedNode_Id_Updated } from '../actionTypes/selectedNodeActionTypes';

export const selectNode = (value: Uuid): Action => ({
  type: SelectedNode_Id_Updated,
  payload: value,
});
