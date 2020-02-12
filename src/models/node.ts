import * as Immutable from 'immutable';
import { IPageServerModel } from './page';
import {
  ILink,
  ILinkServerModel
} from './link';

export interface INodeData {
  readonly categories: Immutable.Map<Uuid, number>;
  readonly id: string;
  readonly links: Immutable.Set<ILink>;
  readonly firstMembers: Immutable.List<INode>;
  readonly membersCount: number;
}

export interface INode extends INodeData, IRecordFunctions<INodeData, INode> {
}

const recordData: INodeData = {
  categories: Immutable.Map<Uuid, number>(),
  id: '',
  links: Immutable.Set<ILink>(),
  firstMembers: Immutable.List<INode>(),
  membersCount: 0,
};

export class Node extends Immutable.Record(recordData) implements INode {
  readonly categories: Immutable.Map<Uuid, number>;
  readonly id: string;
  readonly links: Immutable.Set<ILink>;
  readonly firstMembers: Immutable.List<INode>;
  readonly membersCount: number;

  toObject(): INodeData {
    return super.toObject() as INodeData;
  }

  with(data: Partial<INodeData>): INode {
    return super.merge(data) as Node;
  }
}

export interface IServerCategory {
  readonly name: string;
  readonly occurrence: number;
}

export interface ICommunityServerModel {
  readonly categories: IServerCategory[];
  readonly id: string;
  readonly links: ILinkServerModel[];
  readonly first_members: IPageServerModel[];
  readonly members_count: number;
}

const communityServerModelData: ICommunityServerModel = {
  categories: [],
  id: '',
  links: [],
  first_members: [],
  members_count: 0,
};

export class CommunityServerModel extends Immutable.Record(communityServerModelData) implements ICommunityServerModel {
  readonly categories: IServerCategory[];
  readonly id: string;
  readonly links: ILinkServerModel[];
  readonly first_members: IPageServerModel[];
  readonly members_count: number;
}
