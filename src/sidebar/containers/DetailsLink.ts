import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  DetailsLink as DetailsLinkComponent,
  DetailsMode,
  IDetailsLinkCallbackProps,
  IDetailsLinkDataProps
} from '../components/DetailsLink';
import { INodeDetailsOptions } from '../components/CommunityDetailsOptions';
import {
  fetchCommunityDetails,
  fetchPageDetails
} from '../../content/actionCreators/requests/fetchDetails';

interface IDetailsLinkOwnProps {
  readonly mode: DetailsMode;
}
const mapStateToProps = (state: IState, ownProps: IDetailsLinkOwnProps): IDetailsLinkDataProps => {
  const { details: { isFetchingDetails }, nodes, selectedNodeId } = state;
  const selectedNode = nodes.get(selectedNodeId)!;

  return {
    isFetchingDetails,
    mode: ownProps.mode,
    selectedNode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IDetailsLinkOwnProps): IDetailsLinkCallbackProps => {
  const fetchDetails = ownProps.mode === DetailsMode.Community
  ? fetchCommunityDetails
  : fetchPageDetails;

  return {
    fetchDetails: (options: INodeDetailsOptions) => dispatch(fetchDetails(options)),
  };
};

// @ts-ignore
export const DetailsLink = connect(mapStateToProps, mapDispatchToProps)(DetailsLinkComponent);
