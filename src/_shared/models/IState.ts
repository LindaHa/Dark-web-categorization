import { GroupBy } from '../../sidebar/components/Sidebar';
import * as Immutable from 'immutable';
import { INode } from '../../models/node';

export interface IState {
  readonly groupBy: GroupBy;
  readonly errorMessage: string;
  readonly isFetchingNodes: boolean;
  readonly isFetchingDetails: boolean;
  readonly currentLevel: number;
  readonly nodes: Immutable.Map<Uuid, INode>;
  readonly selectedNodeId: Uuid;
}
