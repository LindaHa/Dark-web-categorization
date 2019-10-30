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
import PieChart, { PieChartData } from 'react-minimal-pie-chart';

export const graphConfig = {
  collapsible: false,
  nodeHighlightBehavior: true,
  directed: true,
  staticGraph: false,

  node: {
    color: primaryNodeColor,
    size: 400,
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

  return numberOfMembers.toString() + ' onions';
};

export const getSVGConfigForNodes = (nodes: Immutable.Map<string, INode>) => (node: IGraphNode): React.ReactElement<PieChartData> => {
  const clientNode = nodes.get(node.id);
  if (!clientNode) {
    console.log('node not found');
    return (<div />);
  }
  // const categories: Immutable.Map<Uuid, number> = clientNode.categories;
  const categories = Immutable.Map({
    ['Porn']: 33,
    ['Drugs']: 46,
    ['Finance']: 21,
  });
  const data: PieChartData[] = [];
  categories.forEach((val: number, cat: Uuid) => {
    const chartObject = ({ title: cat, value: val, color: CategoryColours[cat] });
    data.push(chartObject);
  });

  return (
    <div style={{position: 'relative', width: '30px', height: '30px'}}>
      <PieChart data={data} />
    </div>
  );
};
