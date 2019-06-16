import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { IState } from '../../_shared/models/IState';
import {
  INodeInfoDataProps,
  NodeInfo as NodeInfoComponent,
} from '../components/NodeInfo';

const mapStateToProps = (state: IState): INodeInfoDataProps => {
  const nodes = state.nodes;
  const selectedNode = nodes.get(state.selectedNode)!;
  // @ts-ignore
  const nodeLinks: Immutable.Set<string> = selectedNode.links
    .map((linkId: Uuid) => {
      const linkedNode = nodes.get(linkId);
      return linkedNode && linkedNode.url;
    })
    .filter((url: string | undefined) => !!url);

  return {
    selectedNode,
    nodeLinks,
  };
};

export const NodeInfo = connect(mapStateToProps)(NodeInfoComponent);
