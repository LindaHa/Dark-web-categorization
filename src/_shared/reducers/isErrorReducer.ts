import {
  Nodes_GetAll_Failure,
  Nodes_GetAll_Success,
  Nodes_GetNodes_Success,
  Nodes_GetFiltered_Failure,
  Nodes_GetFiltered_Success
} from '../../content/actionTypes/nodesActionTypes';
import {
  DetailsOfCommunity_Get_Failure,
  DetailsOfCommunity_Get_Success,
  DetailsOfPage_Get_Failure,
  DetailsOfPage_Get_Success
} from '../../content/actionTypes/detailsActionTypes';

export const isErrorReducer = (prevState: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case DetailsOfCommunity_Get_Failure:
    case DetailsOfPage_Get_Failure:
    case Nodes_GetFiltered_Failure:
    case Nodes_GetAll_Failure: {
      return true;
    }

    case DetailsOfCommunity_Get_Success:
    case DetailsOfPage_Get_Success:
    case Nodes_GetAll_Success:
    case Nodes_GetFiltered_Success:
    case Nodes_GetNodes_Success: {
      return false;
    }

    default:
      return prevState;
  }
};
