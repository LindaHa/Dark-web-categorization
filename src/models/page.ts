import * as Immutable from 'immutable';
import { ILinkServerModel } from './link';

export interface IPageData {
  readonly categories: Immutable.Set<Uuid>;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: Immutable.Set<Url>;
  readonly url: string;
}

export interface IPage extends IPageData, IRecordFunctions<IPageData, IPage> {
}

const recordData: IPageData = {
  categories: Immutable.Set<Uuid>(),
  description: '',
  id: '',
  language: '',
  links: Immutable.Set<Url>(),
  url: '',
};

export class Page extends Immutable.Record(recordData) implements IPage {
  readonly categories: Immutable.Set<Uuid>;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: Immutable.Set<Url>;
  readonly url: Uuid;

  toObject(): IPageData {
    return super.toObject() as IPageData;
  }

  with(data: Partial<IPageData>): IPage {
    return super.merge(data) as Page;
  }
}

export interface IPageServerModel {
  readonly categories: Immutable.Map<Uuid, number>;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: ILinkServerModel[];
  readonly url: string;
}

const pageServerModelData: IPageServerModel = {
  categories: Immutable.Map<Uuid, number>(),
  description: '',
  id: '',
  language: '',
  links: [],
  url: '',
};

export class PageServerModel extends Immutable.Record(pageServerModelData) implements IPageServerModel {
  readonly categories: Immutable.Map<Uuid, number>;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: ILinkServerModel[];
  readonly url: string;
}
