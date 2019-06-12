import * as React from 'react';
import { Graph } from 'react-d3-graph';

// graph payload (with minimalist structure)
const data = {
  nodes: [{id: 'Harry'}, {id: 'Sally'}, {id: 'Alice'}, {id: 'Ben'}, {id: 'Maiev'}],
  links: [
    {source: 'Alice', target: 'Maiev'},
    {source: 'Alice', target: 'Sally'},
    {source: 'Ben', target: 'Maiev'},
    {source: 'Harry', target: 'Ben'},
    {source: 'Harry', target: 'Maiev'},
    {source: 'Harry', target: 'Sally'},
  ]
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: 'lightgreen',
    size: 120,
    highlightStrokeColor: 'blue'
  },
  link: {
    highlightColor: 'lightblue'
  }
};

// graph event callbacks
const onClickGraph = function () {
  window.alert(`Clicked the graph background`);
};

const onClickNode = function (nodeId: string) {
  window.alert(`Clicked node ${nodeId}`);
};

const onRightClickNode = function (_event: object, nodeId: string) {
  window.alert(`Right clicked node ${nodeId}`);
};

const onClickLink = function (source: string, target: string) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function (_event: object, source: string, target: string) {
  window.alert(`Right clicked link between ${source} and ${target}`);
};

export const Playground = () => (
  <Graph
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={data}
    config={myConfig}
    onClickNode={onClickNode}
    onRightClickNode={onRightClickNode}
    onClickGraph={onClickGraph}
    onClickLink={onClickLink}
    onRightClickLink={onRightClickLink}
    // onMouseOverNode={onMouseOverNode}
    // onMouseOutNode={onMouseOutNode}
    // onMouseOverLink={onMouseOverLink}
    // onMouseOutLink={onMouseOutLink}
  />
);
