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
import { ISize } from '../components/Content';
import { NodeMode } from '../../models/stateModels';
import { fetchNodes } from '../actions/requests/fetchNodes';

interface IGraphOwnProps {
  readonly size: ISize;
}

const mapStateToProps = (state: IState, ownProps: IGraphOwnProps): IGraphDataProps => {
  const {components, mode, pages} = state.nodes;
  const nodes = mode === NodeMode.Pages ? pages : components;
  const links = getLinksForNodes(nodes.toSet());

  return {
    nodes,
    links,
    nodeMode: mode,
    size: ownProps.size,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IGraphCallbackProps => ({
  selectNode: (nodeId: Uuid) => dispatch(selectNode(nodeId)),
  zoomNode: (nodeId: Uuid) => dispatch(fetchNodes(nodeId)),
});

export const Graph = connect(mapStateToProps, mapDispatchToProps)(ContentWithGraph);
