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
  const { nodes: {mode, pages, components}} = state;
  const arePagesReady = mode === NodeMode.Pages && !pages.isEmpty();
  const areComponentsReady = mode === NodeMode.Components && !components.isEmpty();

  return {
    areNodesReady: arePagesReady || areComponentsReady,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IContentCallbackProps => ({
  getNodes: () => dispatch(fetchNodes()),
});

export const Content = connect(mapStateToProps, mapDispatchToProps)(ContentComponent);
