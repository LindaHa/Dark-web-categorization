import * as Immutable from 'immutable';
import {
  Nodes_GetComponents_Success,
  Nodes_GetFiltered_Request
} from '../actionTypes/nodesActionTypes';
import {
  convertServerToViewComponentModel,
} from '../utils/convertNodeModel';
import {
  IComponent,
  IComponentServerModel
} from '../../models/component';

export const componentsReducer = (prevState: Immutable.Map<Uuid, IComponent> = Immutable.Map<Url, IComponent>(), action: Action)
  : Immutable.Map<Uuid, IComponent> => {
  switch (action.type) {
    case Nodes_GetFiltered_Request:
    case Nodes_GetComponents_Success: {
      const serverNodes = action.payload.nodes;
      const clientNodes = serverNodes.map((component: IComponentServerModel) =>
        [component.id, convertServerToViewComponentModel(component)]
      );

      return Immutable.Map<Uuid, IComponent>(clientNodes);
    }

    default:
      return prevState;
  }
};
