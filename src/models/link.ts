import * as Immutable from 'immutable';

export interface ILinkData {
  readonly target: Uuid;
  // readonly name: Uuid;
  readonly source: Uuid;
}

export interface ILink extends ILinkData, IRecordFunctions<ILinkData, ILink> {
}

const recordData: ILinkData = {
  target: '',
  // name: '',
  source: '',
};

export class Link extends Immutable.Record(recordData) implements ILink {
  readonly target: Uuid;
  // readonly name: Uuid;
  readonly source: Uuid;

  toObject(): ILinkData {
    return super.toObject() as ILinkData;
  }

  with(data: Partial<ILinkData>): ILink {
    return super.merge(data) as Link;
  }
}

export interface ILinkServerModel {
  readonly link: Uuid;
  readonly name: Uuid;
}

const linkServerModelData: ILinkServerModel = {
  link: '',
  name: '',
};

export class LinkServerModel extends Immutable.Record(linkServerModelData) implements ILinkServerModel {
  readonly link: Uuid;
  readonly name: Uuid;
}
