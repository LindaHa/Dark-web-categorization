import { connect } from 'react-redux';
import { IState } from '../../_shared/models/IState';
import {
  ComponentInfo as ComponentInfoComponent,
  IComponentInfoDataProps
} from '../components/ComponentInfo';

const mapStateToProps = (state: IState): IComponentInfoDataProps => {
  const { components } = state.nodes;
  const selectedComponent = components.get(state.selectedNode.selectedPage)!;

  return {
    selectedComponent,
  };
};

export const ComponentInfo = connect(mapStateToProps)(ComponentInfoComponent);
