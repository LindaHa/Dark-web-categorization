import * as Immutable from 'immutable';
import {
  Nodes_GetFiltered_Success,
  Nodes_GetNodes_Success
} from '../actionTypes/nodesActionTypes';
import { convertCommunityServerToClientModel, } from '../utils/convertNodeModel';
import {
  ICommunityServerModel,
  INode
} from '../../models/node';
import { decomposeCommunityIfPossible } from '../utils/decomposeCommunity';

// This reducer manages nodes
export const nodesReducer = (prevState: Immutable.Map<Uuid, INode> = Immutable.Map<Url, INode>(), action: Action)
  : Immutable.Map<Uuid, INode> => {
  switch (action.type) {
    case Nodes_GetNodes_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes: Immutable.Map<Url, INode> = Immutable.Map<Url, INode>(
        serverNodes.map((node: ICommunityServerModel) => {
            const clientNode = convertCommunityServerToClientModel(node);
            return [node.id, clientNode];
          }
        )
      );

      return decomposeCommunityIfPossible(clientNodes);
    }

    case Nodes_GetFiltered_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes: Immutable.Map<Url, INode> = Immutable.Map<Url, INode>(
        serverNodes.map((node: ICommunityServerModel) =>
          [`filtered ${node.id}`, convertCommunityServerToClientModel(node)]
        )
      );

      return decomposeCommunityIfPossible(clientNodes);
    }

    default:
      return prevState;
  }
};
