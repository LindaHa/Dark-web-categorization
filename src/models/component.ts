import * as Immutable from 'immutable';
import { IPageServerModel } from './page';

export interface IComponentData {
  readonly categories: Immutable.Set<Uuid>;
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly firstMembers: Immutable.List<IComponent>;
  readonly membersCount: number;
}

export interface IComponent extends IComponentData, IRecordFunctions<IComponentData, IComponent> {
}

const recordData: IComponentData = {
  categories: Immutable.Set<Uuid>(),
  id: '',
  links: Immutable.Set<Url>(),
  firstMembers: Immutable.List<IComponent>(),
  membersCount: 0,
};

export class Component extends Immutable.Record(recordData) implements IComponent {
  readonly categories: Immutable.Set<Uuid>;
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly firstMembers: Immutable.List<IComponent>;
  readonly membersCount: number;

  toObject(): IComponentData {
    return super.toObject() as IComponentData;
  }

  with(data: Partial<IComponentData>): IComponent {
    return super.merge(data) as Component;
  }
}

export interface IComponentServerModel {
  readonly categories: Uuid[];
  readonly id: string;
  readonly links: Url[];
  readonly first_members: IPageServerModel[];
  readonly members_count: number;
}

const componentServerModelData: IComponentServerModel = {
  categories: [],
  id: '',
  links: [],
  first_members: [],
  members_count: 0,
};

export class ComponentServerModel extends Immutable.Record(componentServerModelData) implements IComponentServerModel {
  readonly categories: Uuid[];
  readonly id: string;
  readonly links: Url[];
  readonly first_members: IPageServerModel[];
  readonly members_count: number;
}
