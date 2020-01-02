import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  IPageInfoDataProps,
  PageInfo as PageInfoComponent,
} from '../components/PageInfo';
import { Dispatch } from 'redux';
import { IPageInfoCallbackProps } from '../components/PageInfo';
import { fetchPageDetails } from '../../content/actionCreators/requests/fetchDetails';
import { INodeDetailsOptions } from '../components/CommunityDetailsOptions';

const mapStateToProps = (state: IState): IPageInfoDataProps => {
  const { nodes, selectedNodeId } = state;
  const selectedNode = nodes.get(selectedNodeId)!;

  return {
    selectedNode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IPageInfoCallbackProps => ({
  fetchDetails: (options: INodeDetailsOptions) => dispatch(fetchPageDetails(options)),
});

export const PageInfo = connect(mapStateToProps, mapDispatchToProps)(PageInfoComponent);
