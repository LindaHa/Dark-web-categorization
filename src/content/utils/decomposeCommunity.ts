import * as Immutable from 'immutable';
import {
  INode,
  Node,
} from '../../models/node';
import { MAX_NODES_FOR_DISPLAY } from '../constants/graphConstants';

export const decomposeCommunity = (nodes: Immutable.Map<Url, INode>): Immutable.Map<Url, INode> => {
  let memberNodes = Immutable.Map<Uuid, INode>();
  let firstMembersKeys: Immutable.Set<Url> = Immutable.Set<Url>();

  nodes.forEach((node: INode) => {
    const firstMembers = node.firstMembers.map((member: INode) => member.id);
    firstMembersKeys = firstMembersKeys.concat(firstMembers);
  });

  nodes.valueSeq().forEach((node: INode) => {
    if (node.firstMembers.count() <= MAX_NODES_FOR_DISPLAY) {
      node.firstMembers.forEach((member: INode) => {
        let decomposedLinks = Immutable.Set<Url>();
        member.links.forEach((link: Url) => {
          if (firstMembersKeys.contains(link)) {
            decomposedLinks = decomposedLinks.add(`${node.id} ${link} `);
          }
        });
        const decomposedMember: INode = new Node({
          id: `${node.id} ${member.id} `,
          categories: member.categories,
          links: decomposedLinks,
          firstMembers: member.firstMembers,
          membersCount: member.membersCount,
        });
        memberNodes = memberNodes.set(decomposedMember.id, decomposedMember);
      });
    }
  });

  return memberNodes;
};
