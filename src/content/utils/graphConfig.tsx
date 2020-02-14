import * as Immutable from 'immutable';
import * as React from 'react';
import {
  highlightLinkColor,
  highlightNodeColor,
  primaryFontColor,
  primaryLinkColor,
  primaryNodeColor
} from '../../_shared/constants/styles';
import {
  IGraphLink,
  IGraphNode
} from 'react-d3-graph';
import { INode } from '../../models/node';
import { PieChartData } from 'react-minimal-pie-chart';
import { PieChartSVG } from '../components/PiechartSVG';
import { PageVisualSVG } from '../components/PageVisual';
import {
  MAXIMUM_NODE_SIZE,
  MINIMUM_NODE_SIZE
} from '../constants/graphConstants';


export const graphConfig = {
  collapsible: false,
  nodeHighlightBehavior: true,
  directed: true,
  staticGraph: false,

  node: {
    fontColor: primaryFontColor,
    fontSize: 11,
    highlightStrokeColor: primaryNodeColor,
    highlightColor: highlightNodeColor,
    highlightDegree: 0,
    highlightFontSize: 16,
  },

  link: {
    color: primaryLinkColor,
    highlightColor: highlightLinkColor,
    mouseCursor: 'default',
    renderLabel: true,
    strokeWidth: 1,
  },

  d3: {
    gravity: -300,
    linkLength: 200
  },

  height: window.innerHeight - 40,
  width: window.innerWidth / 3 * 2.19,
};

export const getLabelConfigForNodes = (nodes: Immutable.Map<string, INode>) => (node: IGraphNode): string => {
  const clientNode = nodes.get(node.id);
  if (!clientNode) {
    return node.id;
  }
  const numberOfMembers: number = clientNode.membersCount;
  if (numberOfMembers === 1) {
    return '';
  }

  return '' && numberOfMembers.toString() + ' onions';
};

export const getLabelConfigForLinks = (nodes: Immutable.Map<string, INode>) => (link: IGraphLink): string => {
  const sourceNode = nodes.get(link.source);
  if (!sourceNode) {
    return '';
  }

  const sourceNodeLinks = sourceNode.links;
  const numberOfLinks: number = sourceNodeLinks.size;
  const numberOfTargetLinks: number = (sourceNodeLinks.get(link.target) && sourceNodeLinks.get(link.target)!.occurrences) || 0;

  return `${numberOfTargetLinks}/${numberOfLinks}`;
};

export const getDimensionsOfNodes = (nodes: Immutable.Map<Uuid, INode>): Immutable.Map<Uuid, number> => {
  const maximum = nodes.reduce((result: number, node: INode) => result = Math.max(node.membersCount, result), 0);
  const minimum = nodes.reduce((result: number, node: INode) => result = Math.min(node.membersCount, result), maximum);
  const sizeDispersal = MAXIMUM_NODE_SIZE - MINIMUM_NODE_SIZE;
  const membersDispersal = maximum - minimum;
  const slope = sizeDispersal / membersDispersal;
  const intercept = MINIMUM_NODE_SIZE - (slope * minimum);

  const dimensions = nodes.map((node: INode) => {
    return slope * node.membersCount + intercept;
  });

  return dimensions;
};

export const getNodesFromGraphNodes = (nodes: Immutable.Map<Uuid, INode>, graphNodes: IGraphNode[]): Immutable.Map<Uuid, INode> => {
  const relevantNodes = graphNodes.map((node: IGraphNode) => [node.id, nodes.get(node.id)]);

  return Immutable.Map<Uuid, INode>(relevantNodes);
};

export const getSVGConfigForNodes = (nodes: Immutable.Map<string, INode>) => (node: IGraphNode): React.ReactElement<PieChartData> => {
  const clientNode = nodes.get(node.id);
  if (!clientNode) {
    return (<div/>);
  }
  const dimensions = getDimensionsOfNodes(nodes);
  const dimension = dimensions.get(clientNode.id) + 'px';
  const nodeCategory = clientNode.categories.keySeq().first('Other');

  return (
    <div style={{ position: 'relative', width: dimension, height: dimension }}>
      {
        clientNode.membersCount === 1
          ? <PageVisualSVG category={nodeCategory}/>
          : <PieChartSVG node={clientNode}/>
      }
    </div>
  );
};
