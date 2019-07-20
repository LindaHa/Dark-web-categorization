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

interface IGraphOwnProps {
  readonly size: ISize;
}

const mapStateToProps = (state: IState, ownProps: IGraphOwnProps): IGraphDataProps => {
  const {components, mode} = state.nodes;
  const links = getLinksForNodes(components.toSet());

  return {
    nodes: components,
    links,
    nodeMode: mode,
    size: ownProps.size,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IGraphCallbackProps => ({
  onSelectNode: (nodeId: Uuid) => dispatch(selectNode(nodeId)),
});

export const Graph = connect(mapStateToProps, mapDispatchToProps)(ContentWithGraph);
