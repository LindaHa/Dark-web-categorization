import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  IPageInfoDataProps,
  PageInfo as PageInfoComponent,
} from '../components/PageInfo';

const mapStateToProps = (state: IState): IPageInfoDataProps => {
  const { components } = state.nodes;
  const selectedNode = components.get(state.selectedNode.selectedComponent)!;

  return {
    selectedNode,
  };
};

export const PageInfo = connect(mapStateToProps)(PageInfoComponent);
