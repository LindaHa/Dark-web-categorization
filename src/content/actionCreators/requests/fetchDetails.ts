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
import {
  fetchDetailsFactory,
  IDetailsPayload
} from './fetchDetailsFactory';
import {
  convertServerCommunityDetailsToClientCommunityDetails,
  convertServerPageDetailsToClientPageDetails,
} from '../../utils/convertDetails';
import { INodeDetailsOptions } from '../../../sidebar/components/CommunityDetailsOptions';

const fetchPageDetailsFactoryDependencies = ({
  fetchSuccess: succeedToFetchPageDetails,
  error: failToFetchPageDetails,
  createRoute: PageDetailsRoute,
  convertToClientModel: convertServerPageDetailsToClientPageDetails,
  fetch: (payload: IDetailsPayload, route: Url) => isoFetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => checkStatus(response)),
  fetchBegin: requestPageDetails,
  idGenerator: createUuid,
});

export const fetchPageDetails = (options: INodeDetailsOptions) => fetchDetailsFactory(fetchPageDetailsFactoryDependencies)(options);

const fetchCommunityDetailsFactoryDependencies = ({
  fetchSuccess: succeedToFetchCommunityDetails,
  error: failToFetchCommunityDetails,
  createRoute: CommunityDetailsRoute,
  convertToClientModel: convertServerCommunityDetailsToClientCommunityDetails,
  fetch: (payload: IDetailsPayload, route: Url) => isoFetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
    },
    body: JSON.stringify(payload)
  })
    .then(response => checkStatus(response)),
  fetchBegin: requestCommunityDetails,
  idGenerator: createUuid,
});

export const fetchCommunityDetails =  (options: INodeDetailsOptions) => fetchDetailsFactory(fetchCommunityDetailsFactoryDependencies)(options);
