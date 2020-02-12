import * as Immutable from 'immutable';
import { IPageServerModel } from '../../models/page';
import {
  ICommunityServerModel,
  INode,
  IServerCategory,
  Node
} from '../../models/node';
import { ILinkServerModel } from '../../models/link';

const getRawLinks = (links: ILinkServerModel[]): Immutable.Set<Url> => {
  let clientLinks = Immutable.Set<Url>();
  if (links) {
    links.map((link: ILinkServerModel) => clientLinks = clientLinks.add(link.link));
  }

  return clientLinks;
};

export const convertPageServerToClientModel = (serverModel: IPageServerModel): INode => {
  const { url, categories, links } = serverModel;
  const clientLinks = getRawLinks(links);
  let clientCategories = Immutable.Map<string, number>();
  categories.forEach((serverCat: IServerCategory) => (
    clientCategories = clientCategories.set(serverCat.name, serverCat.occurrence)
  ));

  return (new Node({
    categories: clientCategories,
    id: url,
    links: clientLinks,
    firstMembers: Immutable.List<INode>(),
    membersCount: 1,
  }));
};

export const convertCommunityServerToClientModel = (serverModel: ICommunityServerModel): INode => {
  const { categories, id, links, first_members, members_count } = serverModel;
  let clientCategories = Immutable.Map<string, number>();
  categories.forEach((serverCat: IServerCategory) => (
    clientCategories = clientCategories.set(serverCat.name, serverCat.occurrence)
  ));

  const clientMembers = convertMembersToClientModels(first_members);

  const clientId = getSimpleOrComplexId(id, first_members, members_count);
  const clientLinks = Immutable.Set<Url>(links.map((link: ILinkServerModel) => link.link));

  return (new Node({
    categories: clientCategories,
    id: clientId,
    links: clientLinks,
    firstMembers: clientMembers,
    membersCount: members_count,
  }));
};

const convertMembersToClientModels = (members: IPageServerModel[]): Immutable.List<INode> => {
  if (members) {
    const clientMembers = members.map((member: IPageServerModel) => (
      convertPageServerToClientModel(member)
    ));
    return Immutable.List<INode>(clientMembers);
  }
  return Immutable.List<INode>();
};

const getSimpleOrComplexId = (id: Uuid | Url, firstMembers: IPageServerModel[], membersCount: number): string => {
  if (membersCount === 1) {
    const flatNode = firstMembers[0];
    return `${id} ${flatNode!.url}`;
  } else {
    return id;
  }
};

// export const convertViewToServerPageModel = (clientModel: Partial<IPage>): IPageServerModel => {
//   const {url, description, id, categories, language, links} = clientModel;
//   return (new PageServerModel({
//     categories: categories && categories.toString(),
//     description,
//     id,
//     language,
//     links: links,
//     url,
//   }));
// };
