import * as createUuid from 'uuid';
import * as isoFetch from 'isomorphic-fetch';
import { Dispatch } from 'redux';
import {
  failToFetchNodes,
  requestNodes,
  succeedToFetchComponents,
  succeedToFetchNodes
} from '../nodesActionCreators';
import { PagesRoute } from '../../../_shared/constants/routes';
import { checkStatus } from '../../../_shared/utils/checkStatus';

const fetchNodesFactoryDependencies = {
  fetchBegin: requestNodes,
  nodesSuccess: succeedToFetchNodes,
  componentsSuccess: succeedToFetchComponents,
  error: failToFetchNodes,
  fetch: () => isoFetch(PagesRoute, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: createUuid,
};

interface IFetchNodesFactoryDependencies {
  readonly fetchBegin: () => Action;
  readonly nodesSuccess: (json: object) => Action;
  readonly componentsSuccess: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly fetch: () => Promise<Response>;
  readonly idGenerator: () => string;
}

export const fetchNodesFactory = (dependencies: IFetchNodesFactoryDependencies) =>
  (): any => (dispatch: Dispatch): Promise<Action> => {
    dispatch(dependencies.fetchBegin());
    const errorId = dependencies.idGenerator();

    return dependencies.fetch()
      .then(response => {
        return response.json();
      })
      // .then(nodes => nodes.lowestLevel ? dispatch(dependencies.nodesSuccess(nodes)) : dispatch(dependencies.componentsSuccess(nodes)))
      .then(nodes => {
        return dispatch(dependencies.componentsSuccess(nodes));
      })
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };

export const fetchNodes = fetchNodesFactory(fetchNodesFactoryDependencies);
