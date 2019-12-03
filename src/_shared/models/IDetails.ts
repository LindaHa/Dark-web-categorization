import { ICommunityDetails } from '../../models/communityDetails';
import { IPageDetails } from '../../models/pageDetails';

export interface IDetails {
  readonly communityDetails: ICommunityDetails;
  readonly pageDetails: IPageDetails;
}
