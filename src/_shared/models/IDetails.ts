import * as Immutable from 'immutable';
import { IPageDetails } from '../../models/pageDetails';

export interface IDetails {
  readonly communityDetails: Immutable.List<IPageDetails>;
  readonly pageDetails: IPageDetails;
  readonly isFetchingDetails: boolean;
}
