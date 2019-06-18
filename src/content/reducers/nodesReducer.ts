import * as Immutable from 'immutable';
import {
  Nodes_GetAll_Success,
  Nodes_GetFiltered_Request
} from '../actionTypes/nodesActionTypes';
import {
  IPage,
  IPageServerModel
} from '../../models/page';
import { convertServerToViewPageModel } from '../utils/convertNodeModel';

export const nodesReducer = (prevState: Immutable.Map<Uuid, IPage> = Immutable.Map<Uuid, IPage>(), action: Action)
  : Immutable.Map<Uuid, IPage> => {
  switch (action.type) {
    case Nodes_GetAll_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes = serverNodes.map((node: IPageServerModel) =>
        [node.id, convertServerToViewPageModel(node)]
      );

      return Immutable.Map<Uuid, IPage>(clientNodes);
    }

    case Nodes_GetFiltered_Request: {
      const { searchPhrase } = action.payload;
      const serverNode = prevState.filter((value: IPage) =>
        value.url.includes(searchPhrase));

      return serverNode;
    }

    default:
      return prevState;
  }
};
