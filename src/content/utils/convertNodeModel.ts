import * as Immutable from 'immutable';
import { IPageServerModel } from '../../models/page';
import {
  Component,
  IComponent,
  IComponentServerModel
} from '../../models/component';
import { ILinkServerModel } from '../../models/link';

const getRawLinks = (links: ILinkServerModel[]): Immutable.Set<Url> => {
  let clientLinks = Immutable.Set<Url>();
  if (links) {
    links.map((link: ILinkServerModel) => clientLinks = clientLinks.add(link.link));
  }

  return clientLinks;
};

export const convertServerPageToViewNodeModel = (serverModel: IPageServerModel): IComponent => {
  const { url, categories, links } = serverModel;
  const clientLinks = getRawLinks(links);

  const separateCategories = categories && categories.split(', ');
  const clientCategories = Immutable.Set<string>(separateCategories);

  return (new Component({
    categories: clientCategories,
    id: url,
    links: clientLinks,
    firstMembers: Immutable.List<IComponent>(),
    membersCount: 1,
  }));
};

export const convertServerToViewNodeModel = (serverModel: IComponentServerModel): IComponent => {
  const { categories, id, links, first_members, members_count } = serverModel;
  let clientMembers = Immutable.List<IComponent>();
  if (first_members) {
    first_members.forEach((member: IPageServerModel) => {
      const clientMember = convertServerPageToViewNodeModel(member);
      clientMembers = clientMembers.push(clientMember);
    });
  }
  const clientLinks = Immutable.Set<Url>(links);
  const clientCategories = Immutable.Set<Uuid>(categories);

  return (new Component({
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
