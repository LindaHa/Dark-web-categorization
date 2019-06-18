import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  GroupBy,
  ISidebarCallbackProps,
  ISidebarDataProps,
  Sidebar as SidebarComponent
} from '../components/Sidebar';
import { updateGroupBy } from '../../_shared/actions/groupByActionCreators';
import { IState } from '../../_shared/models/IState';
import { requestFilteredNodes } from '../../content/actions/nodesActionCreators';

const mapStateToProps = (state: IState): ISidebarDataProps => ({
  groupBy: state.groupBy,
  selectedNodeId: state.selectedNode,
});

const mapDispatchToProps = (dispatch: Dispatch): ISidebarCallbackProps => ({
  onFilterSearch: (searchPhrase: string) => dispatch(requestFilteredNodes(searchPhrase)),
  onGroupUpdate: (value: GroupBy) => dispatch(updateGroupBy(value)),
});

export const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
