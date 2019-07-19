import { Dispatch } from 'redux';
import { fetchNodes } from '../actions/requests/fetchNodes';
import { connect } from 'react-redux';
import {
  Content as ContentComponent,
  IContentCallbackProps,
  IContentDataProps
} from '../components/Content';
import { IState } from '../../_shared/models/IState';

const mapStateToProps = (state: IState): IContentDataProps => {
  const arePagesReady = state.nodes && !state.nodes.isEmpty();
  const areComponentsReady = state.components && !state.components.isEmpty();

  return {
    areNodesReady: arePagesReady || areComponentsReady,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IContentCallbackProps => ({
  getNodes: () => dispatch(fetchNodes()),
});

export const Content = connect(mapStateToProps, mapDispatchToProps)(ContentComponent);
