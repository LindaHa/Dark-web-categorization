import * as Immutable from 'immutable';
import * as uuid from 'uuid';
import {
  ILink,
  Link
} from '../../models/link';
import { INode } from '../../models/node';

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

    // If the node has no children insert a link to the Fake node
    return wholeLinks;
  };

export const getLinksForNodes = (nodes: Immutable.Map<Uuid, INode>): Immutable.Set<ILink> => {
  let links = Immutable.Set<ILink>();
  nodes.valueSeq().forEach((node: INode) => {
    let linksOfNode = Immutable.Set<Url>();
    node.links.forEach((link: Url) => {
      const doesLinkExist = nodes.get(link);
      if (doesLinkExist) {
        linksOfNode = linksOfNode.add(link);
      }
    });

    const linksPerNode = getLinksFromArray(uuid)(node.id, linksOfNode);
    links = links.union(linksPerNode);
  });

  return links;
};
