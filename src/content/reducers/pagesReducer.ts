import * as Immutable from 'immutable';
import {
  Nodes_GetAll_Success,
  Nodes_GetFiltered_Request
} from '../actionTypes/nodesActionTypes';
import {
  IPage,
  IPageServerModel
} from '../../models/page';
import { convertServerPageToViewNodeModel } from '../utils/convertNodeModel';
import { mockPages } from './mockData';

export const pagesReducer = (prevState: Immutable.Map<Uuid, IPage> = Immutable.Map<Uuid, IPage>(), action: Action)
  : Immutable.Map<Uuid, IPage> => {
  switch (action.type) {
    case Nodes_GetAll_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes = serverNodes.map((node: IPageServerModel) =>
        [node.id, convertServerPageToViewNodeModel(node)]
      );

      return Immutable.Map<Uuid, IPage>(clientNodes);
    }

    case Nodes_GetFiltered_Request: {
      const { searchPhrase } = action.payload;
      let realNodes = Immutable.Map<Uuid, IPage>();
      const nodes = mockPages
        .filter((value: IPage) => value.url.includes(searchPhrase));

      nodes.forEach((value: IPage) => {
        realNodes = realNodes.set(value.id, value);
      });

      return realNodes;
    }

    default:
      return prevState;
  }
};
