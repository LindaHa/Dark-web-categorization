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

  node: {
    color: primaryNodeColor,
    size: 120,
    highlightStrokeColor: primaryNodeColor,
    highlightColor: highlightNodeColor,

    fontColor: primaryFontColor,
    highlightFontSize: 16,
    fontSize: 13,
  },

  link: {
    color: primaryLinkColor,
    highlightColor: highlightLinkColor,
    strokeWidth: 1,
  },

  height: 700,
  width: 1000,
};

export const getLabelConfigForComponents = (nodes: Immutable.Map<string, IComponent>) => (node: IGraphNode): string => {
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
