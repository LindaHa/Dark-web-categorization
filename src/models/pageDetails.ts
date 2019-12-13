import * as Immutable from 'immutable';

interface IBasePageDetailsData {
  readonly url: string;
}

interface IAdditionalPageDetailsData {
  readonly title: string;
  readonly category: string;
  readonly content: string;
  readonly links: Immutable.List<Url>;
}

export interface IPageDetailsData extends IBasePageDetailsData, Partial<IAdditionalPageDetailsData> {}

export interface IPageDetails extends IPageDetailsData, IRecordFunctions<IPageDetailsData, IPageDetails> {
}

const recordData: IPageDetailsData = {
  url: '',
  title: undefined,
  category: undefined,
  content: undefined,
  links: undefined,
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

export interface IBasePageDetailsServerModel {
  readonly url: string;
}

interface IAdditionalPageDetailsServerModel {
  readonly title: string;
  readonly category: string;
  readonly content: string;
  readonly links: Url[];
}

export interface IPageDetailsServerModel extends IBasePageDetailsServerModel, Partial<IAdditionalPageDetailsServerModel>{}


const linkServerModelData: IPageDetailsServerModel = {
  url: '',
  title: undefined,
  category: undefined,
  content: undefined,
  links: undefined,
};

export class PageDetailsServerModel extends Immutable.Record(linkServerModelData) implements IPageDetailsServerModel {
  readonly url: string;
  readonly title: string;
  readonly category: string;
  readonly content: string;
  readonly links: Url[];
}
