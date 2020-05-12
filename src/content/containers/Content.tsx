import { Dispatch } from 'redux';
import { fetchNodes } from '../actionCreators/requests/fetchNodes';
import { connect } from 'react-redux';
import {
  Content as ContentComponent,
  IContentCallbackProps,
  IContentDataProps
} from '../components/Content';
import { IState } from '../../_shared/models/IState';

const mapStateToProps = (state: IState): IContentDataProps => {
  const { errorMessage, isFetchingNodes } = state;

  return {
    isFetchingNodes,
    isError: !!errorMessage,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IContentCallbackProps => ({
  getNodes: () => dispatch(fetchNodes()),
});

export const Content = connect(mapStateToProps, mapDispatchToProps)(ContentComponent);
