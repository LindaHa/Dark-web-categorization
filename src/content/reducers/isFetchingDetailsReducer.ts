import {
  DetailsOfCommunity_Get_Failure,
  DetailsOfCommunity_Get_Request,
  DetailsOfCommunity_Get_Success,
  DetailsOfPage_Get_Failure,
  DetailsOfPage_Get_Request,
  DetailsOfPage_Get_Success
} from '../actionTypes/detailsActionTypes';
import {
  Nodes_GetAll_Request,
  Nodes_GetFiltered_Request,
  Nodes_GetSubNodes_Request
} from '../actionTypes/nodesActionTypes';

// This reducer informs whether the client is fetching details or not
export const isFetchingDetailsReducer = (prevState: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case DetailsOfCommunity_Get_Request:
    case DetailsOfPage_Get_Request: {
      return true;
    }

    case Nodes_GetAll_Request:
    case Nodes_GetFiltered_Request:
    case Nodes_GetSubNodes_Request:
    case DetailsOfCommunity_Get_Success:
    case DetailsOfCommunity_Get_Failure:
    case DetailsOfPage_Get_Success:
    case DetailsOfPage_Get_Failure: {
      return false;
    }

    default:
      return prevState;
  }
};
