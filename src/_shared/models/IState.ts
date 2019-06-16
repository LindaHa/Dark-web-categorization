import * as Immutable from 'immutable';
import { GroupBy } from '../../sidebar/components/Sidebar';
import { IPage } from '../../models/page';
import { ILink } from '../../models/link';

export interface IState {
  readonly groupBy: GroupBy;
  readonly isFetchingNodes: boolean;
  readonly links: Immutable.Set<ILink>;
  readonly nodes: Immutable.Map<Uuid, IPage>;
}
