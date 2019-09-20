import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  CommunityInfo as CommunityInfoComponent,
  ICommunityInfoDataProps
} from '../components/CommunityInfo';

const mapStateToProps = (state: IState): ICommunityInfoDataProps => {
  const { nodes, selectedNodeId } = state;
  const selectedNode = nodes.get(selectedNodeId)!;

  return {
    selectedNode,
  };
};

export const CommunityInfo = connect(mapStateToProps)(CommunityInfoComponent);
