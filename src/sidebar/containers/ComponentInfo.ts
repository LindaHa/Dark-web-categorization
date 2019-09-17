import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  ComponentInfo as ComponentInfoComponent,
  IComponentInfoDataProps
} from '../components/ComponentInfo';

const mapStateToProps = (state: IState): IComponentInfoDataProps => {
  const { nodes, selectedNodeId } = state;
  const selectedComponent = nodes.get(selectedNodeId)!;

  return {
    selectedComponent,
  };
};

export const ComponentInfo = connect(mapStateToProps)(ComponentInfoComponent);
