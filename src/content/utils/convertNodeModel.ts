import * as Immutable from 'immutable';
import { IPageServerModel } from '../../models/page';
import {
  Node,
  INode,
  ICommunityServerModel,
  IServerCategory
} from '../../models/node';
import { ILinkServerModel } from '../../models/link';

const getRawLinks = (links: ILinkServerModel[]): Immutable.Set<Url> => {
  let clientLinks = Immutable.Set<Url>();
  if (links) {
    links.map((link: ILinkServerModel) => clientLinks = clientLinks.add(link.link));
  }

  return clientLinks;
};

export const convertServerPageToViewNodeModel = (serverModel: IPageServerModel): INode => {
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

export const convertCommunityServerToViewNodeModel = (serverModel: ICommunityServerModel): INode => {
  const { categories, id, links, first_members, members_count } = serverModel;
  let clientCategories = Immutable.Map<string, number>();
  categories.forEach((serverCat: IServerCategory) => (
    clientCategories = clientCategories.set(serverCat.name, serverCat.occurrence)
  ));
  let clientMembers = Immutable.List<INode>();
  if (first_members) {
    first_members.forEach((member: IPageServerModel) => {
      const clientMember = convertServerPageToViewNodeModel(member);
      clientMembers = clientMembers.push(clientMember);
    });
  }
  const clientLinks = Immutable.Set<Url>(links);

  return (new Node({
    categories: clientCategories,
    id,
    links: clientLinks,
    firstMembers: clientMembers,
    membersCount: members_count,
  }));
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
