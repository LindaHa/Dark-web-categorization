import * as Immutable from 'immutable';
import {
  INode,
  Node,
} from '../../models/node';
import { MAX_NODES_FOR_DISPLAY } from '../constants/graphConstants';

const getFirstMEmbersKeys = (nodes: Immutable.Map<Url, INode>): Immutable.Set<Url> => {
  let firstMembersKeys: Immutable.Set<Url> = Immutable.Set<Url>();
  nodes.forEach((node: INode) => {
    const firstMembers = node.firstMembers.map((member: INode) => member.id);
    firstMembersKeys = firstMembersKeys.concat(firstMembers);
  });

  return firstMembersKeys;
};

const getCommonId = (nodes: Immutable.Map<Url, INode>): Uuid | null => {
  const deputyMember = nodes.first(null);
  if (!deputyMember) {
    return null;
  }

  const parentIds = deputyMember.id.split('.');
  const parentId = parentIds
    .slice(0, parentIds.length - 1)
    .join('.');

  return parentId;
};

const getDecomposedLinks = (
  member: INode,
  commonId: Uuid,
  memberKeys: Immutable.Set<Url>
): Immutable.Set<Url> => {
  const decomposedLinks: Immutable.Set<Url> = member.links
    .filter((link: Url) => memberKeys.contains(link))
    .map((link: Url) => (`${commonId} ${link} `));

  return decomposedLinks;
};

export const decomposeCommunity = (nodes: Immutable.Map<Url, INode>): Immutable.Map<Url, INode> => {
  let memberNodes = Immutable.Map<Uuid, INode>();
  const firstMembersKeys = getFirstMEmbersKeys(nodes);
  const commonId = getCommonId(nodes);

  if (!commonId) {
    return Immutable.Map<Url, INode>();
  }

  nodes.valueSeq().forEach((node: INode) => {
    if (node.firstMembers.count() <= MAX_NODES_FOR_DISPLAY) {
      node.firstMembers.forEach((member: INode) => {
        const decomposedLinks = getDecomposedLinks(member, commonId, firstMembersKeys);

        const decomposedMember: INode = new Node({
          id: `${commonId} ${member.id}`,
          categories: member.categories,
          links: decomposedLinks,
          firstMembers: Immutable.List<INode>([member]),
          membersCount: member.membersCount,
        });
        memberNodes = memberNodes.set(decomposedMember.id, decomposedMember);
      });
    }
  });

  return memberNodes;
};
