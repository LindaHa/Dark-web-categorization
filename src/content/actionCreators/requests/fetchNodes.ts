import * as createUuid from 'uuid';
import * as isoFetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import {
  failToFetchNodes,
  requestNodes,
  requestSubComponents,
  succeedToFetchComponents,
  succeedToFetchNodes,
} from '../nodesActionCreators';
import { NodesRoute } from '../../../_shared/constants/routes';
import { checkStatus } from '../../../_shared/utils/checkStatus';

const fetchNodesFactoryDependencies = (componentId?: Uuid) => ({
  fetchBegin: componentId ? () => requestSubComponents(componentId) : requestNodes,
  componentsSuccess: succeedToFetchComponents,
  error: failToFetchNodes,
  fetch: () => isoFetch(NodesRoute(componentId), {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: createUuid,
  nodesSuccess: succeedToFetchNodes,
});

interface IFetchNodesFactoryDependencies {
  readonly componentsSuccess: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly fetch: () => Promise<Response>;
  readonly fetchBegin: () => Action;
  readonly idGenerator: () => string;
  readonly nodesSuccess: (json: object) => Action;
}

export const fetchNodesFactory = (dependencies: IFetchNodesFactoryDependencies) =>
  (): any => (dispatch: Dispatch): Promise<Action> => {
    dispatch(dependencies.fetchBegin());
    const errorId = dependencies.idGenerator();

    return dependencies.fetch()
      .then(response => response.json())
      .then(json => dispatch(dependencies.componentsSuccess(json.data)))
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };

export const fetchNodes = (componentId?: Uuid) => fetchNodesFactory(fetchNodesFactoryDependencies(componentId))();
