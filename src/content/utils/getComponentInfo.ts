import * as Immutable from 'immutable';
import { INode } from '../../models/node';

export const getUrlsFromMembers = (nodes?: Immutable.List<INode>): Immutable.Set<string> => {
  let urls = Immutable.Set<string>();

  if (nodes) {
    nodes.forEach((node: INode) => urls = urls.add(node.id));
  }

  return urls;
};
