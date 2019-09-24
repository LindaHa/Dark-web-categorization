import * as Immutable from 'immutable';
import {
  Nodes_GetFiltered_Request,
  Nodes_GetNodes_Success
} from '../actionTypes/nodesActionTypes';
import { convertCommunityServerToViewNodeModel, } from '../utils/convertNodeModel';
import {
  ICommunityServerModel,
  INode
} from '../../models/node';
import { MAX_NODES_FOR_DISPLAY } from '../constants/graphConstants';
import { decomposeCommunity } from '../utils/decomposeCommunity';

export const nodesReducer = (prevState: Immutable.Map<Uuid, INode> = Immutable.Map<Url, INode>(), action: Action)
  : Immutable.Map<Uuid, INode> => {
  switch (action.type) {
    case Nodes_GetFiltered_Request:
    case Nodes_GetNodes_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes: Immutable.Map<Url, INode> = Immutable.Map<Url, INode>(
        serverNodes.map((node: ICommunityServerModel) =>
          [node.id, convertCommunityServerToViewNodeModel(node)]
        )
      );

      let memberNodes = Immutable.Map<Uuid, INode>();
      const hasMoreThanFirstMembers: boolean = clientNodes
        .map((node: INode) => node.membersCount <= MAX_NODES_FOR_DISPLAY)
        .every((item: boolean) => item);

      if (hasMoreThanFirstMembers) {
        memberNodes = decomposeCommunity(clientNodes);
      }

      const finalNodes = memberNodes.isEmpty() ? clientNodes : memberNodes;
      return finalNodes;
    }

    default:
      return prevState;
  }
};
