import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  ContentWithGraph as ContentWithGraphComponent,
  IGraphCallbackProps,
  IGraphDataProps,
} from '../components/ContentWithGraph';
import { IState } from '../../_shared/models/IState';
import { selectNode } from '../../_shared/actionCreators/selectedNodeActionCreators';
import { getLinksForNodes } from '../utils/getLinksFromArray';
import { ISize } from '../components/Content';
import { fetchNodes } from '../actionCreators/requests/fetchNodes';
import { INode } from '../../models/node';
import { decomposeCommunity } from '../utils/decomposeCommunity';
import { MAX_NODES_FOR_DISPLAY } from '../constants/graphConstants';

interface IGraphOwnProps {
  readonly size: ISize;
}

const mapStateToProps = (state: IState, ownProps: IGraphOwnProps): IGraphDataProps => {
  const { nodes } = state;
  let memberNodes = Immutable.Map<Uuid, INode>();
  const hasMoreThanFirstMembers: boolean = nodes
    .map((node: INode) => node.membersCount <= MAX_NODES_FOR_DISPLAY)
    .every((item: boolean) => item);

  if (hasMoreThanFirstMembers) {
    memberNodes = decomposeCommunity(nodes);
  }

  const finalNodes = memberNodes.isEmpty() ? nodes : memberNodes;
  const links = getLinksForNodes(finalNodes);

  return {
    nodes: finalNodes,
    links,
    size: ownProps.size,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IGraphCallbackProps => ({
  selectNode: (nodeId: Uuid) => dispatch(selectNode(nodeId)),
  zoomNode: (nodeId: Uuid) => dispatch(fetchNodes(nodeId)),
});

export const ContentWithGraph = connect(mapStateToProps, mapDispatchToProps)(ContentWithGraphComponent);
