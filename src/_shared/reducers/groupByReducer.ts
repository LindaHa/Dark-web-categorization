import { GroupNodesBy_Item_Updated } from '../actionTypes/groupByActionTypes';
import { GroupBy } from '../../sidebar/components/Sidebar';

// This reducer manages the group by mode (the mode according to which the pages are grouped)
export const groupByReducer = (prevState: GroupBy = GroupBy.Link, action: Action): GroupBy => {
  switch (action.type) {
    case GroupNodesBy_Item_Updated: {
      return action.payload;
    }

    default:
      return prevState;
  }
};
