import { connect } from 'react-redux';
import {
  GroupBy,
  ISidebarDataProps,
  Sidebar as SidebarComponent
} from '../components/Sidebar';

const mapStateToProps = (): ISidebarDataProps => ({
  groupBy: GroupBy.Links,
});

export const Sidebar = connect(mapStateToProps)(SidebarComponent);