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
import { RouteAccordingToGroupByMode } from '../../../_shared/constants/routes';
import { GroupBy } from '../../../sidebar/components/Sidebar';
import { IFilterOptions } from '../../../sidebar/components/SearchBar';

// const testRoute = 'http://127.0.0.1:8000/api/pages/bylink/?content-type=json&id=3.28';
// const testRoute = 'http://127.0.0.1:8000/api/pages/bylink/?content-type=json&id=2.21.0.0.0'; // only single pages - a lot
// const testRoute = 'http://127.0.0.1:8000/api/pages/bylink/?content-type=json&id=3.0.0.0'; // only communities, only one further zoom in the big one
// const testRoute = 'http://127.0.0.1:8000/api/pages/bylink/?content-type=json&id=1.1.0.24'; // only single pages, one sided links, weird labels
// const testRoute = 'http://127.0.0.1:8000/api/pages/bylink/?content-type=json&id=1.0';
// const testRoute = 'http://127.0.0.1:8000/api/pages/bylink/?content-type=json&id=2.2.3.1';
// const testRoute = 'http://127.0.0.1:8000/api/pages/bylink/?content-type=json&id=0.2';
const fetchNodesFactoryDependencies = ({
  nodesSuccess: succeedToFetchNodes,
  error: failToFetchNodes,
  fetch: (_route: string) => isoFetch(_route, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  fetchBegin: (nodeId?: Uuid) => nodeId ? requestSubNodes(nodeId) : requestNodes(),
  idGenerator: createUuid,
  getRoute: RouteAccordingToGroupByMode,
});

export interface IFetchNodesFactoryDependencies {
  readonly nodesSuccess: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly fetch: (route: string, filterOptions?: IFilterOptions) => Promise<Response>;
  readonly fetchBegin: (nodeId?: Uuid) => Action;
  readonly idGenerator: () => string;
  readonly getRoute: (groupBy: GroupBy, nodeId?: Uuid) => Url;
}

export const fetchNodesFactory = (dependencies: IFetchNodesFactoryDependencies) =>
  (relevantPhrase?: Uuid, filterOptions?: IFilterOptions): any => (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    dispatch(dependencies.fetchBegin(relevantPhrase));
    const errorId = dependencies.idGenerator();
    const groupBy = getState().groupBy;
    const route = dependencies.getRoute(groupBy, relevantPhrase);

    return dependencies.fetch(route, filterOptions)
      .then(response => response.json())
      .then(json => dispatch(dependencies.nodesSuccess(json.data)))
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };

export const fetchNodes = (nodeId?: Uuid) => fetchNodesFactory(fetchNodesFactoryDependencies)(nodeId);
