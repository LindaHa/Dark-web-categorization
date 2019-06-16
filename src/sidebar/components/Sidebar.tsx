import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchBar } from './SearchBar';
import { GroupBySelector } from './GroupBySelector';
import { NodeInfo } from '../containers/NodeInfo';

export interface ISidebarDataProps {
  readonly groupBy: GroupBy;
  readonly selectedNodeId: Uuid;
}

export interface ISidebarCallbackProps {
  readonly onGroupUpdate: (value: GroupBy) => void;
}

type SidebarProps = ISidebarCallbackProps & ISidebarDataProps;

export enum GroupBy {
  Category = 'Category',
  Language = 'Language',
  Links = 'Links',
}

export class Sidebar extends React.PureComponent<SidebarProps> {
  static displayName = 'Sidebar';
  static propTypes: PropTypesShape<SidebarProps> = {
    groupBy: PropTypes.string.isRequired,
    selectedNodeId: PropTypes.string.isRequired,

    onGroupUpdate: PropTypes.func.isRequired,
  };

  _updateGroup = (value: GroupBy) => () => {
    this.props.onGroupUpdate(value);
  };

  render() {
    const {groupBy, selectedNodeId} = this.props;
    return (
      <div className="canvas__sidebar">
        <div className="sidebar sidebar__content">
          <div>
            <GroupBySelector
              groupBy={groupBy}
              onGroupByUpdate={this._updateGroup}
            />

            <SearchBar/>
            {selectedNodeId && <NodeInfo/>}
          </div>
        </div>
      </div>
    );
  }
}
