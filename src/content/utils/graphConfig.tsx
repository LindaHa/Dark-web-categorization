import * as Immutable from 'immutable';
import * as React from 'react';
import {
  highlightLinkColor,
  highlightNodeColor,
  primaryFontColor,
  primaryLinkColor,
  primaryNodeColor
} from '../../_shared/constants/styles';
import { IGraphNode } from 'react-d3-graph';
import { INode } from '../../models/node';
import { PieChartData } from 'react-minimal-pie-chart';
import { PieChartSVG } from '../components/PiechartSVG';


export const graphConfig = {
  collapsible: false,
  nodeHighlightBehavior: true,
  directed: true,
  staticGraph: false,

  node: {
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

export const getDimensionsOfNode = (numberOfNodes: number): number => {
  if (numberOfNodes === 1) {
    return 10;
  }
  const percent = Math.floor(numberOfNodes / 100);
  if (percent === 0) {
    return 20;
  } else if (percent < 10) {
    return 20 + percent;
  } else if (percent < 85) {
    return Math.floor(percent / 4) + 30;
  } else if (percent < 500) {
    return Math.floor(percent / 13) + 50;
  } else {
    return 85;
  }
};

export const getSVGConfigForNodes = (nodes: Immutable.Map<string, INode>) => (node: IGraphNode): React.ReactElement<PieChartData> => {
  const clientNode = nodes.get(node.id);
  if (!clientNode) {
    return (<div/>);
  }
  const dimension = getDimensionsOfNode(clientNode.membersCount) + 'px';

  return (
    <div style={{ position: 'relative', width: dimension, height: dimension }}>
      <PieChartSVG node={clientNode}/>;
    </div>
  );
};
