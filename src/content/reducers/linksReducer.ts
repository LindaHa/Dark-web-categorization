import * as Immutable from 'immutable';
import {
  Nodes_GetAll_Success,
  Nodes_GetFiltered_Request
} from '../actionTypes/nodesActionTypes';
import { getLinksForNodes } from '../utils/getLinksFromArray';
import { convertServerToViewPageModel } from '../utils/convertNodeModel';
import { ILink } from '../../models/link';
import {
  IPage,
  IPageServerModel
} from '../../models/page';
import { mockPages } from './mockData';

export const linksReducer = (prevState: Immutable.Set<ILink> = Immutable.Set(), action: Action): Immutable.Set<ILink> => {
  switch (action.type) {
    case Nodes_GetAll_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes = serverNodes.map((node: IPageServerModel) => convertServerToViewPageModel(node));

      const links = getLinksForNodes(clientNodes);
      return links;
    }

    case Nodes_GetFiltered_Request: {
      const { searchPhrase } = action.payload;
      const nodes = mockPages
        .filter((value: IPage) => value.url.startsWith(searchPhrase));
      const links = getLinksForNodes(nodes);

      return links;
    }

    default:
      return prevState;
  }
};
