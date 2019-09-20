import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchBar } from './SearchBar';
import { GroupBySelector } from './GroupBySelector';
import { ComponentInfo } from '../containers/ComponentInfo';
import { PageInfo } from '../containers/PageInfo';
import { ZoomOutOptions } from './ZoomOutOptions';
import { INode } from '../../models/node';

export interface ISidebarDataProps {
  readonly currentLevel: number;
  readonly groupBy: GroupBy;
  readonly selectedNode?: INode;
  readonly selectedNodeId?: Uuid;
}

export interface ISidebarCallbackProps {
  readonly onFilterSearch: (searchPhrase: string) => void;
  readonly onGroupUpdate: (value: GroupBy) => void;
  readonly onGroupZoomOut: (groupId: Uuid) => void;
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
    currentLevel: PropTypes.number.isRequired,
    groupBy: PropTypes.string.isRequired,
    selectedNode: PropTypes.object,
    selectedNodeId: PropTypes.string,

    onFilterSearch: PropTypes.func.isRequired,
    onGroupUpdate: PropTypes.func.isRequired,
    onGroupZoomOut: PropTypes.func.isRequired,
  };

  _updateGroupBy = (value: GroupBy) => () => this.props.onGroupUpdate(value);

  _filterNodes = (searchPhrase: string) => {
    this.props.onFilterSearch(searchPhrase);
  };

  _renderNodeInfo = () => {
    const { selectedNode } = this.props;
    if (!selectedNode) {
      return null;
    }
    const isIndividual = selectedNode.membersCount === 1 && !selectedNode.firstMembers.isEmpty();

    return isIndividual ? <PageInfo/> : <ComponentInfo/>;
  };

  _zoomOutGroup = () => {
    const { selectedNodeId } = this.props;
    if (selectedNodeId) {
      const idParts = selectedNodeId.split('.');
      const upComponentId = idParts.slice(0, idParts.length - 1);

      this.props.onGroupZoomOut(upComponentId.join('.'));
    }
  };

  render() {
    const { groupBy, selectedNode, currentLevel } = this.props;
    return (
      <div className="canvas__sidebar">
        <div className="sidebar sidebar__content">
          <div>
            <GroupBySelector
              groupBy={groupBy}
              onGroupByUpdate={this._updateGroupBy}
            />
            <SearchBar onSearch={this._filterNodes}/>
            <ZoomOutOptions
              lvlNumber={currentLevel}
              onZoomOut={this._zoomOutGroup}
            />
            {selectedNode && this._renderNodeInfo()}
          </div>
        </div>
      </div>
    );
  }
}
