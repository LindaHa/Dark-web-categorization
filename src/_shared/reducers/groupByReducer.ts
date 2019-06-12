import { GroupPagesBy_Item_Updated } from '../actionTypes/groupByActionTypes';
import { GroupBy } from '../../sidebar/components/Sidebar';

export const groupByReducer = (prevState: GroupBy = GroupBy.Links, action: Action): GroupBy => {
  switch (action.type) {
    case GroupPagesBy_Item_Updated: {
      return action.payload;
    }

    default:
      return prevState;
  }
};
