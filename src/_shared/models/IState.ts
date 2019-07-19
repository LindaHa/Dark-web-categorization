import * as Immutable from 'immutable';
import { GroupBy } from '../../sidebar/components/Sidebar';
import { ILink } from '../../models/link';
import { INodes } from '../../models/stateModels';

export interface IState {
  readonly groupBy: GroupBy;
  readonly isFetchingNodes: boolean;
  readonly links: Immutable.Set<ILink>;
  readonly nodes: INodes;
  readonly selectedNode: Uuid;
}
