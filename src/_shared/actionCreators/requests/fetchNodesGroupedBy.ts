import { Dispatch } from 'redux';
import { updateGroupBy } from '../groupByActionCreators';
import { fetchNodes } from '../../../content/actionCreators/requests/fetchNodes';
import { IState } from '../../models/IState';

const fetchNodesGroupedByDependencies = {
  groupBy: updateGroupBy,
  fetch: fetchNodes(),
};

interface IFetchNodesGroupedByFactoryDependencies {
  readonly groupBy: (category: string) => Action;
  readonly fetch: (dispatch: Dispatch, getState: () => IState) => Promise<Response>;
}

export const fetchNodesGroupedByFactory = (dependencies: IFetchNodesGroupedByFactoryDependencies) =>
  (category: string): any => (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    dispatch(dependencies.groupBy(category));

    return dependencies.fetch(dispatch, getState);
  };

export const fetchNodesGroupedBy = fetchNodesGroupedByFactory(fetchNodesGroupedByDependencies);
