import * as Immutable from 'immutable';
import {
  convertServerCommunityDetailsToClientCommunityDetails,
  convertServerPageDetailsToClientPageDetails
} from '../../../src/content/utils/convertDetails';
import {
  makeCommunityDetails,
  makePageDetails,
  makeServerCommunityDetails,
  makeServerPageDetails
} from '../../helpers/detailsMakers';
import {
  IPageDetails,
  IPageDetailsServerModel
} from '../../../src/models/pageDetails';

const url = 'www.details.page';
const cPageDetails: IPageDetails = makePageDetails(url);
const sPageDetails: IPageDetailsServerModel = makeServerPageDetails(url);
const cCommunityDetails = makeCommunityDetails(Immutable.List([url]));
const sCommunityDetails = makeServerCommunityDetails(Immutable.List([url]));

describe('convertDetails convert details from server model to client model', () => {
  describe('convertServerPageDetailsToClientPageDetails converts details from server model to client model', () => {
    it('converts server page details to client model', () => {
      const actual = convertServerPageDetailsToClientPageDetails(sPageDetails);

      expect(actual).toEqual(cPageDetails);
    });
  });

  describe('convertServerCommunityDetailsToClientCommunityDetails converts details from server model to client model', () => {
    it('returns the received response if ok is ok', () => {
      const actual = convertServerCommunityDetailsToClientCommunityDetails(sCommunityDetails);

      expect(actual).toEqual(cCommunityDetails);
    });
  });
});
