import * as Immutable from 'immutable';
import { IPageServerModel } from './page';

export interface INodeData {
  readonly categories: Immutable.Map<Uuid, number>;
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly firstMembers: Immutable.List<INode>;
  readonly membersCount: number;
}

export interface INode extends INodeData, IRecordFunctions<INodeData, INode> {
}

const recordData: INodeData = {
  categories: Immutable.Map<Uuid, number>(),
  id: '',
  links: Immutable.Set<Url>(),
  firstMembers: Immutable.List<INode>(),
  membersCount: 0,
};

export class Node extends Immutable.Record(recordData) implements INode {
  readonly categories: Immutable.Map<Uuid, number>;
  readonly id: string;
  readonly links: Immutable.Set<Url>;
  readonly firstMembers: Immutable.List<INode>;
  readonly membersCount: number;

  toObject(): INodeData {
    return super.toObject() as INodeData;
  }

  with(data: Partial<INodeData>): INode {
    return super.merge(data) as Node;
  }
}

export interface ICommunityServerModel {
  readonly categories: Immutable.Map<string, number>;
  readonly id: string;
  readonly links: Url[];
  readonly first_members: IPageServerModel[];
  readonly members_count: number;
}

const communityServerModelData: ICommunityServerModel = {
  categories: Immutable.Map<string, number>(),
  id: '',
  links: [],
  first_members: [],
  members_count: 0,
};

export class CommunityServerModel extends Immutable.Record(communityServerModelData) implements ICommunityServerModel {
  readonly categories: Immutable.Map<string, number>;
  readonly id: string;
  readonly links: Url[];
  readonly first_members: IPageServerModel[];
  readonly members_count: number;
}
