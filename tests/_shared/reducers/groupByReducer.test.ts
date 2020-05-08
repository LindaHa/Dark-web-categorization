import { GroupNodesBy_Item_Updated } from '../../../src/_shared/actionTypes/groupByActionTypes';
import { GroupBy } from '../../../src/sidebar/components/Sidebar';
import { groupByReducer } from '../../../src/_shared/reducers/groupByReducer';
import { selectedNodeReducer } from '../../../src/_shared/reducers/selectedNodeReducer';

describe('groupByReducer correctly changes the group by mode', () => {
  it('sets link mode if link mode is selected', () => {
    const requestAction = {
      type: GroupNodesBy_Item_Updated,
      payload: GroupBy.Link
    };
    const tested = groupByReducer(undefined, requestAction);

    expect(tested).toEqual(GroupBy.Link);
  });

  it('sets category mode if category mode is selected', () => {
    const requestAction = {
      type: GroupNodesBy_Item_Updated,
      payload: GroupBy.Category
    };
    const tested = groupByReducer(undefined, requestAction);

    expect(tested).toEqual(GroupBy.Category);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = selectedNodeReducer(GroupBy.Category, requestAction);

    expect(tested).toEqual(GroupBy.Category);
  });
});
