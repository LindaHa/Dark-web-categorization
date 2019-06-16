import * as Immutable from 'immutable';
import {
  IPage,
  IPageServerModel,
  Page,
  PageServerModel
} from '../../models/page';

export const convertServerToViewPageModel = (serverModel: IPageServerModel): IPage => {
  const {url, description, id, categories, language, linksTo} = serverModel;
  const separateLinks = linksTo && linksTo.split(', ');
  const clientLinks = Immutable.Set<string>(separateLinks);
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

export const convertViewToServerPageModel = (clientModel: Partial<IPage>): IPageServerModel => {
  const {url, description, id, categories, language, links} = clientModel;
  return (new PageServerModel({
    categories: categories && categories.toString(),
    description,
    id,
    language,
    linksTo: links && links.toString(),
    url,
  }));
};
