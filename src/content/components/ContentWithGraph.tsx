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
  getLabelConfigForComponents,
  graphConfig
} from '../utils/graphConfig';
import { IComponent } from '../../models/component';
import { IPage } from '../../models/page';
import { NodeMode } from '../../models/stateModels';
import { ISize } from './Content';

export interface IGraphDataProps {
  readonly links: Immutable.Set<ILink>;
  readonly nodes: Immutable.Map<Uuid, IComponent | IPage>;
  readonly nodeMode: NodeMode;
  readonly size: ISize;
}

export interface IGraphCallbackProps {
  readonly onSelectNode: (nodeId: Uuid) => Action;
}

type GraphProps = IGraphCallbackProps & IGraphDataProps;

export class ContentWithGraph extends React.PureComponent<GraphProps> {
  static displayName = 'ContentWithGraph';
  static propTypes = {
    nodes: ImmutablePropTypes.map.isRequired,
    links: ImmutablePropTypes.set.isRequired,
    nodeMode: PropTypes.string.isRequired,
    size: PropTypes.object.isRequired,

    onSelectNode: PropTypes.func.isRequired,
  };

  _onClickNode = (nodeId: string) => {
    this.props.onSelectNode(nodeId);
  };

  _onRightClickNode = (_event: object, nodeId: string) => {
    window.alert(`Right clicked node ${nodeId}`);
  };

  /**
   * This function decorates nodes and links with positions. The motivation
   * for this function its to set `config.staticGraph` to true on the first render
   * call, and to get nodes and links statically set to their initial positions.
   * @param  {Object} nodes nodes and links with minimalist structure.
   * @return {Object} the graph where now nodes containing (x,y) coords.
   */
  _decorateGraphNodesWithInitialPositioning = (nodes: IGraphNode[]) => {
    const {size: {width, height}} = this.props;
    return nodes.map((node: IGraphNode) =>
      Object.assign({}, node, {
        x: node.x || Math.floor(Math.random() * (width - 20) + 10),
        y: node.y || Math.floor(Math.random() * (height - 30) + 10),
      })
    );
  };

  render() {
    const {nodes, links, nodeMode, size: {height, width}} = this.props;
    const adjustedNodes = nodes.keySeq().toArray().map((nodeUrl: Uuid) => ({id: nodeUrl}));

    const data = {
      nodes: this._decorateGraphNodesWithInitialPositioning(adjustedNodes),
      links: links.map((link: ILink) => link.toObject()).toArray(),
    };

    const myConfig = JSON.parse(JSON.stringify(graphConfig));
    myConfig.node.labelProperty = nodeMode === NodeMode.Pages ?
      '' :
      getLabelConfigForComponents(nodes as Immutable.Map<Uuid, IComponent>);
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
        />
      </div>
    );
  }
}
