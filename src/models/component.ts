import * as Immutable from 'immutable';
import {
  IPage,
  IPageServerModel
} from './page';

export interface IComponentData {
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly members: Immutable.List<IPage>;
  readonly members_count: number;
}

export interface IComponent extends IComponentData, IRecordFunctions<IComponentData, IComponent> {
}

const recordData: IComponentData = {
  id: '',
  links: Immutable.Set<Url>(),
  members: Immutable.List<IPage>(),
  members_count: 0,
};

export class Component extends Immutable.Record(recordData) implements IComponent {
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly members: Immutable.List<IPage>;
  readonly members_count: number;

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
  readonly members: IPageServerModel[];
  readonly members_count: number;
}

const componentServerModelData: IComponentServerModel = {
  id: '',
  links: [],
  members: [],
  members_count: 0,
};

export class ComponentServerModel extends Immutable.Record(componentServerModelData) implements IComponentServerModel {
  readonly id: string;
  readonly links: Url[];
  readonly members: IPageServerModel[];
  readonly members_count: number;
}
