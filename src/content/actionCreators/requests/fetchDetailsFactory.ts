import { Dispatch } from 'redux';
import { IState } from '../../../_shared/models/IState';


export interface IFetchDetailsFactoryDependencies {
  readonly fetchSuccess: (json: object) => Action;
  readonly createRoute: (nodeId: Uuid) => Url;
  readonly error: (id: Uuid, error: Error) => Action;
  readonly fetch: (route: Url) => Promise<Response>;
  readonly fetchBegin: (nodeId?: Uuid) => Action;
  readonly idGenerator: () => string;
}

export const fetchDetailsFactory = (dependencies: IFetchDetailsFactoryDependencies) =>
  (): any => (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    const nodeId = getState().selectedNodeId;
    dispatch(dependencies.fetchBegin(nodeId));
    const errorId = dependencies.idGenerator();
    const route = dependencies.createRoute(nodeId);

    return dependencies.fetch(route)
      .then(response => response.json())
      .then(json => dispatch(dependencies.fetchSuccess(json.data)))
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };
