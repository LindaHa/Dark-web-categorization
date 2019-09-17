import { SelectedNode_Id_Updated } from '../../content/actionTypes/selectedNodeActionTypes';

export const selectNode = (value: Uuid): Action => ({
  type: SelectedNode_Id_Updated,
  payload: { nodeId: value },
});
