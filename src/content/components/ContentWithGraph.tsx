import * as Immutable from 'immutable';
import * as ImmutablePropTypes from 'immutable-prop-types';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  Graph,
  IGraphNode
} from 'react-d3-graph';
import { ILink } from '../../models/link';
import { graphConfig } from '../utils/graphConfig';
import { IComponent } from '../../models/component';

export interface IGraphDataProps {
  readonly links: Immutable.Set<ILink>;
  readonly nodes: Immutable.Map<Uuid, IComponent>;
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

    onSelectNode: PropTypes.func.isRequired,
  };

  _onClickNode = (nodeId: string) => {
    this.props.onSelectNode(nodeId);
  };

  _onRightClickNode = (_event: object, nodeId: string) => {
    window.alert(`Right clicked node ${nodeId}`);
  };

  render() {
    const {nodes, links} = this.props;
    const data = {
      nodes: nodes.keySeq().toArray().map((nodeId: Uuid) => ({id: nodeId})),
      links: links.map((link: ILink) => link.toObject()).toArray(),
    };

    const myConfig = JSON.parse(JSON.stringify(graphConfig));
    myConfig.node.labelProperty = (node: IGraphNode): string => {
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

      return numberOfMembers.toString();
    };

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
