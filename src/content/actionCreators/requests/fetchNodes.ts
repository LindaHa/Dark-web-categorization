import * as createUuid from 'uuid';
import * as isoFetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import {
  failToFetchNodes,
  requestNodes,
  requestSubComponents,
  succeedToFetchComponents,
  succeedToFetchNodes,
  updateNodesMode
} from '../nodesActionCreators';
import { NodesRoute } from '../../../_shared/constants/routes';
import { checkStatus } from '../../../_shared/utils/checkStatus';
import { NodeMode } from '../../../models/stateModels';

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
  updateNodeMode: updateNodesMode,
});

interface IFetchNodesFactoryDependencies {
  readonly componentsSuccess: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly fetch: () => Promise<Response>;
  readonly fetchBegin: () => Action;
  readonly idGenerator: () => string;
  readonly nodesSuccess: (json: object) => Action;
  readonly updateNodeMode: (mode: NodeMode) => Action;
}

export const fetchNodesFactory = (dependencies: IFetchNodesFactoryDependencies) =>
  (): any => (dispatch: Dispatch): Promise<Action> => {
    dispatch(dependencies.fetchBegin());
    const errorId = dependencies.idGenerator();

    return dependencies.fetch()
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.lowestLevel) {
          dispatch(dependencies.updateNodeMode(NodeMode.Pages));
          return dispatch(dependencies.nodesSuccess(json.data));
        } else {
          dispatch(dependencies.updateNodeMode(NodeMode.Components));
          return dispatch(dependencies.componentsSuccess(json.data));
        }
      })
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };

export const fetchNodes = (componentId?: Uuid) => fetchNodesFactory(fetchNodesFactoryDependencies(componentId))();
