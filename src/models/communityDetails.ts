import * as Immutable from 'immutable';

export interface ICommunityDetailsData {
  readonly membersUrls: Immutable.List<Url>;
}

export interface ICommunityDetails extends ICommunityDetailsData, IRecordFunctions<ICommunityDetailsData, ICommunityDetails> {
}

const recordData: ICommunityDetailsData = {
  membersUrls: Immutable.List<Url>(),
};

export class CommunityDetails extends Immutable.Record(recordData) implements ICommunityDetails {
  readonly membersUrls: Immutable.List<Url>;

  toObject(): ICommunityDetailsData {
    return super.toObject() as ICommunityDetailsData;
  }

  with(data: Partial<ICommunityDetailsData>): ICommunityDetails {
    return super.merge(data) as CommunityDetails;
  }
}

export interface ICommunityDetailsServerModel {
  readonly members_urls: Url[];
}

const linkServerModelData: ICommunityDetailsServerModel = {
 members_urls: [],
};

export class CommunityDetailsServerModel extends Immutable.Record(linkServerModelData) implements ICommunityDetailsServerModel {
  readonly members_urls: Url[];
}
