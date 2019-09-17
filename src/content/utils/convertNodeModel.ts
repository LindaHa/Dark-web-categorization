import * as Immutable from 'immutable';
import {
  IPage,
  IPageServerModel,
  Page,
} from '../../models/page';
import {
  Component,
  IComponent,
  IComponentServerModel
} from '../../models/component';

const getRawLinks = (links: Url[]): Immutable.Set<Url> => {
  let clientLinks = Immutable.Set<Url>();
  if (links) {
    links.map((link: string) => clientLinks = clientLinks.add(link));
  }

  return clientLinks;
};

export const convertServerToViewPageModel = (serverModel: IPageServerModel): IPage => {
  const {url, description, id, categories, language, links} = serverModel;
  const clientLinks = getRawLinks(links);

  const separateCategories = categories && categories.split(', ');
  const clientCategories = Immutable.Set<string>(separateCategories);
  return (new Page({
    categories: clientCategories,
    description,
    id,
    language,
    links: clientLinks,
    url,
  }));
};

export const convertServerToViewComponentModel = (serverModel: IComponentServerModel): IComponent => {
  const {id, links, first_members, members_count} = serverModel;
  let clientMembers = Immutable.List<IPage>();
  if (first_members) {
    first_members.forEach((member: IPageServerModel) => {
      const clientMember = convertServerToViewPageModel(member);
      clientMembers = clientMembers.push(clientMember);
    });
  }
  const clientLinks = getRawLinks(links);
  return (new Component({
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
