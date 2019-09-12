// import * as createUuid from 'uuid';
// import * as isoFetch from 'isomorphic-fetch';
// import { Dispatch } from 'redux';
// import {
//   failToFetchFilteredNodes,
//   requestFilteredNodes,
//   succeedToFetchFilteredNodes,
// } from '../nodesActionCreators';
// import { PagesRoute } from '../../../_shared/constants/routes';
// import { checkStatus } from '../../../_shared/utils/checkStatus';
//
// const fetchNodesFactoryDependencies = {
//   fetchBegin: requestFilteredNodes,
//   nodesSuccess: succeedToFetchFilteredNodes,
//   error: failToFetchFilteredNodes,
//   fetch: () => isoFetch(PagesRoute, {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//     },
//   })
//     .then(response => checkStatus(response)),
//   idGenerator: createUuid,
// };
//
// interface IFetchNodesFactoryDependencies {
//   readonly fetchBegin: () => Action;
//   readonly nodesSuccess: (json: object) => Action;
//   readonly error: (name: string, error: Error) => Action;
//   readonly fetch: () => Promise<Response>;
//   readonly idGenerator: () => string;
// }
//
// export const fetchNodesFactory = (dependencies: IFetchNodesFactoryDependencies) =>
//   (): any => (dispatch: Dispatch): Promise<Action> => {
//     dispatch(dependencies.fetchBegin());
//     const errorId = dependencies.idGenerator();
//
//     return dependencies.fetch()
//       .then(response => response.json())
//       .then(pages => dispatch(dependencies.nodesSuccess(pages)))
//       .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
//   };
//
// export const fetchNodes = fetchNodesFactory(fetchNodesFactoryDependencies);
