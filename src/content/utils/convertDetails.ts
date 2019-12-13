import * as Immutable from 'immutable';
import {
  PageDetails,
  PageDetailsServerModel
} from '../../models/pageDetails';

export const convertServerPageDetailsToClientPageDetails = (serverModel: PageDetailsServerModel) => {
  const pageDetails = new PageDetails({
    url: serverModel.url,
    title: serverModel.title,
    category: serverModel.category,
    content: serverModel.content,
    links: Immutable.List(serverModel.links),
  });

  return pageDetails;
};

export const convertServerCommunityDetailsToClientCommunityDetails = (serverModel: PageDetailsServerModel[]) => {
  const details = serverModel
    .map((pageDetails: PageDetailsServerModel) => (convertServerPageDetailsToClientPageDetails(pageDetails)));

  return Immutable.List(details);
};
