import * as Immutable from 'immutable';
import * as uuid from 'uuid';
import {
  ILink,
  Link
} from '../../models/link';
import { IPage } from '../../models/page';

const getLinksFromArray = (_idGenerator: () => Uuid) =>
  (nodeId: Uuid, linkIds: Immutable.Set<Uuid>): Immutable.Set<ILink> => {
    let links = Immutable.Set<ILink>();
    linkIds.forEach((id: Uuid) => {
      if (id) {
        const link = new Link({
          // id: idGenerator(),
          source: nodeId,
          target: id
        });
        links = links.add(link);
      }
    });

    return links;
  };

export const getLinksForNodes = (nodes: Immutable.Set<IPage>): Immutable.Set<ILink> => {
  let links = Immutable.Set<ILink>();
  nodes.forEach((node: IPage) => {
    const linksPerNode = getLinksFromArray(uuid)(node.id, node.links);
    links = links.union(linksPerNode);
  });

  return links;
};
