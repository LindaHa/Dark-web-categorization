import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  GroupBy,
  ISidebarCallbackProps,
  ISidebarDataProps,
  Sidebar as SidebarComponent
} from '../components/Sidebar';
import { updateGroupBy } from '../../_shared/actionCreators/groupByActionCreators';
import { IState } from '../../_shared/models/IState';
import { requestFilteredNodes } from '../../content/actionCreators/nodesActionCreators';
import { fetchNodes } from '../../content/actionCreators/requests/fetchNodes';

const mapStateToProps = (state: IState): ISidebarDataProps => {
  const {groupBy, nodes: {mode}, selectedComponent, selectedNode} = state;
  return {
    groupBy,
    selectedComponentId: selectedComponent,
    selectedNodeId: selectedNode,
    nodeMode: mode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ISidebarCallbackProps => ({
  onFilterSearch: (searchPhrase: string) => dispatch(requestFilteredNodes(searchPhrase)),
  onGroupUpdate: (value: GroupBy) => dispatch(updateGroupBy(value)),
  onGroupZoomOut: (groupId: Uuid) => dispatch(fetchNodes(groupId)),
});

export const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
