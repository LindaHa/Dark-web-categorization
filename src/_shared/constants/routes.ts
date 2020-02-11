import { GroupBy } from '../../sidebar/components/Sidebar';

export const RootRoute = 'http://127.0.0.1:8000/api/';
export const GroupByRoute = (mode: GroupByModeRoute) => RootRoute + `pages/${mode}/?format=json`;

export const FilterNodesRoute = (mode: GroupBy, searchPhrase: Url | string) => (
  RouteAccordingToGroupByMode(mode) + `&url_filter=${searchPhrase}`
);

export const RouteAccordingToGroupByMode = (mode: GroupBy, nodeId?: Uuid): string => {
  const nodeIdPath = nodeId ? '&id=' + nodeId : '';
  switch (mode) {
    case GroupBy.Category: {
      return GroupByRoute(GroupByModeRoute.ByCategory) + nodeIdPath;
    }
    case GroupBy.Link: {
      return GroupByRoute(GroupByModeRoute.ByLink) + nodeIdPath;
    }
    default: {
      return '';
    }
  }
};

const DetailsRoute = RootRoute + 'details/';
const PageDetailsRouteBase = DetailsRoute + 'page/?format=json';
const CommunityDetailsRouteBase = DetailsRoute + 'group/?format=json';
const DetailsParametersRoute = (groupBy: GroupBy): string => `&groupby=${groupBy.toLowerCase()}`;

export const PageDetailsRoute = (groupBy: GroupBy): string => {
  return PageDetailsRouteBase + DetailsParametersRoute(groupBy);
};
export const CommunityDetailsRoute = (groupBy: GroupBy): string => CommunityDetailsRouteBase + DetailsParametersRoute(groupBy);

export enum GroupByModeRoute {
  ByCategory = 'bycategory',
  ByLink = 'bylink',
}
