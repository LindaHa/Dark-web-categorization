import * as createUuid from 'uuid';
import * as isoFetch from 'isomorphic-fetch';
import {
  failToFetchFilteredNodes,
  requestFilteredNodes,
  succeedToFetchFilteredNodes,
} from '../nodesActionCreators';
import { checkStatus } from '../../../_shared/utils/checkStatus';
import { IFilterOptions } from '../../../sidebar/components/SearchBar';
import {
  fetchNodesFactory,
  IFetchNodesFactoryDependencies
} from './fetchNodes';
import { FilterNodesRoute } from '../../../_shared/constants/routes';

const filterNodesFactoryDependencies: IFetchNodesFactoryDependencies = {
  fetchBegin: requestFilteredNodes,
  nodesSuccess: succeedToFetchFilteredNodes,
  error: failToFetchFilteredNodes,
  fetch: (route: string, filterOptions: IFilterOptions) => isoFetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
    },
    body: JSON.stringify({ options: filterOptions })
  })
    .then(response => checkStatus(response)),
  idGenerator: createUuid,
  getRoute: FilterNodesRoute,
};

export const filterNodes = (searchPhrase: string, options: IFilterOptions) => fetchNodesFactory(filterNodesFactoryDependencies)(searchPhrase, options);

export enum FilterOptions {
  Url = 'Url',
  Content = 'Content',
}
