import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  GroupBy,
  ISidebarCallbackProps,
  ISidebarDataProps,
  Sidebar as SidebarComponent
} from '../components/Sidebar';
import { IState } from '../../_shared/models/IState';
import { fetchNodes } from '../../content/actionCreators/requests/fetchNodes';
import { fetchNodesGroupedBy } from '../../_shared/actionCreators/requests/fetchNodesGroupedBy';

const mapStateToProps = (state: IState): ISidebarDataProps => {
  const { currentLevel, groupBy, selectedNodeId, nodes } = state;
  const selectedNode = nodes.get(selectedNodeId);

  return {
    currentLevel,
    groupBy,
    selectedNode,
    selectedNodeId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ISidebarCallbackProps => ({
  onGroupUpdate: (value: GroupBy) => dispatch(fetchNodesGroupedBy(value)),
  onGroupZoomOut: (groupId: Uuid) => dispatch(fetchNodes(groupId)),
});

export const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
