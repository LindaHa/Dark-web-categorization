import * as Immutable from 'immutable';
import { IComponent } from '../../models/component';

export const getUrlsFromMembers = (nodes?: Immutable.List<IComponent>): Immutable.Set<string> => {
  let urls = Immutable.Set<string>();

  if (nodes) {
    nodes.forEach((node: IComponent) => urls = urls.add(node.id));
  }

  return urls;
};
