import * as Immutable from 'immutable';
import {
  PageDetails,
  PageDetailsServerModel
} from '../../models/pageDetails';
import {
  CommunityDetails,
  CommunityDetailsServerModel
} from '../../models/communityDetails';

export const convertServerPageDetailsToClientPageDetails = (serverModel: PageDetailsServerModel) => {
  const links = Immutable.List<Url>(serverModel.links);
  return new PageDetails({links});
};

export const convertServerCommunityDetailsToClientCommunityDetails = (serverModel: CommunityDetailsServerModel) => {
  const membersUrls = Immutable.List<Url>(serverModel.members_urls);
  return new CommunityDetails({membersUrls});
};
