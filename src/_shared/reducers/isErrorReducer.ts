import {
  Nodes_GetAll_Failure,
  Nodes_GetAll_Success,
  Nodes_GetNodes_Success,
  Nodes_GetFiltered_Failure,
  Nodes_GetFiltered_Success,
  Nodes_GetFiltered_Request,
  Nodes_GetAll_Request,
  Nodes_GetSubNodes_Request
} from '../../content/actionTypes/nodesActionTypes';
import {
  DetailsOfCommunity_Get_Failure,
  DetailsOfCommunity_Get_Request,
  DetailsOfCommunity_Get_Success,
  DetailsOfPage_Get_Failure,
  DetailsOfPage_Get_Request,
  DetailsOfPage_Get_Success
} from '../../content/actionTypes/detailsActionTypes';

export const errorMessageReducer = (prevState: string = '', action: Action): string => {
  switch (action.type) {
    case DetailsOfCommunity_Get_Failure:
    case DetailsOfPage_Get_Failure:
    case Nodes_GetFiltered_Failure:
    case Nodes_GetAll_Failure: {
      return action.payload.errorMessage;
    }

    case DetailsOfCommunity_Get_Request:
    case DetailsOfCommunity_Get_Success:
    case DetailsOfPage_Get_Request:
    case DetailsOfPage_Get_Success:
    case Nodes_GetAll_Request:
    case Nodes_GetAll_Success:
    case Nodes_GetFiltered_Request:
    case Nodes_GetFiltered_Success:
    case Nodes_GetSubNodes_Request:
    case Nodes_GetNodes_Success: {
      return '';
    }

    default:
      return prevState;
  }
};
