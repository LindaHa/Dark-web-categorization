import { GroupPagesBy_Item_Updated } from '../actionTypes/groupByActionTypes';

export const updateGroupBy = (value: string): Action => ({
  type: GroupPagesBy_Item_Updated,
  payload: value,
});
