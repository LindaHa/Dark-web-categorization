import * as Immutable from 'immutable';
import * as uuid from 'uuid';
import {
  ILink,
  Link
} from '../../models/link';
import { IPage } from '../../models/page';
import { IComponent } from '../../models/component';

const getLinksFromArray = (_idGenerator: () => Uuid) =>
  (nodeId: Uuid, links: Immutable.Set<Url>): Immutable.Set<ILink> => {
    let wholeLinks = Immutable.Set<ILink>();
    links.forEach((link: Url) => {
      if (link) {
        const wholeLink = new Link({
          // name: idGenerator(),
          source: nodeId,
          target: link
        });
        wholeLinks = wholeLinks.add(wholeLink);
      }
    });

    return wholeLinks;
  };

export const getLinksForNodes = (nodes: Immutable.Set<IPage | IComponent>): Immutable.Set<ILink> => {
  let links = Immutable.Set<ILink>();
  nodes.forEach((node: IPage | IComponent) => {
    const linksPerNode = getLinksFromArray(uuid)(node.id, node.links);
    links = links.union(linksPerNode);
  });

  return links;
};
