import * as createUuid from 'uuid';
import * as isoFetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import {
  failToFetchNodes,
  requestNodes,
  requestSubNodes,
  succeedToFetchNodes,
} from '../nodesActionCreators';
import { checkStatus } from '../../../_shared/utils/checkStatus';
import { IState } from '../../../_shared/models/IState';
import {
  FilterNodesRoute,
  RouteAccordingToGroupByMode
} from '../../../_shared/constants/routes';

const fetchNodesFactoryDependencies = ({
  nodesSuccess: succeedToFetchNodes,
  error: failToFetchNodes,
  fetch: (route: string) => isoFetch(route, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  fetchBegin: (nodeId?: Uuid) => nodeId ? requestSubNodes(nodeId) : requestNodes(),
  idGenerator: createUuid,
});

export interface IFetchNodesFactoryDependencies {
  readonly nodesSuccess: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly fetch: (route: string) => Promise<Response>;
  readonly fetchBegin: (nodeId?: Uuid) => Action;
  readonly idGenerator: () => string;
}

export const fetchNodesFactory = (dependencies: IFetchNodesFactoryDependencies) =>
  (relevantPhrase?: Uuid, filter?: boolean): any => (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    dispatch(dependencies.fetchBegin(relevantPhrase));
    const errorId = dependencies.idGenerator();
    const groupBy = getState().groupBy;
    const route = filter && relevantPhrase
      ? FilterNodesRoute(groupBy, relevantPhrase)
      : RouteAccordingToGroupByMode(groupBy, relevantPhrase);

    return dependencies.fetch(route)
      .then(response => response.json())
      .then(json => dispatch(dependencies.nodesSuccess(json.data)))
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };

export const fetchNodes = (nodeId?: Uuid) => fetchNodesFactory(fetchNodesFactoryDependencies)(nodeId);
