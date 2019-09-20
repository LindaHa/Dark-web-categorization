export const RootRoute = 'http://127.0.0.1:8000/api/';
export const PagesRoute = RootRoute + 'pages/?format=json';

export const NodesRoute = (nodeId?: Uuid) => {
  const nodeIdPath = nodeId ? '&id=' + nodeId : '';
  return PagesRoute + nodeIdPath;
};
