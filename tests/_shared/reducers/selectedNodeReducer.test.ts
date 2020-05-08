import * as Immutable from 'immutable';
import { selectedNodeReducer } from '../../../src/_shared/reducers/selectedNodeReducer';
import { SelectedNode_Id_Updated } from '../../../src/content/actionTypes/selectedNodeActionTypes';
import {
  Nodes_GetAll_Request,
  Nodes_GetNodes_Success,
  Nodes_GetSubNodes_Request
} from '../../../src/content/actionTypes/nodesActionTypes';
import {
  makeClientCommunityNode,
  makeClientPageNode
} from '../../helpers/nodesMakers';

const nodeIdOne = '0.24';
const nodeIdTwo = '0.22';
const parentId = '0';
const node1 = makeClientPageNode(nodeIdOne);
const node2 = makeClientPageNode(nodeIdTwo);
const parentNode = makeClientCommunityNode(parentId, Immutable.List<string>([nodeIdOne, nodeIdTwo]));

describe('selectedNodeReducer correctly changes the selected node info', () => {
  it('updates correctly when user selects a node', () => {
    const id = node1.id;

    const requestAction = {
      type: SelectedNode_Id_Updated,
      payload: {
        nodeId: id,
      }
    };
    const tested = selectedNodeReducer(undefined, requestAction);

    expect(tested).toEqual(id);
  });

  it('selects no node if requesting sub-communities of community', () => {
    const id = node1.id;
    const requestAction = {
      type: Nodes_GetSubNodes_Request,
      payload: {
        nodeIds: {
          nodeId: id,
        }
      }
    };
    const tested = selectedNodeReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('selects parent node if sub-communities of community are received', () => {
    const id = parentNode.id;
    const requestAction = {
      type: Nodes_GetNodes_Success,
      payload: {
        nodes: [node1, node2]
      }
    };
    const tested = selectedNodeReducer(undefined, requestAction);

    expect(tested).toEqual(id);
  });

  it('selects no node after fetching the highest level', () => {
    const requestAction = {
      type: Nodes_GetAll_Request,
    };
    const tested = selectedNodeReducer(undefined, requestAction);

    expect(tested).toEqual('');
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = selectedNodeReducer(node1.id, requestAction);

    expect(tested).toEqual(node1.id);
  });
});
