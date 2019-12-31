import { INodeDetailsOptions } from '../components/CommunityDetailsOptions';

export const removeEmptyPropertiesFromDetails = (details: INodeDetailsOptions): INodeDetailsOptions => {
  for (const prop in details) {
    if (details[prop] === null || details[prop] === undefined || details[prop] === []) {
      delete details[prop];
    }
  }
  return details;
};

export const removeEmptyPropertiesFromDetailsResponse = (details: any): any => {
  const resultWithoutNulls = details.toJS()
    .map((detail: INodeDetailsOptions) => removeEmptyPropertiesFromDetails(detail));

  return resultWithoutNulls;
};

