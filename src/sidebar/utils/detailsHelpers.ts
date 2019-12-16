import { IPageDetailsOptions } from '../components/PageDetailsOptions';
import { ICommunityDetailsOptions } from '../components/CommunityDetailsOptions';

type DetailsOptions = IPageDetailsOptions | ICommunityDetailsOptions;

export const removeEmptyPropertiesFromDetails = (details: DetailsOptions): DetailsOptions => {
    for (const prop in details) {
      if (details[prop] === null || details[prop] === undefined || details[prop] === []) {
        delete details[prop];
      }
    }
    return details;
};
