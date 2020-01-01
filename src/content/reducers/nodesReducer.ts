import * as Immutable from 'immutable';
import {
  Nodes_GetFiltered_Request,
  Nodes_GetNodes_Success
} from '../actionTypes/nodesActionTypes';
import { convertCommunityServerToClientModel, } from '../utils/convertNodeModel';
import {
  ICommunityServerModel,
  INode
} from '../../models/node';
import {
  MAX_COMMUNITIES_FOR_DISPLAY,
  MAX_NODES_FOR_DISPLAY
} from '../constants/graphConstants';
import {
  decomposeCommunity,
  decomposeIfOnlySimplePages,
  hasMaxNumberOfMembers
} from '../utils/decomposeCommunity';

export const nodesReducer = (prevState: Immutable.Map<Uuid, INode> = Immutable.Map<Url, INode>(), action: Action)
  : Immutable.Map<Uuid, INode> => {
  switch (action.type) {
    case Nodes_GetFiltered_Request:
    case Nodes_GetNodes_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes: Immutable.Map<Url, INode> = Immutable.Map<Url, INode>(
        serverNodes.map((node: ICommunityServerModel) =>
          [node.id, convertCommunityServerToClientModel(node)]
        )
      );

      if (clientNodes.size > MAX_COMMUNITIES_FOR_DISPLAY) {
        return decomposeIfOnlySimplePages(clientNodes);
      }

      let memberNodes = Immutable.Map<Uuid, INode>();

      const hasNotMoreThanFirstMembers: boolean = hasMaxNumberOfMembers(clientNodes, MAX_NODES_FOR_DISPLAY);
      const areSeparatePages: boolean = hasMaxNumberOfMembers(clientNodes, 1);

      if (hasNotMoreThanFirstMembers || areSeparatePages) {
        memberNodes = decomposeCommunity(clientNodes);
      }

      return memberNodes.isEmpty() ? clientNodes : memberNodes;
    }

    default:
      return prevState;
  }
};
