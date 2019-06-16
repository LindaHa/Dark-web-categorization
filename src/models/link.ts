import * as Immutable from 'immutable';

export interface ILinkData {
  readonly target: Uuid;
  // readonly id: Uuid;
  readonly source: Uuid;
}

export interface ILink extends ILinkData, IRecordFunctions<ILinkData, ILink> {
}

const recordData: ILinkData = {
  target: '',
  // id: '',
  source: '',
};

export class Link extends Immutable.Record(recordData) implements ILink {
  readonly target: Uuid;
  // readonly id: Uuid;
  readonly source: Uuid;

  toObject(): ILinkData {
    return super.toObject() as ILinkData;
  }

  with(data: Partial<ILinkData>): ILink {
    return super.merge(data) as Link;
  }
}

export interface ILinkServerModel {
  readonly target: Uuid;
  readonly id: Uuid;
  readonly source: Uuid;
}

const userServerModelData: ILinkServerModel = {
  target: '',
  id: '',
  source: '',
};

export class LinkServerModel extends Immutable.Record(userServerModelData) implements ILinkServerModel {
  readonly target: Uuid;
  readonly id: Uuid;
  readonly source: Uuid;
}
