import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  IPageInfoDataProps,
  PageInfo as PageInfoComponent,
} from '../components/PageInfo';

const mapStateToProps = (state: IState): IPageInfoDataProps => {
  const { nodes, selectedNodeId } = state;
  const selectedNode = nodes.get(selectedNodeId)!;

  return {
    selectedNode,
  };
};

export const PageInfo = connect(mapStateToProps)(PageInfoComponent);
