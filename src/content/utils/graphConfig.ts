import * as Immutable from 'immutable';
import {
  highlightLinkColor,
  highlightNodeColor,
  primaryFontColor,
  primaryLinkColor,
  primaryNodeColor
} from '../../_shared/constants/styles';
import { IGraphNode } from 'react-d3-graph';
import { IComponent } from '../../models/component';
import { IPage } from '../../models/page';

export const graphConfig = {
  collapsible: false,
  nodeHighlightBehavior: true,
  directed: true,
  staticGraph: false,

  node: {
    color: primaryNodeColor,
    size: 100,
    highlightStrokeColor: primaryNodeColor,
    highlightColor: highlightNodeColor,
    highlightDegree: 0,

    fontColor: primaryFontColor,
    highlightFontSize: 16,
    fontSize: 11,
  },

  link: {
    color: primaryLinkColor,
    highlightColor: highlightLinkColor,
    strokeWidth: 1,
  },

  d3: {
    gravity: -200,
  },

  height: window.innerHeight,
  width: window.innerWidth / 3 * 2,
};

export const getLabelConfigForComponents = (nodes: Immutable.Map<string, IComponent>) => (node: IGraphNode): string => {
  // The fake node will have a no label
  if (node.id === fakeNodeId) {
    return '';
  }
  const clientNode = nodes.get(node.id);
  if (!clientNode) {
    return node.id;
  }
  const members = clientNode.members;
  const numberOfMembers: number = members.count();
  if (numberOfMembers === 1) {
    const member = members.first(null);
    return member ? member.url : 'url not set';
  }

  return numberOfMembers.toString() + ' onions';
};

export const getLabelConfigForPages = (nodes: Immutable.Map<string, IPage>) => (node: IGraphNode): string => {
  const clientNode = nodes.get(node.id);
  return clientNode ? clientNode.url : node.id;
};

// The fake node and links to that node will not be visible.
// This is because react-d3-graph doesn't support orphaned nodes - nodes without any links
// Now orphaned nodes are displayed properly and not in the upper left corner all in the same spot
const Min_Value = Number.MIN_VALUE;
export const fakeNodeId = '00000000-0000-0000-0000-000000000000';
export const fakeNode = {
  id: fakeNodeId,
  size: Min_Value,
};
export const getFakeLink = (target: Url) => ({
  source: fakeNodeId,
  target,
  opacity: Min_Value,
  strokeWidth: Min_Value,
});
