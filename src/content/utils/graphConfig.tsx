import * as Immutable from 'immutable';
import * as React from 'react';
import {
  CategoryColours,
  highlightLinkColor,
  highlightNodeColor,
  primaryFontColor,
  primaryLinkColor,
  primaryNodeColor
} from '../../_shared/constants/styles';
import { IGraphNode } from 'react-d3-graph';
import { INode } from '../../models/node';
import { PieChartData } from 'react-minimal-pie-chart';
import PieChart from 'react-minimal-pie-chart';


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
  }
  else if (percent < 10) {
    return 30;
  } else if (percent < 85) {
    return percent / 2 + 30;
  } else {
    return 75;
  }
};

export const getSVGConfigForNodes = (nodes: Immutable.Map<string, INode>) => (node: IGraphNode): React.ReactElement<PieChartData> => {
  const clientNode = nodes.get(node.id);
  if (!clientNode) {
    return (<div/>);
  }
  // const categories: Immutable.Map<Uuid, number> = clientNode.categories;
  const categories = clientNode.categories;
  const data: PieChartData[] = [];
  categories.forEach((val: number, cat: Uuid) => {
    const chartObject = ({ title: cat, value: val, color: CategoryColours[cat] });
    data.push(chartObject);
  });
  const dimension = getDimensionsOfNode(clientNode.membersCount) + 'px';
  return (
    <div style={{ position: 'relative', width: dimension, height: dimension }}>
      <PieChart data={data}/>
    </div>
  );
};
