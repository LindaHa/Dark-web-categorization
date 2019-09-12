import { Dispatch } from 'redux';
import { fetchNodes } from '../actionCreators/requests/fetchNodes';
import { connect } from 'react-redux';
import {
  Content as ContentComponent,
  IContentCallbackProps,
  IContentDataProps
} from '../components/Content';
import { IState } from '../../_shared/models/IState';
import { NodeMode } from '../../models/stateModels';

const mapStateToProps = (state: IState): IContentDataProps => {
  const {nodes: {mode, pages, components}, isError, isFetchingNodes} = state;
  const areNodesReady = () => {
    if (isFetchingNodes) {
      return false;
    }
    switch (mode) {
      case NodeMode.Components:
        return !components.isEmpty();

      case NodeMode.Pages:
        return !pages.isEmpty();

      case NodeMode.Empty:
      default:
        return false;
    }
  };

  return {
    areNodesReady: areNodesReady(),
    isError,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IContentCallbackProps => ({
  getNodes: () => dispatch(fetchNodes()),
});

export const Content = connect(mapStateToProps, mapDispatchToProps)(ContentComponent);
