import * as Immutable from 'immutable';

interface IPageDetailsData {
  url: string;
  title: string;
  category: string;
  content: string;
  links: Immutable.List<Url>;
}

export interface IPageDetails extends IPageDetailsData, IRecordFunctions<IPageDetailsData, IPageDetails> {
}

const recordData: IPageDetailsData = {
  url: '',
  title: '',
  category: '',
  content: '',
  links: Immutable.List<Url>(),
};

export class PageDetails extends Immutable.Record(recordData) implements IPageDetails {
  readonly url: string;
  readonly title: string;
  readonly category: string;
  readonly content: string;
  readonly links: Immutable.List<Url>;

  toObject(): IPageDetailsData {
    return super.toObject() as IPageDetailsData;
  }

  with(data: Partial<IPageDetailsData>): IPageDetails {
    return super.merge(data) as PageDetails;
  }
}

export interface IPageDetailsServerModel {
  readonly url: string;
  readonly title: string;
  readonly category: string;
  readonly content: string;
  readonly links: Url[];
}

const pageDetailsServerModelData: IPageDetailsServerModel = {
  url: '',
  title: '',
  category: '',
  content: '',
  links: [],
};

export class PageDetailsServerModel extends Immutable.Record(pageDetailsServerModelData) implements IPageDetailsServerModel {
  readonly url: string;
  readonly title: string;
  readonly category: string;
  readonly content: string;
  readonly links: Url[];
}
