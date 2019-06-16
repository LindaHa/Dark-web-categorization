import { connect } from 'react-redux';
import {
  IGraphDataProps,
  Playground
} from '../components/playground';
import { IState } from '../../_shared/models/IState';

const mapStateToProps = (state: IState): IGraphDataProps => ({
  nodes: state.nodes,
  links: state.links,
});

export const Graph = connect(mapStateToProps)(Playground);
