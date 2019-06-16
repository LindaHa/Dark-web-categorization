import * as Immutable from 'immutable';
import { Nodes_GetAll_Success } from '../actionTypes/nodesActionTypes';
import { getLinksForNodes } from '../utils/getLinksFromArray';
import { convertServerToViewPageModel } from '../utils/convertNodeModel';
import { ILink } from '../../models/link';
import { IPageServerModel } from '../../models/page';

export const linksReducer = (prevState: Immutable.Set<ILink> = Immutable.Set(), action: Action): Immutable.Set<ILink> => {
  switch (action.type) {
    case Nodes_GetAll_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes = serverNodes.map((node: IPageServerModel) => convertServerToViewPageModel(node));

      const links = getLinksForNodes(clientNodes);
      return links;
    }

    default:
      return prevState;
  }
};
