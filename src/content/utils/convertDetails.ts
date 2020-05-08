import * as Immutable from 'immutable';
import {
  IPageDetailsServerModel,
  PageDetails
} from '../../models/pageDetails';

export const convertServerPageDetailsToClientPageDetails = (serverModel: IPageDetailsServerModel) => {
  const pageDetails = new PageDetails({
    url: serverModel.url,
    title: serverModel.title,
    category: serverModel.category,
    content: serverModel.content,
    links: Immutable.List(serverModel.links),
  });

  return pageDetails;
};

export const convertServerCommunityDetailsToClientCommunityDetails = (serverModel: IPageDetailsServerModel[]) => {
  const details = serverModel
    .map((pageDetails: IPageDetailsServerModel) => (convertServerPageDetailsToClientPageDetails(pageDetails)));

  return Immutable.List(details);
};
