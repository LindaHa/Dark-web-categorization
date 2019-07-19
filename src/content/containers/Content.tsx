import { Dispatch } from 'redux';
import { fetchNodes } from '../actions/requests/fetchNodes';
import { connect } from 'react-redux';
import {
  Content as ContentComponent,
  IContentCallbackProps,
  IContentDataProps
} from '../components/Content';
import { IState } from '../../_shared/models/IState';
import { NodeMode } from '../../models/stateModels';

const mapStateToProps = (state: IState): IContentDataProps => {
  const {nodes: {mode, pages, components}} = state;
  const areNodesReady = () => {
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IContentCallbackProps => ({
  getNodes: () => dispatch(fetchNodes()),
});

export const Content = connect(mapStateToProps, mapDispatchToProps)(ContentComponent);
