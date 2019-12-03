import { GroupBy } from '../../sidebar/components/Sidebar';

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
const DetailsParametersRoute = (nodeId: Uuid, groupBy: GroupBy): string => `&id=${nodeId}&groupby=${groupBy.toLowerCase()}`;

export const PageDetailsRoute = (nodeId: Uuid, groupBy: GroupBy): string => {
  const pageId = nodeId.split(' ')[1];
  return PageDetailsRouteBase + DetailsParametersRoute(pageId, groupBy);
};
export const CommunityDetailsRoute = (nodeId: Uuid, groupBy: GroupBy): string => CommunityDetailsRouteBase + DetailsParametersRoute(nodeId, groupBy);
