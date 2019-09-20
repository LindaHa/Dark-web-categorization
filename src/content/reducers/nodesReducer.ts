import * as Immutable from 'immutable';
import {
  Nodes_GetNodes_Success,
  Nodes_GetFiltered_Request
} from '../actionTypes/nodesActionTypes';
import {
  convertCommunityServerToViewNodeModel,
} from '../utils/convertNodeModel';
import {
  INode,
  ICommunityServerModel
} from '../../models/node';

export const nodesReducer = (prevState: Immutable.Map<Uuid, INode> = Immutable.Map<Url, INode>(), action: Action)
  : Immutable.Map<Uuid, INode> => {
  switch (action.type) {
    case Nodes_GetFiltered_Request:
    case Nodes_GetNodes_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes = serverNodes.map((node: ICommunityServerModel) =>
        [node.id, convertCommunityServerToViewNodeModel(node)]
      );

      return Immutable.Map<Uuid, INode>(clientNodes);
    }

    default:
      return prevState;
  }
};
