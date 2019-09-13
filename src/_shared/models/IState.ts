import { GroupBy } from '../../sidebar/components/Sidebar';
import {
  INodes,
  ISelectedNode
} from '../../models/stateModels';

export interface IState {
  readonly groupBy: GroupBy;
  readonly isError: boolean;
  readonly isFetchingNodes: boolean;
  readonly nodes: INodes;
  readonly selectedNode: ISelectedNode;
}
