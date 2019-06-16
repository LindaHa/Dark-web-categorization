import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  INodeInfoDataProps,
  NodeInfo as NodeInfoComponent,
} from '../components/NodeInfo';

const mapStateToProps = (state: IState): INodeInfoDataProps => ({
  selectedNode: state.nodes.get(state.selectedNode)!,
});

export const NodeInfo = connect(mapStateToProps)(NodeInfoComponent);
