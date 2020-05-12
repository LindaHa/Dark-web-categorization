import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IErrorDisplayCallbackProps,
  IErrorDisplayDataProps
} from '../components/ErrorDisplay';
import { fetchNodes } from '../../content/actionCreators/requests/fetchNodes';
import { IState } from '../models/IState';
import { ErrorDisplay as ErrorDisplayComponent } from '../components/ErrorDisplay';

const mapStateToProps = (state: IState): IErrorDisplayDataProps => ({
  errorMessage: state.errorMessage
});

const mapDispatchToProps = (dispatch: Dispatch): IErrorDisplayCallbackProps => ({
  onClick: () => dispatch(fetchNodes())
});

export const ErrorDisplay = connect(mapStateToProps, mapDispatchToProps)(ErrorDisplayComponent);
