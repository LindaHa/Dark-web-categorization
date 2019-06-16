import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  ContentWithGraph,
  IGraphCallbackProps,
  IGraphDataProps,
} from '../components/ContentWithGraph';
import { IState } from '../../_shared/models/IState';
import { selectNode } from '../../_shared/actions/selectedNodeActionCreators';

const mapStateToProps = (state: IState): IGraphDataProps => ({
  nodes: state.nodes,
  links: state.links,
});

const mapDispatchToProps = (dispatch: Dispatch): IGraphCallbackProps => ({
  onSelectNode: (nodeId: Uuid) => dispatch(selectNode(nodeId)),
});

export const Graph = connect(mapStateToProps, mapDispatchToProps)(ContentWithGraph);
