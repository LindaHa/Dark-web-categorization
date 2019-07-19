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
import { ILinkServerModel } from '../../models/link';

const getRawLinks = (links: Immutable.List<ILinkServerModel>): Immutable.Set<Url> => {
  let clientLinks = Immutable.Set<Url>();
  links.forEach((link: ILinkServerModel) => clientLinks = clientLinks.add(link.link));

  return clientLinks;
};

export const convertServerToViewPageModel = (serverModel: IPageServerModel): IPage => {
  const {url, description, id, categories, language, links} = serverModel;
  const clientLinks = getRawLinks(Immutable.List(links));

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
  const {id, links, members} = serverModel;
  let clientMembers = Immutable.List<IPage>();
  members.forEach((member: IPageServerModel) => {
    const clientMember = convertServerToViewPageModel(member);
    clientMembers = clientMembers.push(clientMember);
  });
  const clientLinks = getRawLinks(Immutable.List(links));
  return (new Component({
    id,
    links: clientLinks,
    members: clientMembers,
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
