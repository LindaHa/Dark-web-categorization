import * as Immutable from 'immutable';

export interface IPageData {
  readonly category: string;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: Immutable.Set<Uuid>;
  readonly url: string;
}

export interface IPage extends IPageData, IRecordFunctions<IPageData, IPage> {
}

const recordData: IPageData = {
  category: '',
  description: '',
  id: '',
  language: '',
  links: Immutable.Set<Uuid>(),
  url: '',
};

export class Page extends Immutable.Record(recordData) implements IPage {
  readonly category: string;
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
  readonly category: string;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: Immutable.Set<Uuid>;
  readonly url: string;
}

const userServerModelData: IPageServerModel = {
  category: '',
  description: '',
  id: '',
  language: '',
  links: Immutable.Set<Uuid>(),
  url: '',
};

export class PageServerModel extends Immutable.Record(userServerModelData) implements IPageServerModel {
  readonly category: string;
  readonly description: string;
  readonly id: Uuid;
  readonly language: string;
  readonly links: Immutable.Set<Uuid>;
  readonly url: string;
}
