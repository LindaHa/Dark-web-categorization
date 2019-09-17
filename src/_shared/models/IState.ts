import { GroupBy } from '../../sidebar/components/Sidebar';
import * as Immutable from 'immutable';
import { IComponent } from '../../models/component';

export interface IState {
  readonly groupBy: GroupBy;
  readonly isError: boolean;
  readonly isFetchingNodes: boolean;
  readonly currentLevel: number;
  readonly nodes: Immutable.Map<Uuid, IComponent>;
  readonly selectedNodeId: Uuid;
}
