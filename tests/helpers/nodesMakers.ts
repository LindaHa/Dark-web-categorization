import {
  CommunityServerModel,
  ICommunityServerModel,
  INode,
  Node
} from '../../src/models/node';
import * as Immutable from 'immutable';
import {
  ILink,
  Link
} from '../../src/models/link';
import {
  Url,
  Uuid
} from './types';
import { PageServerModel } from '../../src/models/page';

export const makeClientPageNode = (id: Url | Uuid): INode => new Node({
  categories: Immutable.Map<string, number>([['Social', 1]]),
  id,
  links: getLinks(id),
  firstMembers: Immutable.List<INode>(),
  membersCount: 1,
  domainsCount: 1,
});


const getLinks = (sourceUrl: string): Immutable.Map<string, ILink> => {
  const linkOne = new Link({ source: sourceUrl, target: 'targetOne.page',  occurrences: 1});
  const linkTwo = new Link({ source: sourceUrl, target: 'targetTwo.page',  occurrences: 1});
  return Immutable.Map<string, ILink>([[linkOne.target, linkOne], [linkTwo.target, linkTwo]]);
};

export const makeClientCommunityNode = (id: Uuid, urls: Immutable.List<Url | Uuid>): INode => new Node({
  categories: Immutable.Map<string, number>([['Social', 1]]),
  id,
  links: getLinks(id),
  firstMembers: urls.map((url: Url) => makeClientPageNode(url)),
  membersCount: urls.size,
  domainsCount: urls.size,
});

const makeServerPage = (url: Uuid) => new PageServerModel({
  categories: [{ name: 'Social', occurrence: 1 }],
  url,
});

export const makeParentServerCommunityNode = (id: Uuid, urls: Immutable.List<Url | Uuid>): ICommunityServerModel => new CommunityServerModel({
  categories: [{ name: 'Social', occurrence: urls.size }],
  id,
  links: [],
  first_members: urls.map((url: Url) => makeServerPage(url)).toArray(),
  members_count: urls.size,
  domains_count: urls.size,
});

export const makeServerCommunityNode = (id: Uuid, url: string): ICommunityServerModel => new CommunityServerModel({
  categories: [{ name: 'Social', occurrence: 1 }],
  id,
  links: [],
  first_members: [makeServerPage(url)],
  members_count: 1,
  domains_count: 1,
});
