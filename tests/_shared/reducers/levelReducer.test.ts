import { levelReducer } from '../../../src/_shared/reducers/levelReducer';
import { Nodes_GetSubNodes_Request } from '../../../src/content/actionTypes/nodesActionTypes';
import { selectedNodeReducer } from '../../../src/_shared/reducers/selectedNodeReducer';

const nodeLevel = 3;
const nodeId = '0.24.2';

const parentLevel = 1;
const parentId = '0';

describe('levelReducer correctly indicates the current zoom level', () => {
  it('returns 0 if after receiving all nodes', () => {
    const requestAction = {
      type: Nodes_GetSubNodes_Request,
      payload: {
        nodeId: parentId,
      }
    };
    const tested = levelReducer(undefined, requestAction);

    expect(tested).toEqual(parentLevel);
  });

  it('indicates zoomed zoom level correctly', () => {
    const requestAction = {
      type: Nodes_GetSubNodes_Request,
      payload: {
        nodeId,
      }
    };
    const tested = levelReducer(undefined, requestAction);

    expect(tested).toEqual(nodeLevel);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = selectedNodeReducer(2, requestAction);

    expect(tested).toEqual(2);
  });
});
