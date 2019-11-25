import * as Immutable from 'immutable';
import * as ImmutablePropTypes from 'immutable-prop-types';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  Graph,
  IGraphNode
} from 'react-d3-graph';
import { ILink } from '../../models/link';
import {
  getDimensionsOfNode,
  getLabelConfigForNodes,
  getSVGConfigForNodes,
  graphConfig
} from '../utils/graphConfig';
import { INode } from '../../models/node';
import { ISize } from './Content';
import { seedRandom } from '../utils/seedRandom';

export interface IGraphDataProps {
  readonly links: Immutable.Set<ILink>;
  readonly nodes: Immutable.Map<Uuid, INode>;
  readonly size: ISize;
}

export interface IGraphCallbackProps {
  readonly selectNode: (nodeId: Uuid) => Action;
  readonly zoomNode: (nodeId: Uuid) => Action;
}

type GraphProps = IGraphCallbackProps & IGraphDataProps;

export class ContentWithGraph extends React.PureComponent<GraphProps> {
  static displayName = 'ContentWithGraph';
  static propTypes = {
    nodes: ImmutablePropTypes.map.isRequired,
    links: ImmutablePropTypes.set.isRequired,
    size: PropTypes.object.isRequired,

    selectNode: PropTypes.func.isRequired,
    zoomNode: PropTypes.func.isRequired,
  };

  _onClickNode = (nodeId: string) => {
    this.props.selectNode(nodeId);
  };

  _onDoubleClickNode = (nodeId: string) => {
    const node = this.props.nodes.get(nodeId);

    if (node && node.id.endsWith(' ')) {
      return;
    }
    this.props.zoomNode(nodeId);
  };

  _onRightClickNode = (_event: object, nodeId: string) => {
    window.alert(`Right clicked node ${nodeId}`);
  };

  /**
   * This function decorates nodes and links with positions. The motivation
   * for this function its to set `config.staticGraph` to true on the first render
   * call, and to get nodes and links statically set to their initial positions.
   * @param  {Object} graphNodes nodes and links with minimalist structure.
   * @return {Object} the graph where now nodes containing (x,y) coords.
   */
  _decorateGraphNodesWithInitialPositioningAndSize = (graphNodes: IGraphNode[]) => {
    const { nodes, size: { width, height } } = this.props;
    return graphNodes.map((graphNode: IGraphNode) => {
      const node = nodes.get(graphNode.id);
      return (Object.assign({}, graphNode, {
        x: graphNode.x || Math.floor(seedRandom('x' + graphNode.id) * (width - 20) + 10),
        y: graphNode.y || Math.floor(seedRandom('y' + graphNode.id) * (height - 30) + 10),
        size: node ? getDimensionsOfNode(node.membersCount) * 10 : 200
      }));
    });
  };

  render() {
    const { nodes, links, size: { height, width } } = this.props;
    const adjustedNodes = nodes.keySeq().toArray().map((nodeUrl: Uuid) => ({ id: nodeUrl }));

    const data = {
      nodes: this._decorateGraphNodesWithInitialPositioningAndSize(adjustedNodes),
      links: links.map((link: ILink) => link.toObject()).toArray(),
    };

    const myConfig = JSON.parse(JSON.stringify(graphConfig));
    myConfig.node.labelProperty = getLabelConfigForNodes(nodes);
    myConfig.node.viewGenerator = getSVGConfigForNodes(nodes);
    myConfig.height = height;
    myConfig.width = width;

    return (
      <div>
        <Graph
          id="dark-web-graph" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
          onClickNode={this._onClickNode}
          onRightClickNode={this._onRightClickNode}
          onDoubleClickNode={this._onDoubleClickNode}
        />
      </div>
    );
  }
}
