import * as createUuid from 'uuid';
import * as isoFetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import {
  failToFetchNodes,
  requestNodes,
  requestSubNodes,
  succeedToFetchNodes,
} from '../nodesActionCreators';
import { NodesRoute } from '../../../_shared/constants/routes';
import { checkStatus } from '../../../_shared/utils/checkStatus';

const fetchNodesFactoryDependencies = (nodeId?: Uuid) => ({
  fetchBegin: nodeId ? () => requestSubNodes(nodeId) : requestNodes,
  nodesSuccess: succeedToFetchNodes,
  error: failToFetchNodes,
  fetch: () => isoFetch(NodesRoute(nodeId), {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: createUuid,
});

interface IFetchNodesFactoryDependencies {
  readonly nodesSuccess: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly fetch: () => Promise<Response>;
  readonly fetchBegin: () => Action;
  readonly idGenerator: () => string;
}

export const fetchNodesFactory = (dependencies: IFetchNodesFactoryDependencies) =>
  (): any => (dispatch: Dispatch): Promise<Action> => {
    dispatch(dependencies.fetchBegin());
    const errorId = dependencies.idGenerator();

    return dependencies.fetch()
      .then(response => response.json())
      .then(json => dispatch(dependencies.nodesSuccess(json.data)))
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };

export const fetchNodes = (nodeId?: Uuid) => fetchNodesFactory(fetchNodesFactoryDependencies(nodeId))();
