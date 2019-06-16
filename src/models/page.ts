import * as Immutable from 'immutable';

export interface IPageData {
  readonly categories: Immutable.Set<Uuid>;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: Immutable.Set<Uuid>;
  readonly url: string;
}

export interface IPage extends IPageData, IRecordFunctions<IPageData, IPage> {
}

const recordData: IPageData = {
  categories: Immutable.Set<Uuid>(),
  description: '',
  id: '',
  language: '',
  links: Immutable.Set<Uuid>(),
  url: '',
};

export class Page extends Immutable.Record(recordData) implements IPage {
  readonly categories: Immutable.Set<Uuid>;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: Immutable.Set<Uuid>;
  readonly url: Uuid;

  toObject(): IPageData {
    return super.toObject() as IPageData;
  }

  with(data: Partial<IPageData>): IPage {
    return super.merge(data) as Page;
  }
}

export interface IPageServerModel {
  readonly categories: string;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly linksTo: string;
  readonly url: string;
}

const userServerModelData: IPageServerModel = {
  categories: '',
  description: '',
  id: '',
  language: '',
  linksTo: '',
  url: '',
};

export class PageServerModel extends Immutable.Record(userServerModelData) implements IPageServerModel {
  readonly categories: string;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly linksTo: '';
  readonly url: string;
}
