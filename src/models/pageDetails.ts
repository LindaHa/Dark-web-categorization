import * as Immutable from 'immutable';

export interface IPageDetailsData {
  readonly links: Immutable.List<Url>;
}

export interface IPageDetails extends IPageDetailsData, IRecordFunctions<IPageDetailsData, IPageDetails> {
}

const recordData: IPageDetailsData = {
  links: Immutable.List<Url>(),
};

export class PageDetails extends Immutable.Record(recordData) implements IPageDetails {
  readonly links: Immutable.List<Url>;

  toObject(): IPageDetailsData {
    return super.toObject() as IPageDetailsData;
  }

  with(data: Partial<IPageDetailsData>): IPageDetails {
    return super.merge(data) as PageDetails;
  }
}

export interface IPageDetailsServerModel {
  readonly links: Url[];
}

const linkServerModelData: IPageDetailsServerModel = {
 links: [],
};

export class PageDetailsServerModel extends Immutable.Record(linkServerModelData) implements IPageDetailsServerModel {
  readonly links: Url[];
}
