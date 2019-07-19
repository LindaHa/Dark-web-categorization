import * as Immutable from 'immutable';
import { IComponent } from './component';
import { IPage } from './page';

export enum NodeMode {
  Pages = 'Pages',
  Components = 'Components',
  Empty = 'Empty',
}

export interface INodes {
  readonly pages: Immutable.Map<Uuid, IPage>;
  readonly components: Immutable.Map<Url, IComponent>;
  readonly mode: NodeMode;
}
