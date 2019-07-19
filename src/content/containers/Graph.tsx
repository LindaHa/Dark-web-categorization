import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  ContentWithGraph,
  IGraphCallbackProps,
  IGraphDataProps,
} from '../components/ContentWithGraph';
import { IState } from '../../_shared/models/IState';
import { selectNode } from '../../_shared/actions/selectedNodeActionCreators';
import { getLinksForNodes } from '../utils/getLinksFromArray';
import { Component } from '../../models/component';
import { fakeNodeId } from '../utils/graphConfig';

const mapStateToProps = (state: IState): IGraphDataProps => {
  const { components, mode } = state.nodes;
  const links = getLinksForNodes(components.toSet());

  return {
    // Add a fake node which will not be visible so orphaned nodes are displayed properly
    nodes: components.set(fakeNodeId, new Component({id: fakeNodeId})),
    links,
    nodeMode: mode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IGraphCallbackProps => ({
  onSelectNode: (nodeId: Uuid) => dispatch(selectNode(nodeId)),
});

export const Graph = connect(mapStateToProps, mapDispatchToProps)(ContentWithGraph);
