import * as Immutable from 'immutable';
import {
  INode,
  Node,
} from '../../models/node';
import {
  MAX_COMMUNITIES_FOR_DISPLAY,
  MAX_NODES_FOR_DISPLAY
} from '../constants/graphConstants';

const getFirstMEmbersKeys = (nodes: Immutable.Map<Url, INode>): Immutable.Set<Url> => {
  let firstMembersKeys: Immutable.Set<Url> = Immutable.Set<Url>();
  nodes.forEach((node: INode) => {
    const firstMembers = node.firstMembers.map((member: INode) => member.id);
    firstMembersKeys = firstMembersKeys.concat(firstMembers);
  });

  return firstMembersKeys;
};

const getCommonIdFromOne = (id: Url | Uuid): Uuid | null => {
  const parentIds = id.split('.');
  const parentId = parentIds
    .slice(0, parentIds.length - 1)
    .join('.');

  return parentId;
};

const getCommonId = (nodes: Immutable.Map<Url, INode>): Uuid | null => {
  const deputyMember = nodes.first(null);
  if (!deputyMember) {
    return null;
  }

  return getCommonIdFromOne(deputyMember.id);
};

const getDecomposedLinks = (
  member: INode,
  commonId: Uuid,
  memberKeys: Immutable.Set<Url>
): Immutable.Set<Url> => {
  const decomposedLinks: Immutable.Set<Url> = member.links
    .filter((link: Url) => memberKeys.contains(link))
    .map((link: Url) => (`${commonId} ${link}`));

  return decomposedLinks;
};

export const decomposeCommunityIfPossible = (nodes: Immutable.Map<Uuid, INode>) => {
  if (nodes.size > MAX_COMMUNITIES_FOR_DISPLAY) {
    return decomposeIfOnlySimplePages(nodes);
  }

  let memberNodes = Immutable.Map<Uuid, INode>();

  const hasNotMoreThanFirstMembers: boolean = hasMaxNumberOfMembers(nodes, MAX_NODES_FOR_DISPLAY);
  const areSeparatePages: boolean = hasMaxNumberOfMembers(nodes, 1);

  if (hasNotMoreThanFirstMembers || areSeparatePages) {
    memberNodes = decomposeCommunity(nodes);
  }

  return memberNodes.isEmpty() ? nodes : memberNodes;
};


const decomposeCommunity = (nodes: Immutable.Map<Url, INode>): Immutable.Map<Url, INode> => {
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


const hasMaxNumberOfMembers = (nodes: Immutable.Map<Url, INode>, relevantNumber: number): boolean => (
  nodes
    .map((node: INode) => node.membersCount <= relevantNumber)
    .every((item: boolean) => item)
);

const decomposeIfOnlySimplePages = (nodes: Immutable.Map<Url, INode>): Immutable.Map<Url, INode> => {
  if (hasMaxNumberOfMembers(nodes, 1)) {
    return decomposeCommunity(nodes);
  }

  return nodes;
};
