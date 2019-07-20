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

const mapStateToProps = (state: IState): IGraphDataProps => {
  const { components, mode } = state.nodes;
  const links = getLinksForNodes(components.toSet());

  return {
    nodes: components,
    links,
    nodeMode: mode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IGraphCallbackProps => ({
  onSelectNode: (nodeId: Uuid) => dispatch(selectNode(nodeId)),
});

export const Graph = connect(mapStateToProps, mapDispatchToProps)(ContentWithGraph);
