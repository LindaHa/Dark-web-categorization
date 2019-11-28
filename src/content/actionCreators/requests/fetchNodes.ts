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
import { GroupBy } from '../../../sidebar/components/Sidebar';
import { IState } from '../../../_shared/models/IState';
import {
  NodesByCategoryRoute,
  NodesByLinkRoute
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

interface IFetchNodesFactoryDependencies {
  readonly nodesSuccess: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly fetch: (route: string) => Promise<Response>;
  readonly fetchBegin: (nodeId?: Uuid) => Action;
  readonly idGenerator: () => string;
}

const getRouteAccordingToGroupBy = (groupBy: string) => {
  if (groupBy === GroupBy.Category) {
    return (nodeId?: string) => NodesByCategoryRoute(nodeId);
  } else  {
    return (nodeId?: string) => NodesByLinkRoute(nodeId);
  }
};

export const fetchNodesFactory = (dependencies: IFetchNodesFactoryDependencies) =>
  (nodeId?: Uuid): any => (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    dispatch(dependencies.fetchBegin(nodeId));
    const errorId = dependencies.idGenerator();
    const groupBy = getState().groupBy;
    const route = getRouteAccordingToGroupBy(groupBy)(nodeId);

    return dependencies.fetch(route)
      .then(response => response.json())
      .then(json => dispatch(dependencies.nodesSuccess(json.data)))
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };

export const fetchNodes = (nodeId?: Uuid) => fetchNodesFactory(fetchNodesFactoryDependencies)(nodeId);
