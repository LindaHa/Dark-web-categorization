import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  CommunityInfo as CommunityInfoComponent,
  ICommunityInfoCallbackProps,
  ICommunityInfoDataProps
} from '../components/CommunityInfo';
import { Dispatch } from 'redux';
import { fetchCommunityDetails } from '../../content/actionCreators/requests/fetchDetails';

const mapStateToProps = (state: IState): ICommunityInfoDataProps => {
  const { nodes, selectedNodeId } = state;
  const selectedNode = nodes.get(selectedNodeId)!;

  return {
    selectedNode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ICommunityInfoCallbackProps => ({
  fetchDetails: () => dispatch(fetchCommunityDetails()),
});

export const CommunityInfo = connect(mapStateToProps, mapDispatchToProps)(CommunityInfoComponent);
