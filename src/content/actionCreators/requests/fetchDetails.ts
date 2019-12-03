import * as createUuid from 'uuid';
import * as isoFetch from 'isomorphic-fetch';
import { checkStatus } from '../../../_shared/utils/checkStatus';
import {
  CommunityDetailsRoute,
  PageDetailsRoute
} from '../../../_shared/constants/routes';
import {
  failToFetchCommunityDetails,
  failToFetchPageDetails,
  requestCommunityDetails,
  requestPageDetails,
  succeedToFetchCommunityDetails,
  succeedToFetchPageDetails
} from '../detailsActionCreators';
import { fetchDetailsFactory } from './fetchDetailsFactory';

const fetchPageDetailsFactoryDependencies = ({
  fetchSuccess: succeedToFetchPageDetails,
  error: failToFetchPageDetails,
  createRoute: PageDetailsRoute,
  fetch: (route: Url) => isoFetch(route, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  fetchBegin: requestPageDetails,
  idGenerator: createUuid,
});

export const fetchPageDetails = fetchDetailsFactory(fetchPageDetailsFactoryDependencies);

const fetchCommunityDetailsFactoryDependencies = ({
  fetchSuccess: succeedToFetchCommunityDetails,
  error: failToFetchCommunityDetails,
  createRoute: CommunityDetailsRoute,
  fetch: (route: Url) => isoFetch(route, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  fetchBegin: requestCommunityDetails,
  idGenerator: createUuid,
});

export const fetchCommunityDetails = fetchDetailsFactory(fetchCommunityDetailsFactoryDependencies);
