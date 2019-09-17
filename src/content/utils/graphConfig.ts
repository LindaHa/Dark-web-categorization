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

export const graphConfig = {
  collapsible: false,
  nodeHighlightBehavior: true,
  directed: true,
  staticGraph: false,

  node: {
    color: primaryNodeColor,
    size: 10,
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

  height: window.innerHeight - 40,
  width: window.innerWidth / 3 * 2.19,
};

export const getLabelConfigForNodes = (nodes: Immutable.Map<string, IComponent>) => (node: IGraphNode): string => {
  const clientNode = nodes.get(node.id);
  if (!clientNode) {
    return node.id;
  }
  const numberOfMembers: number = clientNode.membersCount;
  if (numberOfMembers === 1) {
    return '';
  }

  return numberOfMembers.toString() + ' onions';
};
