import * as Immutable from 'immutable';
import { IPage } from '../../models/page';

export const getCategoriesFromPages = (pages: Immutable.List<IPage>): Immutable.Set<string> => {
  let categories = Immutable.Set<string>();
  pages.forEach((page: IPage) => (
    page.categories.forEach((category: string) => categories = categories.add(category))
  ));

  return categories;
};

export const getUrlsFromPages = (pages: Immutable.List<IPage>): Immutable.Set<string> => {
  let urls = Immutable.Set<string>();
  pages.forEach((page: IPage) => urls = urls.add(page.url));

  return urls;
};
