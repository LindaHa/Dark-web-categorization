import { Url } from './types';
import {
  IPageDetails,
  IPageDetailsServerModel,
  PageDetails,
  PageDetailsServerModel
} from '../../src/models/pageDetails';
import * as Immutable from 'immutable';

export const makePageDetails = (url: Url): IPageDetails => new PageDetails({
  url,
  title: url,
  category: 'Social',
  content: 'Social content',
  links: Immutable.List<Url>(),
});

export const makeCommunityDetails = (urls: Immutable.List<Url>): Immutable.List<IPageDetails> => (urls.map((url: Url) => makePageDetails(url)));

export const makeServerPageDetails = (url: Url): IPageDetailsServerModel => new PageDetailsServerModel({
  url,
  title: url,
  category: 'Social',
  content: 'Social content',
  links: [],
});

export const makeServerCommunityDetails = (urls: Immutable.List<Url>): IPageDetailsServerModel[] => {
  const result = [];
  for (const url of urls) {
    result.push(makeServerPageDetails(url));
  }

  return result;
};
