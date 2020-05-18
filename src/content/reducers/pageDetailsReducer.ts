import {
  DetailsOfCommunity_Get_Request,
  DetailsOfPage_Get_Success,
  DetailsOfPage_Get_Request,
} from '../actionTypes/detailsActionTypes';
import {
  Nodes_GetAll_Request,
  Nodes_GetFiltered_Request,
  Nodes_GetSubNodes_Request
} from '../actionTypes/nodesActionTypes';
import {
  IPageDetails,
  PageDetails
} from '../../models/pageDetails';

// This reducer manages page details
export const pageDetailsReducer = (prevState: IPageDetails = new PageDetails(), action: Action)
  : IPageDetails => {
  switch (action.type) {
    case DetailsOfPage_Get_Success: {
      const pageDetails = action.payload.details;

      return pageDetails;
    }

    case Nodes_GetAll_Request:
    case Nodes_GetFiltered_Request:
    case Nodes_GetSubNodes_Request:
    case DetailsOfCommunity_Get_Request:
    case DetailsOfPage_Get_Request: {
     return new PageDetails();
    }

    default:
      return prevState;
  }
};
