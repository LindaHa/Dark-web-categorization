import * as React from 'react';
import * as ImmutablePropTypes from 'immutable-prop-types';
import * as Immutable from 'immutable';
import {
  Graph,
  IGraphNode
} from 'react-d3-graph';
import { ILink } from '../../models/link';
import { IPage } from '../../models/page';
import { graphConfig } from '../utils/graphConfig';

export interface IGraphDataProps {
  readonly links: Immutable.Set<ILink>;
  readonly nodes: Immutable.Map<Uuid, IPage>;
}

type GraphProps = IGraphDataProps;

export class ContentWithGraph extends React.PureComponent<GraphProps> {
  static displayName = 'ContentWithGraph';
  static propTypes = {
    nodeIds: ImmutablePropTypes.set,
    links: ImmutablePropTypes.set,
  };

  _onClickGraph = () => {
    window.alert(`Clicked the graph background`);
  };

  _onClickNode = (nodeId: string) => {
    window.alert(`Clicked node ${nodeId}`);
  };

  _onRightClickNode = (_event: object, nodeId: string) => {
    window.alert(`Right clicked node ${nodeId}`);
  };

  _onClickLink = (source: string, target: string) => {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  _onRightClickLink = (_event: object, source: string, target: string) => {
    window.alert(`Right clicked link between ${source} and ${target}`);
  };

  render() {
    const {nodes, links} = this.props;
    const data = {
      nodes: (!nodes || nodes.size === 0) ?
        [{id: 'empty'}] :
        nodes.keySeq().toArray().map((nodeId: Uuid) => ({id: nodeId})),
      links: links.map((link: ILink) => link.toObject()),
    };
    console.log(JSON.stringify(data));

    const myConfig = JSON.parse(JSON.stringify(graphConfig));
    myConfig.node.labelProperty = (node: IGraphNode): string => {
      const clientNode = nodes.get(node.id);
      return clientNode ? clientNode.url : node.id;
    };

    return (
      <div>
        <Graph
          id="dark-web-graph" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
          onClickNode={this._onClickNode}
          onRightClickNode={this._onRightClickNode}
          onClickGraph={this._onClickGraph}
          onClickLink={this._onClickLink}
          onRightClickLink={this._onRightClickLink}
          // onMouseOverNode={onMouseOverNode}
          // onMouseOutNode={onMouseOutNode}
          // onMouseOverLink={onMouseOverLink}
          // onMouseOutLink={onMouseOutLink}
        />
      </div>
    );
  }
}
