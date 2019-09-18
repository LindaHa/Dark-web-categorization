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

interface IGraphOwnProps {
  readonly size: ISize;
}

const mapStateToProps = (state: IState, ownProps: IGraphOwnProps): IGraphDataProps => {
  const { nodes } = state;
  const links = getLinksForNodes(nodes.toSet());

  return {
    nodes,
    links,
    size: ownProps.size,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IGraphCallbackProps => ({
  selectNode: (nodeId: Uuid) => dispatch(selectNode(nodeId)),
  zoomNode: (nodeId: Uuid) => dispatch(fetchNodes(nodeId)),
});

export const ContentWithGraph = connect(mapStateToProps, mapDispatchToProps)(ContentWithGraphComponent);
