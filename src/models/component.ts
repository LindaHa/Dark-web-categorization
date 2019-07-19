import * as Immutable from 'immutable';
import {
  IPage,
  IPageServerModel
} from './page';
import { ILinkServerModel } from './link';

export interface IComponentData {
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly members: Immutable.List<IPage>;
}

export interface IComponent extends IComponentData, IRecordFunctions<IComponentData, IComponent> {
}

const recordData: IComponentData = {
  id: '',
  links: Immutable.Set<Url>(),
  members: Immutable.List<IPage>(),
};

export class Component extends Immutable.Record(recordData) implements IComponent {
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly members: Immutable.List<IPage>;

  toObject(): IComponentData {
    return super.toObject() as IComponentData;
  }

  with(data: Partial<IComponentData>): IComponent {
    return super.merge(data) as Component;
  }
}

export interface IComponentServerModel {
  readonly id: string;
  readonly links: ILinkServerModel[];
  readonly members: IPageServerModel[];
}

const componentServerModelData: IComponentServerModel = {
  id: '',
  links: [],
  members: [],
};

export class ComponentServerModel extends Immutable.Record(componentServerModelData) implements IComponentServerModel {
  readonly id: string;
  readonly links: ILinkServerModel[];
  readonly members: IPageServerModel[];
}
