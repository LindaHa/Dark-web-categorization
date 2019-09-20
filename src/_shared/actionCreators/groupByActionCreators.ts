import { GroupNodesBy_Item_Updated } from '../actionTypes/groupByActionTypes';

export const updateGroupBy = (value: string): Action => ({
  type: GroupNodesBy_Item_Updated,
  payload: value,
});
