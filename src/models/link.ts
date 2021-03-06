import * as Immutable from 'immutable';

export interface ILinkData {
  readonly target: Uuid;
  // readonly name: Uuid;
  readonly source: Uuid;
  readonly occurrences: number;
}

export interface ILink extends ILinkData, IRecordFunctions<ILinkData, ILink> {
}

const recordData: ILinkData = {
  target: '',
  // name: '',
  source: '',
  occurrences: 0,
};

export class Link extends Immutable.Record(recordData) implements ILink {
  readonly target: Uuid;
  // readonly name: Uuid;
  readonly source: Uuid;
  readonly occurrences: number;

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
  readonly occurrences: number;
}

const linkServerModelData: ILinkServerModel = {
  link: '',
  name: '',
  occurrences: 0,
};

export class LinkServerModel extends Immutable.Record(linkServerModelData) implements ILinkServerModel {
  readonly link: Uuid;
  readonly name: Uuid;
  readonly occurrences: number;
}
