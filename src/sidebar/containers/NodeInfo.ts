import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { IState } from '../../_shared/models/IState';
import {
  INodeInfoDataProps,
  NodeInfo as NodeInfoComponent,
} from '../components/NodeInfo';

const mapStateToProps = (state: IState): INodeInfoDataProps => {
  const nodes = state.nodes.components;
  const selectedNode = nodes.get(state.selectedNode)!;
  // @ts-ignore
  const nodeLinks: Immutable.Set<string> = selectedNode.links
    .map((linkUrl: Url) => {
      const linkedNode = nodes.get(linkUrl);
      if (linkedNode) {
        const numberOfMembers = linkedNode.members.size;
        if (numberOfMembers === 1) {
          const node = linkedNode.members.first(null);
          return node && node.url;
        }
        return linkedNode.id;
      }
      return false;
    })
    .filter((url: string | null) => !!url);

  return {
    selectedNode,
    nodeLinks,
  };
};

export const NodeInfo = connect(mapStateToProps)(NodeInfoComponent);
