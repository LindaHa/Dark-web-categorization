export const RootRoute = 'http://127.0.0.1:8000/api/';
export const ByLinkRoute = RootRoute + 'pages/bylink/?format=json';
export const ByCategoryRoute = RootRoute + 'pages/bycategory/?format=json';

export const NodesByLinkRoute = (nodeId?: Uuid) => {
  const nodeIdPath = nodeId ? '&id=' + nodeId : '';
  return ByLinkRoute + nodeIdPath;
};

export const NodesByCategoryRoute = (nodeId?: Uuid) => {
  const nodeIdPath = nodeId ? '&id=' + nodeId : '';
  return ByCategoryRoute + nodeIdPath;
};

const DetailsRoute = RootRoute + 'details/';
const PageDetailsRouteBase = DetailsRoute + 'page/?format=json';
const CommunityDetailsRouteBase = DetailsRoute + 'group/?format=json';

export const PageDetailsRoute = (nodeId: Uuid): string => `${PageDetailsRouteBase} + &id=${nodeId};`;
export const CommunityDetailsRoute = (nodeId: Uuid): string => `${CommunityDetailsRouteBase} + &id=${nodeId};`;
