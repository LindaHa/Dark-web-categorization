import * as createUuid from 'uuid';
import * as isoFetch from 'isomorphic-fetch';
import {
  failToFetchFilteredNodes,
  requestFilteredNodes,
  succeedToFetchFilteredNodes,
} from '../nodesActionCreators';
import { checkStatus } from '../../../_shared/utils/checkStatus';
import { fetchNodesFactory } from './fetchNodes';

const fetchNodesFactoryDependencies = {
  fetchBegin: requestFilteredNodes,
  nodesSuccess: succeedToFetchFilteredNodes,
  error: failToFetchFilteredNodes,
  fetch: (route: string) => isoFetch(route, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: createUuid,
};

export const filterNodes = (searchPhrase: string) => fetchNodesFactory(fetchNodesFactoryDependencies)(searchPhrase, true);
