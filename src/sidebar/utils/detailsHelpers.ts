import { IPageDetailsOptions } from '../components/PageDetailsOptions';
import { INodeDetailsOptions } from '../components/CommunityDetailsOptions';

type DetailsOptions = IPageDetailsOptions | INodeDetailsOptions;

export const removeEmptyPropertiesFromDetails = (details: DetailsOptions): DetailsOptions => {
    for (const prop in details) {
      if (details[prop] === null || details[prop] === undefined || details[prop] === []) {
        delete details[prop];
      }
    }
    return details;
};
