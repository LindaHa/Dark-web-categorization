import * as Immutable from 'immutable';

export interface ILinkData {
  readonly dest: Uuid;
  readonly directional: boolean;
  readonly id: Uuid;
  readonly source: Uuid;
}

export interface ILink extends ILinkData, IRecordFunctions<ILinkData, ILink> {
}

const recordData: ILinkData = {
  dest: '',
  directional: true,
  id: '',
  source: '',
};

export class Link extends Immutable.Record(recordData) implements ILink {
  readonly dest: Uuid;
  readonly directional: boolean;
  readonly id: Uuid;
  readonly source: Uuid;

  toObject(): ILinkData {
    return super.toObject() as ILinkData;
  }

  with(data: Partial<ILinkData>): ILink {
    return super.merge(data) as Link;
  }
}

export interface ILinkServerModel {
  readonly dest: Uuid;
  readonly directional: boolean;
  readonly id: Uuid;
  readonly source: Uuid;
}

const userServerModelData: ILinkServerModel = {
  dest: '',
  directional: true,
  id: '',
  source: '',
};

export class LinkServerModel extends Immutable.Record(userServerModelData) implements ILinkServerModel {
  readonly dest: Uuid;
  readonly directional: boolean;
  readonly id: Uuid;
  readonly source: Uuid;
}
