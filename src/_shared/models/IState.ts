import * as Immutable from 'immutable';
import { GroupBy } from '../../sidebar/components/Sidebar';
import { IComponent } from '../../models/component';
import { IPage } from '../../models/page';
import { ILink } from '../../models/link';

export interface IState {
  readonly groupBy: GroupBy;
  readonly isFetchingNodes: boolean;
  readonly links: Immutable.Set<ILink>;
  readonly components: Immutable.Map<Url, IComponent>;
  readonly nodes: Immutable.Map<Url, IPage>;
  readonly selectedNode: Uuid;
}
