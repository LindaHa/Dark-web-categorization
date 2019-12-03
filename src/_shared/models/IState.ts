import { GroupBy } from '../../sidebar/components/Sidebar';
import * as Immutable from 'immutable';
import { INode } from '../../models/node';
import { IDetails } from './IDetails';

export interface IState {
  readonly details: IDetails;
  readonly groupBy: GroupBy;
  readonly isError: boolean;
  readonly isFetchingNodes: boolean;
  readonly currentLevel: number;
  readonly nodes: Immutable.Map<Uuid, INode>;
  readonly selectedNodeId: Uuid;
}
