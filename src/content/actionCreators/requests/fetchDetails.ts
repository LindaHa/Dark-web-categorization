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
import {
  convertServerCommunityDetailsToClientCommunityDetails,
  convertServerPageDetailsToClientPageDetails,
} from '../../utils/convertDetails';
import { INodeDetailsOptions } from '../../../sidebar/components/CommunityDetailsOptions';
import { IPageDetailsOptions } from '../../../sidebar/components/PageDetailsOptions';

const fetchPageDetailsFactoryDependencies = ({
  fetchSuccess: succeedToFetchPageDetails,
  error: failToFetchPageDetails,
  createRoute: PageDetailsRoute,
  convertToClientModel: convertServerPageDetailsToClientPageDetails,
  fetch: (options: INodeDetailsOptions | IPageDetailsOptions, route: Url) => isoFetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
    },
    body: JSON.stringify(options),
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
  fetch: (options: INodeDetailsOptions, route: Url) => isoFetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
    },
    body: JSON.stringify(options)
  })
    .then(response => checkStatus(response)),
  fetchBegin: requestCommunityDetails,
  idGenerator: createUuid,
});

export const fetchCommunityDetails =  (options: INodeDetailsOptions) => fetchDetailsFactory(fetchCommunityDetailsFactoryDependencies)(options);
