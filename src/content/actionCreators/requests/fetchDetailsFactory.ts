import { Dispatch } from 'redux';
import { IState } from '../../../_shared/models/IState';
import { GroupBy } from '../../../sidebar/components/Sidebar';


export interface IFetchDetailsFactoryDependencies {
  readonly fetchSuccess: (json: object) => Action;
  readonly createRoute: (nodeId: Uuid, groupBy: GroupBy) => Url;
  readonly convertToClientModel: (serverModel: object) => object;
  readonly error: (id: Uuid, error: Error) => Action;
  readonly fetch: (route: Url) => Promise<Response>;
  readonly fetchBegin: (nodeId?: Uuid) => Action;
  readonly idGenerator: () => string;
}

export const fetchDetailsFactory = (dependencies: IFetchDetailsFactoryDependencies) =>
  (): any => (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    const { selectedNodeId, groupBy } = getState();
    dispatch(dependencies.fetchBegin(selectedNodeId));
    const errorId = dependencies.idGenerator();
    const route = dependencies.createRoute(selectedNodeId, groupBy);

    return dependencies.fetch(route)
      .then(response => response.json())
      .then(json => dispatch(dependencies.fetchSuccess(dependencies.convertToClientModel(json.data))))
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };
