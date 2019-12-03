import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  IPageInfoDataProps,
  PageInfo as PageInfoComponent,
} from '../components/PageInfo';
import { Dispatch } from 'redux';
import { IPageInfoCallbackProps } from '../components/PageInfo';
import { fetchPageDetails } from '../../content/actionCreators/requests/fetchDetails';

const mapStateToProps = (state: IState): IPageInfoDataProps => {
  const { nodes, selectedNodeId, details: { isFetchingDetails } } = state;
  const selectedNode = nodes.get(selectedNodeId)!;

  return {
    selectedNode,
    isFetchingDetails,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IPageInfoCallbackProps => ({
  fetchDetails: () => dispatch(fetchPageDetails()),
});

export const PageInfo = connect(mapStateToProps, mapDispatchToProps)(PageInfoComponent);
