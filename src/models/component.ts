import * as Immutable from 'immutable';
import {
  IPage,
  IPageServerModel
} from './page';

export interface IComponentData {
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly firstMembers: Immutable.List<IPage>;
  readonly membersCount: number;
}

export interface IComponent extends IComponentData, IRecordFunctions<IComponentData, IComponent> {
}

const recordData: IComponentData = {
  id: '',
  links: Immutable.Set<Url>(),
  firstMembers: Immutable.List<IPage>(),
  membersCount: 0,
};

export class Component extends Immutable.Record(recordData) implements IComponent {
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly firstMembers: Immutable.List<IPage>;
  readonly membersCount: number;

  toObject(): IComponentData {
    return super.toObject() as IComponentData;
  }

  with(data: Partial<IComponentData>): IComponent {
    return super.merge(data) as Component;
  }
}

export interface IComponentServerModel {
  readonly id: string;
  readonly links: Url[];
  readonly first_members: IPageServerModel[];
  readonly members_count: number;
}

const componentServerModelData: IComponentServerModel = {
  id: '',
  links: [],
  first_members: [],
  members_count: 0,
};

export class ComponentServerModel extends Immutable.Record(componentServerModelData) implements IComponentServerModel {
  readonly id: string;
  readonly links: Url[];
  readonly first_members: IPageServerModel[];
  readonly members_count: number;
}
