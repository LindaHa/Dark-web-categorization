import {
  DetailsOfCommunity_Get_Request,
  DetailsOfCommunity_Get_Success,
  DetailsOfPage_Get_Request,
} from '../actionTypes/detailsActionTypes';
import {
  Nodes_GetAll_Request,
  Nodes_GetFiltered_Request,
  Nodes_GetSubNodes_Request
} from '../actionTypes/nodesActionTypes';
import {
  CommunityDetails,
  ICommunityDetails
} from '../../models/communityDetails';

export const communityDetailsReducer = (prevState: ICommunityDetails = new CommunityDetails(), action: Action)
  : ICommunityDetails => {
  switch (action.type) {
    case DetailsOfCommunity_Get_Success: {
      const communityDetails = action.payload.details;

      return communityDetails;
    }

    case Nodes_GetAll_Request:
    case Nodes_GetFiltered_Request:
    case Nodes_GetSubNodes_Request:
    case DetailsOfPage_Get_Request:
    case DetailsOfCommunity_Get_Request: {
     return new CommunityDetails();
    }

    default:
      return prevState;
  }
};
