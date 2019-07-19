import * as Immutable from 'immutable';
import * as ImmutablePropTypes from 'immutable-prop-types';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Graph } from 'react-d3-graph';
import { ILink } from '../../models/link';
import {
  fakeNode,
  fakeNodeId,
  getFakeLink,
  getLabelConfigForComponents,
  getLabelConfigForPages,
  graphConfig
} from '../utils/graphConfig';
import { IComponent } from '../../models/component';
import { IPage } from '../../models/page';
import { NodeMode } from '../../models/stateModels';

export interface IGraphDataProps {
  readonly links: Immutable.Set<ILink>;
  readonly nodes: Immutable.Map<Uuid, IComponent | IPage>;
  readonly nodeMode: NodeMode;
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

    onSelectNode: PropTypes.func.isRequired,
  };

  _onClickNode = (nodeId: string) => {
    this.props.onSelectNode(nodeId);
  };

  _onRightClickNode = (_event: object, nodeId: string) => {
    window.alert(`Right clicked node ${nodeId}`);
  };

  render() {
    const {nodes, links, nodeMode} = this.props;
    const adjustedNodes = nodes.keySeq().toArray().map((nodeUrl: Uuid) => ({id: nodeUrl}));
    adjustedNodes.push(fakeNode);
    const data = {
      nodes: adjustedNodes,
      links: links.map((link: ILink) => {
        return link.source === fakeNodeId ? getFakeLink(link.target) : link.toObject();
      }).toArray(),
    };

    const myConfig = JSON.parse(JSON.stringify(graphConfig));
    myConfig.node.labelProperty = nodeMode === NodeMode.Pages ?
      getLabelConfigForPages(nodes as Immutable.Map<Uuid, IPage>) :
      getLabelConfigForComponents(nodes as Immutable.Map<Uuid, IComponent>);

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
